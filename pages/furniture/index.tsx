import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import FurnitureListPage from '../../libs/components/furniture/FurnitureListPage';
import { GET_FURNITURES } from '../../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../../apollo/user/mutation';
import { userVar } from '../../apollo/store';
import { FurnituresInquiry, FIsearch } from '../../libs/types/furniture/furniture.input';
import { Furniture } from '../../libs/types/furniture/furniture';
import { Direction } from '../../libs/enums/common.enum';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';

const FurnitureList = () => {
	const router = useRouter();
	const user = useReactiveVar(userVar);

	const [sortValue, setSortValue] = useState('recommended');
	const [searchFilter, setSearchFilter] = useState<FIsearch>({});
	const [inquiry, setInquiry] = useState<FurnituresInquiry>({
		page: 1,
		limit: 12,
		sort: 'createdAt',
		direction: Direction.DESC,
		search: {},
	});

	const { data, loading, refetch } = useQuery(GET_FURNITURES, {
		variables: { input: inquiry },
		fetchPolicy: 'cache-and-network',
	});

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const furnitures: Furniture[] = data?.getFurnitures?.list || [];
	const total: number = data?.getFurnitures?.metaCounter?.[0]?.total || 0;

	const handlePageChange = useCallback(
		(page: number) => {
			setInquiry((prev) => ({ ...prev, page }));
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[],
	);

	const handleSortChange = useCallback(
		(sort: string) => {
			setSortValue(sort);
			let sortField = 'createdAt';
			let direction = Direction.DESC;

			switch (sort) {
				case 'createdAt_desc':
					sortField = 'createdAt';
					direction = Direction.DESC;
					break;
				case 'furnitureViews_desc':
					sortField = 'furnitureViews';
					direction = Direction.DESC;
					break;
				case 'furnitureDiscount_desc':
					sortField = 'furnitureDiscount';
					direction = Direction.DESC;
					break;
				case 'furnitureLikes_desc':
					sortField = 'furnitureLikes';
					direction = Direction.DESC;
					break;
				case 'furniturePrice_desc':
					sortField = 'furniturePrice';
					direction = Direction.DESC;
					break;
				case 'furniturePrice_asc':
					sortField = 'furniturePrice';
					direction = Direction.ASC;
					break;
				case 'furnitureRank_desc':
					sortField = 'furnitureRank';
					direction = Direction.DESC;
					break;
				default:
					sortField = 'createdAt';
					direction = Direction.DESC;
			}

			setInquiry((prev) => ({ ...prev, page: 1, sort: sortField, direction }));
		},
		[],
	);

	const handleFilterChange = useCallback(
		(search: FIsearch) => {
			setSearchFilter(search);
			setInquiry((prev) => ({ ...prev, page: 1, search }));
		},
		[],
	);

	const handleLike = useCallback(
		async (id: string) => {
			try {
				if (!user?._id) {
					router.push('/account/join');
					return;
				}
				await likeTargetFurniture({
					variables: { input: id },
					fetchPolicy: 'network-only',
				});
				await refetch();
			} catch (err: any) {
				sweetMixinErrorAlert(err.message);
			}
		},
		[user, router, likeTargetFurniture, refetch],
	);

	return (
		<FurnitureListPage
			furnitures={furnitures}
			total={total}
			page={inquiry.page}
			limit={inquiry.limit}
			sortValue={sortValue}
			searchFilter={searchFilter}
			onPageChange={handlePageChange}
			onSortChange={handleSortChange}
			onFilterChange={handleFilterChange}
			onLike={handleLike}
		/>
	);
};

export default withLayoutBasic(FurnitureList);
