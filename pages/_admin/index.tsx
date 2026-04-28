import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import withAdminLayout from '../../libs/components/layout/LayoutAdmin';
import { useQuery } from '@apollo/client';
import { GET_ADMIN_STATS } from '../../apollo/admin/query';
import { Box, Stack, Avatar, Typography, CircularProgress } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../libs/config';
import { MemberType, MemberStatus } from '../../libs/enums/member.enum';

const PIE_COLORS = [
	'#C46A4A', '#8B6F5E', '#1B3A6B', '#2D5A27',
	'#C9A84C', '#8A4A6B', '#4A7A8A', '#C47A4A',
	'#6B4A2A', '#4A6B8A', '#8A6B4A', '#6B8A4A',
];

const formatEnum = (value: string) => (value ?? '').replace(/_/g, ' ');

const formatMonth = (m: string) => {
	if (!m) return '';
	const [year, month] = m.split('-');
	return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('en-US', { month: 'short' });
};

// Single dynamic import — loads all recharts at once so Cell/Pie/Legend work correctly
const GrowthChart = dynamic(
	async () => {
		const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = await import('recharts');
		return function GrowthChart({ data }: { data: { month: string; count: number }[] }) {
			return (
				<ResponsiveContainer width="100%" height={220}>
					<LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
						<XAxis
							dataKey="month"
							tick={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fill: '#787878' }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							tick={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fill: '#787878' }}
							axisLine={false}
							tickLine={false}
							allowDecimals={false}
						/>
						<Tooltip
							contentStyle={{
								fontFamily: 'DM Sans, sans-serif',
								fontSize: 12,
								border: '1px solid #EEEBE6',
								borderRadius: 8,
								boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
							}}
						/>
						<Line
							type="monotone"
							dataKey="count"
							stroke="#C46A4A"
							strokeWidth={2}
							dot={{ fill: '#C46A4A', r: 3, strokeWidth: 0 }}
							activeDot={{ r: 5, fill: '#C46A4A', strokeWidth: 0 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			);
		};
	},
	{ ssr: false },
);

const CategoryPieChart = dynamic(
	async () => {
		const { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } = await import('recharts');
		return function CategoryPieChart({ data, colors, fmt }: { data: any[]; colors: string[]; fmt: (v: string) => string }) {
			// attach fill directly to each data item — most reliable way to color slices
			const coloredData = data.map((d, i) => ({ ...d, fill: colors[i % colors.length] }));
			return (
				<ResponsiveContainer width="100%" height={220}>
					<PieChart>
						<Pie
							data={coloredData}
							dataKey="count"
							nameKey="category"
							cx="50%"
							cy="50%"
							outerRadius={80}
							innerRadius={48}
						>
							{coloredData.map((entry, i) => (
								<Cell key={i} fill={entry.fill} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								fontFamily: 'DM Sans, sans-serif',
								fontSize: 12,
								border: '1px solid #EEEBE6',
								borderRadius: 8,
							}}
							formatter={(value: any, name: any) => [value, fmt(name)]}
						/>
						<Legend
							iconType="circle"
							iconSize={8}
							wrapperStyle={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11 }}
							formatter={(value: any) => fmt(value)}
						/>
					</PieChart>
				</ResponsiveContainer>
			);
		};
	},
	{ ssr: false },
);

const STAT_CARDS = [
	{ key: 'totalMembers', label: 'Total Members', icon: PeopleOutlineIcon },
	{ key: 'totalFurnitures', label: 'Total Products', icon: StorefrontOutlinedIcon },
	{ key: 'totalArticles', label: 'Total Articles', icon: ArticleOutlinedIcon },
	{ key: 'totalSubscribers', label: 'Subscribers', icon: EmailOutlinedIcon },
];

const getMemberTypeBadge = (type: MemberType) => {
	const map: Record<string, string> = {
		USER: 'badge badge-user',
		DESIGNER: 'badge badge-designer',
		ADMIN: 'badge badge-admin',
	};
	return map[type] || 'badge';
};

const getMemberStatusBadge = (status: MemberStatus) => {
	const map: Record<string, string> = {
		ACTIVE: 'badge badge-active',
		BLOCK: 'badge badge-block',
		DELETE: 'badge badge-delete',
	};
	return map[status] || 'badge';
};

const circleImgStyle: React.CSSProperties = {
	width: 40,
	height: 40,
	borderRadius: '50%',
	objectFit: 'cover',
	flexShrink: 0,
	display: 'block',
	border: '1px solid #EEEBE6',
};

const AdminDashboard: NextPage = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => { setMounted(true); }, []);

	const { data, loading } = useQuery(GET_ADMIN_STATS, { fetchPolicy: 'network-only' });
	const stats = data?.getAdminStats;

	if (loading) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
				<CircularProgress size={28} sx={{ color: '#C46A4A' }} />
			</Box>
		);
	}

	return (
		<Box>
			{/* Row 1 — Stat Cards */}
			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
				{STAT_CARDS.map(({ key, label, icon: Icon }) => (
					<Box className="admin-stat-card" key={key}>
						<Box className="stat-icon-wrap">
							<Icon sx={{ fontSize: 18 }} />
						</Box>
						<Typography className="stat-number">
							{stats ? (stats[key as keyof typeof stats] as number)?.toLocaleString() : '—'}
						</Typography>
						<Typography className="stat-label">{label}</Typography>
					</Box>
				))}
			</Box>

			{/* Row 2 — Charts */}
			<Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 2, mb: 3 }}>
				<Box className="admin-chart-card">
					<Box className="chart-card-header">
						<Typography className="chart-card-title">Member Growth</Typography>
						<Typography className="chart-card-subtitle">Last 6 months</Typography>
					</Box>
					{mounted && stats?.memberGrowth?.length > 0 ? (
						<GrowthChart
							data={stats.memberGrowth.map((d: any) => ({
								month: formatMonth(d.month),
								count: d.count,
							}))}
						/>
					) : (
						<Box sx={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<Typography sx={{ fontSize: 13, color: '#C0B9B0', fontFamily: 'DM Sans, sans-serif' }}>No data yet</Typography>
						</Box>
					)}
				</Box>

				<Box className="admin-chart-card">
					<Box className="chart-card-header">
						<Typography className="chart-card-title">Products by Category</Typography>
						<Typography className="chart-card-subtitle">Current inventory</Typography>
					</Box>
					{mounted && stats?.furnitureByCategory?.length > 0 ? (
						<CategoryPieChart
							data={stats.furnitureByCategory}
							colors={PIE_COLORS}
							fmt={formatEnum}
						/>
					) : (
						<Box sx={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<Typography sx={{ fontSize: 13, color: '#C0B9B0', fontFamily: 'DM Sans, sans-serif' }}>No data yet</Typography>
						</Box>
					)}
				</Box>
			</Box>

			{/* Row 3 — Top Products */}
			<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
				{/* Top Viewed */}
				<Box className="admin-table-card">
					<Box className="admin-table-card-header">
						<Typography className="admin-table-card-title">Top Viewed Products</Typography>
					</Box>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<tbody>
							{stats?.topViewedFurnitures?.length > 0 ? (
								stats.topViewedFurnitures.map((item: any, i: number) => (
									<tr key={item._id} style={{ borderBottom: '1px solid #F5F2EE' }}>
										<td style={{ width: 28, paddingLeft: 20, paddingTop: 11, paddingBottom: 11 }}>
											<span className="compact-table-rank">#{i + 1}</span>
										</td>
										<td style={{ width: 52, paddingTop: 11, paddingBottom: 11 }}>
											<img
												src={
													item.furnitureImages?.[0]
														? `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
														: '/img/furniture/luxury_chair.jpg'
												}
												style={circleImgStyle}
												alt={item.furnitureTitle}
											/>
										</td>
										<td style={{ padding: '11px 8px', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
											<Link href={`/furniture?furnitureId=${item._id}`}>
												<span className="compact-table-name">{item.furnitureTitle}</span>
											</Link>
										</td>
										<td style={{ textAlign: 'right', paddingRight: 20, paddingTop: 11, paddingBottom: 11 }}>
											<span className="compact-table-meta">
												<RemoveRedEyeOutlinedIcon sx={{ fontSize: 13, color: '#787878' }} />
												{item.furnitureViews?.toLocaleString()}
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: '#C0B9B0', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
										No data yet
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Box>

				{/* Top Liked */}
				<Box className="admin-table-card">
					<Box className="admin-table-card-header">
						<Typography className="admin-table-card-title">Top Liked Products</Typography>
					</Box>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<tbody>
							{stats?.topLikedFurnitures?.length > 0 ? (
								stats.topLikedFurnitures.map((item: any, i: number) => (
									<tr key={item._id} style={{ borderBottom: '1px solid #F5F2EE' }}>
										<td style={{ width: 28, paddingLeft: 20, paddingTop: 11, paddingBottom: 11 }}>
											<span className="compact-table-rank">#{i + 1}</span>
										</td>
										<td style={{ width: 52, paddingTop: 11, paddingBottom: 11 }}>
											<img
												src={
													item.furnitureImages?.[0]
														? `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
														: '/img/furniture/luxury_chair.jpg'
												}
												style={circleImgStyle}
												alt={item.furnitureTitle}
											/>
										</td>
										<td style={{ padding: '11px 8px', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
											<Link href={`/furniture?furnitureId=${item._id}`}>
												<span className="compact-table-name">{item.furnitureTitle}</span>
											</Link>
										</td>
										<td style={{ textAlign: 'right', paddingRight: 20, paddingTop: 11, paddingBottom: 11 }}>
											<span className="compact-table-meta">
												<FavoriteBorderOutlinedIcon sx={{ fontSize: 13, color: '#C46A4A' }} />
												{item.furnitureLikes?.toLocaleString()}
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: '#C0B9B0', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
										No data yet
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Box>
			</Box>

			{/* Row 4 — Recent Members */}
			<Box className="admin-table-card">
				<Box className="admin-table-card-header">
					<Typography className="admin-table-card-title">Recent Members</Typography>
					<Link href="/_admin/users" style={{ textDecoration: 'none' }}>
						<Typography sx={{ fontSize: 12, color: '#C46A4A', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, cursor: 'pointer' }}>
							View all →
						</Typography>
					</Link>
				</Box>
				<table className="admin-members-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
					<thead>
						<tr>
							<th>Member</th>
							<th>Type</th>
							<th>Status</th>
							<th>Joined</th>
						</tr>
					</thead>
					<tbody>
						{stats?.recentMembers?.length > 0 ? (
							stats.recentMembers.map((member: any) => {
								const avatarSrc = member.memberImage
									? `${REACT_APP_API_URL}/${member.memberImage}`
									: '/general_images/default_profile.png';
								return (
									<tr key={member._id}>
										<td>
											<Stack direction="row" alignItems="center" gap={1.5}>
												<Avatar src={avatarSrc} sx={{ width: 32, height: 32 }} />
												<Link href={`/member?memberId=${member._id}`} style={{ textDecoration: 'none' }}>
													<Typography sx={{ fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: '#1C1A17', '&:hover': { color: '#C46A4A' } }}>
														{member.memberNick}
													</Typography>
												</Link>
											</Stack>
										</td>
										<td>
											<span className={getMemberTypeBadge(member.memberType)}>
												{formatEnum(member.memberType)}
											</span>
										</td>
										<td>
											<span className={getMemberStatusBadge(member.memberStatus)}>
												{formatEnum(member.memberStatus)}
											</span>
										</td>
										<td style={{ color: '#787878', fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}>
											{new Date(member.createdAt).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											})}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#C0B9B0', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>
									No members yet
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</Box>
		</Box>
	);
};

export default withAdminLayout(AdminDashboard);
