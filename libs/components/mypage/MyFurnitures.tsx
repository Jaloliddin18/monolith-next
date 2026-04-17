import React, { useState } from 'react';
import { Stack, Pagination, Tabs, Tab, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { GET_DESIGNER_FURNITURES } from '../../../apollo/user/query';
import { UPDATE_FURNITURE } from '../../../apollo/user/mutation';
import { Furniture } from '../../types/furniture/furniture';
import { DesignerFurnituresInquiry } from '../../types/furniture/furniture.input';
import { FurnitureStatus } from '../../enums/furniture.enum';
import { Direction } from '../../enums/common.enum';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { sweetConfirmAlert, sweetMixinErrorAlert } from '../../sweetAlert';
import { REACT_APP_API_URL } from '../../config';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

const LIMIT = 5;

const STATUS_TABS: { label: string; value: FurnitureStatus | 'ALL' }[] = [
	{ label: 'All', value: 'ALL' },
	{ label: 'Active', value: FurnitureStatus.ACTIVE },
	{ label: 'New', value: FurnitureStatus.NEW },
	{ label: 'Limited', value: FurnitureStatus.LIMITED },
	{ label: 'Last Chance', value: FurnitureStatus.LAST_CHANCE },
	{ label: 'Discontinued', value: FurnitureStatus.DISCONTINUED },
];

const CHANGEABLE_STATUSES: FurnitureStatus[] = [
	FurnitureStatus.ACTIVE,
	FurnitureStatus.NEW,
	FurnitureStatus.LIMITED,
	FurnitureStatus.LAST_CHANCE,
	FurnitureStatus.DISCONTINUED,
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
	[FurnitureStatus.ACTIVE]: { bg: '#E5F0FD', color: '#3554d1' },
	[FurnitureStatus.NEW]: { bg: '#E8F5E9', color: '#2e7d32' },
	[FurnitureStatus.LIMITED]: { bg: '#FFF3E0', color: '#e65100' },
	[FurnitureStatus.LAST_CHANCE]: { bg: '#FFEBEE', color: '#c62828' },
	[FurnitureStatus.DISCONTINUED]: { bg: '#F5F5F5', color: '#757575' },
};

const STATUS_LABELS: Record<string, string> = {
	[FurnitureStatus.ACTIVE]: 'Active',
	[FurnitureStatus.NEW]: 'New',
	[FurnitureStatus.LIMITED]: 'Limited',
	[FurnitureStatus.LAST_CHANCE]: 'Last Chance',
	[FurnitureStatus.DISCONTINUED]: 'Discontinued',
};

const formatDate = (date: Date | string) =>
	new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

const COL_LISTING = { flex: '2 1 0', minWidth: 0, display: 'flex', alignItems: 'center' };
const COL_DATE = { flex: '0 0 160px', display: 'flex', alignItems: 'center' };
const COL_STATUS = { flex: '0 0 150px', display: 'flex', alignItems: 'center' };
const COL_VIEWS = { flex: '0 0 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const COL_ACTION = { flex: '0 0 100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' };

const MyFurnitures = () => {
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [furnitures, setFurnitures] = useState<Furniture[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeStatus, setActiveStatus] = useState<FurnitureStatus | 'ALL'>('ALL');
	const [menuAnchor, setMenuAnchor] = useState<{ el: HTMLElement; id: string } | null>(null);

	const inquiry: DesignerFurnituresInquiry = {
		page: currentPage,
		limit: LIMIT,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: activeStatus !== 'ALL' ? { furnitureStatus: activeStatus } : {},
	};

	const { refetch } = useQuery(GET_DESIGNER_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !user?._id,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFurnitures(data?.getDesignerFurnitures?.list ?? []);
			setTotal(data?.getDesignerFurnitures?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const [updateFurniture] = useMutation(UPDATE_FURNITURE);

	const handleTabChange = (status: FurnitureStatus | 'ALL') => {
		setActiveStatus(status);
		setCurrentPage(1);
		refetch({ input: { ...inquiry, page: 1, search: status !== 'ALL' ? { furnitureStatus: status } : {} } });
	};

	const handleEdit = (id: string) => {
		router.push({ pathname: '/mypage/add-furniture', query: { furnitureId: id } });
	};

	const handleDelete = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure you want to delete this furniture?')) {
				await updateFurniture({ variables: { input: { _id: id, furnitureStatus: FurnitureStatus.DELETE } } });
				await refetch({ input: inquiry });
			}
		} catch (err: any) {
			await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	const handleStatusMenuOpen = (e: React.MouseEvent<HTMLElement>, id: string) => {
		setMenuAnchor({ el: e.currentTarget, id });
	};

	const handleStatusMenuClose = () => setMenuAnchor(null);

	const handleStatusChange = async (newStatus: FurnitureStatus) => {
		if (!menuAnchor) return;
		const id = menuAnchor.id;
		handleStatusMenuClose();
		try {
			await updateFurniture({ variables: { input: { _id: id, furnitureStatus: newStatus } } });
			await refetch({ input: inquiry });
		} catch (err: any) {
			await sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	// The furniture whose menu is open (to know current status)
	const menuFurniture = furnitures.find((f) => f._id === menuAnchor?.id);

	return (
		<Stack sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
			{/* Header */}
			<Box sx={{ pb: '20px', borderBottom: '1px solid #e8e8e8' }}>
				<Box component="h2" sx={{ fontFamily: 'var(--font-ui)', fontSize: '24px', fontWeight: 600, color: '#1a1a1a', m: 0, mb: '6px' }}>
					My Furnitures
				</Box>
				<Box component="p" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#999', m: 0 }}>
					Manage your furniture listings
				</Box>
			</Box>

			{/* Tabs */}
			<Tabs
				value={activeStatus}
				onChange={(_e, val) => handleTabChange(val)}
				variant="scrollable"
				scrollButtons="auto"
				sx={{
					borderBottom: '1px solid #e8e8e8',
					minHeight: 40,
					mt: '-16px',
					'& .MuiTab-root': {
						fontFamily: 'var(--font-ui)',
						fontSize: '13px',
						fontWeight: 400,
						color: '#999',
						textTransform: 'none',
						minHeight: 40,
						padding: '8px 16px',
					},
					'& .Mui-selected': { color: 'var(--color-primary) !important', fontWeight: 500 },
					'& .MuiTabs-indicator': { backgroundColor: 'var(--color-primary)' },
				}}
			>
				{STATUS_TABS.map((tab) => (
					<Tab key={tab.value} label={tab.label} value={tab.value} disableRipple />
				))}
			</Tabs>

			{furnitures.length > 0 ? (
				<>
					{/* Table container */}
					<Box sx={{ border: '1px solid #e8e8e8', borderRadius: '12px', overflow: 'hidden', bgcolor: '#fff' }}>
						{/* Header row */}
						<Box sx={{ display: 'flex', alignItems: 'center', px: '28px', py: '18px', bgcolor: '#f7f7f7', borderBottom: '1px solid #efefef' }}>
							<Box sx={COL_LISTING}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Listing title
								</Box>
							</Box>
							<Box sx={COL_DATE}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Date Published
								</Box>
							</Box>
							<Box sx={COL_STATUS}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Status
								</Box>
							</Box>
							<Box sx={COL_VIEWS}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									View
								</Box>
							</Box>
							<Box sx={COL_ACTION}>
								<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
									Action
								</Box>
							</Box>
						</Box>

						{/* Data rows */}
						{furnitures.map((item: Furniture, idx: number) => {
							const statusStyle = STATUS_COLORS[item.furnitureStatus] ?? { bg: '#F5F5F5', color: '#757575' };
							const hasDiscount = item.furnitureDiscount > 0;
							const discountedPrice = hasDiscount ? item.furniturePrice * (1 - item.furnitureDiscount / 100) : null;
							const thumb = item.furnitureImages?.[0]
								? `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
								: '/img/furniture/luxury_chair.jpg';

							return (
								<Box
									key={item._id}
									sx={{
										display: 'flex',
										alignItems: 'center',
										px: '28px',
										py: '28px',
										borderBottom: idx < furnitures.length - 1 ? '1px solid #f0f0f0' : 'none',
									}}
								>
									{/* Thumbnail + info */}
									<Box sx={COL_LISTING}>
										<Box
											component="img"
											src={thumb}
											alt={item.furnitureTitle}
											sx={{ width: 140, height: 100, objectFit: 'cover', borderRadius: '6px', flexShrink: 0, mr: '20px' }}
										/>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 0 }}>
											<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
												{item.furnitureTitle}
											</Box>
											<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#aaa', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
												{item.furnitureRoom.replace(/_/g, ' ')} · {item.furnitureCategory.replace(/_/g, ' ')}
											</Box>
											<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '15px', fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'baseline', gap: '8px', mt: '4px' }}>
												{hasDiscount && discountedPrice !== null ? (
													<>
														${discountedPrice.toFixed(0)}/
														<Box component="s" sx={{ fontSize: '12px', fontWeight: 400, color: '#bbb' }}>
															${item.furniturePrice.toLocaleString()}
														</Box>
													</>
												) : (
													<>${item.furniturePrice.toLocaleString()}/</>
												)}
											</Box>
										</Box>
									</Box>

									{/* Date */}
									<Box sx={COL_DATE}>
										<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#555' }}>
											{formatDate(item.createdAt)}
										</Box>
									</Box>

									{/* Status pill — clickable */}
									<Box sx={COL_STATUS}>
										<Box
											component="span"
											onClick={(e: React.MouseEvent<HTMLElement>) => handleStatusMenuOpen(e, item._id)}
											sx={{
												display: 'inline-flex',
												alignItems: 'center',
												justifyContent: 'center',
												px: '18px',
												py: '6px',
												borderRadius: '40px',
												bgcolor: statusStyle.bg,
												color: statusStyle.color,
												fontFamily: 'var(--font-ui)',
												fontSize: '12px',
												fontWeight: 500,
												whiteSpace: 'nowrap',
												cursor: 'pointer',
												userSelect: 'none',
												transition: 'opacity 0.15s',
												'&:hover': { opacity: 0.8 },
											}}
										>
											{STATUS_LABELS[item.furnitureStatus] ?? item.furnitureStatus}
										</Box>
									</Box>

									{/* Views */}
									<Box sx={COL_VIEWS}>
										<Box component="span" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#1a1a1a' }}>
											{item.furnitureViews.toLocaleString()}
										</Box>
									</Box>

									{/* Actions */}
									<Box sx={COL_ACTION}>
										<IconButton onClick={() => handleEdit(item._id)} size="small" sx={{ p: '6px' }}>
											<ModeIcon sx={{ fontSize: 20, color: '#111' }} />
										</IconButton>
										<IconButton onClick={() => handleDelete(item._id)} size="small" sx={{ p: '6px' }}>
											<DeleteIcon sx={{ fontSize: 20, color: '#111' }} />
										</IconButton>
									</Box>
								</Box>
							);
						})}
					</Box>

					{/* Status change menu */}
					<Menu
						anchorEl={menuAnchor?.el ?? null}
						open={Boolean(menuAnchor)}
						onClose={handleStatusMenuClose}
						PaperProps={{
							elevation: 2,
							sx: {
								mt: 1,
								minWidth: 160,
								borderRadius: '8px',
								border: '1px solid #f0f0f0',
								'& .MuiMenuItem-root': {
									fontFamily: 'var(--font-ui)',
									fontSize: '13px',
									py: '10px',
									px: '16px',
									color: '#333',
									'&:hover': { bgcolor: '#f7f7f7' },
									'&.Mui-selected': { bgcolor: '#f0f5ff', color: 'var(--color-primary)', fontWeight: 600 },
								},
							},
						}}
					>
						{CHANGEABLE_STATUSES.filter((s) => s !== menuFurniture?.furnitureStatus).map((status) => (
							<MenuItem key={status} onClick={() => handleStatusChange(status)}>
								{STATUS_LABELS[status]}
							</MenuItem>
						))}
					</Menu>

					{/* Pagination */}
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', pt: '8px' }}>
						<Pagination
							count={Math.ceil(total / LIMIT)}
							page={currentPage}
							onChange={(_e, page) => setCurrentPage(page)}
							shape="circular"
							color="primary"
						/>
						<Box component="p" sx={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: '#aaa', m: 0 }}>
							Total {total} furniture(s) available
						</Box>
					</Box>
				</>
			) : (
				<Box component="p" sx={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: '#aaa', textAlign: 'center', py: '60px', m: 0 }}>
					No furnitures found.
				</Box>
			)}
		</Stack>
	);
};

export default MyFurnitures;
