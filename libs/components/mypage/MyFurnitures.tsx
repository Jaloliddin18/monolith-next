import React, { useState } from 'react';
import { Stack, Pagination, Tabs, Tab } from '@mui/material';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_DESIGNER_FURNITURES } from '../../../apollo/user/query';
import { Furniture } from '../../types/furniture/furniture';
import { DesignerFurnituresInquiry } from '../../types/furniture/furniture.input';
import { FurnitureStatus } from '../../enums/furniture.enum';
import { Direction } from '../../enums/common.enum';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import ProductCard from '../common/ProductCard';

const LIMIT = 6;

const STATUS_TABS: { label: string; value: FurnitureStatus | 'ALL' }[] = [
	{ label: 'All', value: 'ALL' },
	{ label: 'Active', value: FurnitureStatus.ACTIVE },
	{ label: 'New', value: FurnitureStatus.NEW },
	{ label: 'Limited', value: FurnitureStatus.LIMITED },
	{ label: 'Last Chance', value: FurnitureStatus.LAST_CHANCE },
	{ label: 'Discontinued', value: FurnitureStatus.DISCONTINUED },
];

const MyFurnitures = () => {
	const user = useReactiveVar(userVar);
	const [furnitures, setFurnitures] = useState<Furniture[]>([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeStatus, setActiveStatus] = useState<FurnitureStatus | 'ALL'>('ALL');

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

	const handleTabChange = (status: FurnitureStatus | 'ALL') => {
		setActiveStatus(status);
		setCurrentPage(1);
		refetch({
			input: {
				...inquiry,
				page: 1,
				search: status !== 'ALL' ? { furnitureStatus: status } : {},
			},
		});
	};

	return (
		<Stack className="my-furnitures-content">
			<div className="articles-header">
				<h2 className="articles-title">My Furnitures</h2>
				<p className="articles-subtitle">Manage your furniture listings</p>
			</div>

			<Tabs
				value={activeStatus}
				onChange={(_e, val) => handleTabChange(val)}
				variant="scrollable"
				scrollButtons="auto"
				sx={{
					borderBottom: '1px solid',
					borderColor: 'divider',
					marginBottom: '24px',
					minHeight: 40,
					'& .MuiTab-root': {
						fontFamily: 'var(--font-ui)',
						fontSize: '13px',
						fontWeight: 400,
						color: 'var(--color-text-muted)',
						textTransform: 'none',
						minHeight: 40,
						padding: '8px 16px',
					},
					'& .Mui-selected': {
						color: 'var(--color-primary) !important',
						fontWeight: 500,
					},
					'& .MuiTabs-indicator': {
						backgroundColor: 'var(--color-primary)',
					},
				}}
			>
				{STATUS_TABS.map((tab) => (
					<Tab key={tab.value} label={tab.label} value={tab.value} disableRipple />
				))}
			</Tabs>

			{furnitures.length > 0 ? (
				<>
					<div className="my-furnitures-grid">
						{furnitures.map((furniture) => (
							<ProductCard key={furniture._id} furniture={furniture} />
						))}
					</div>

					<div className="articles-pagination">
						<Pagination
							count={Math.ceil(total / LIMIT)}
							page={currentPage}
							onChange={(_e, page) => setCurrentPage(page)}
							shape="circular"
						/>
						<p className="articles-total">Total {total} furniture(s) available</p>
					</div>
				</>
			) : (
				<p className="articles-empty">No furnitures found.</p>
			)}
		</Stack>
	);
};

export default MyFurnitures;
