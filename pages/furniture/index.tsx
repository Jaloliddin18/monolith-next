import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import FurnitureListPage from '../../libs/components/furniture/FurnitureListPage';
import { GET_FURNITURES } from '../../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../../apollo/user/mutation';
import { userVar } from '../../apollo/store';
import { FurnituresInquiry, FIsearch } from '../../libs/types/furniture/furniture.input';
import { Furniture } from '../../libs/types/furniture/furniture';
import { Direction } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';

const DEFAULT_INQUIRY: FurnituresInquiry = {
	page: 1,
	limit: 12,
	sort: 'createdAt',
	direction: Direction.DESC,
	search: {},
};

const FurnitureList = ({ initialInput = DEFAULT_INQUIRY }: any) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);

	const [sortValue, setSortValue] = useState('recommended');
	const [searchFilter, setSearchFilter] = useState<FIsearch>({});
	const [inquiry, setInquiry] = useState<FurnituresInquiry>(initialInput);
	const [furnitures, setFurnitures] = useState<Furniture[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);
	const { refetch: getFurnituresRefetch } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFurnitures(data?.getFurnitures?.list ?? []);
			setTotal(data?.getFurnitures?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.isReady && router.query.input) {
			const inputObj = JSON.parse(router.query.input as string);
			setInquiry(inputObj);
		}
	}, [router.isReady, router.query.input]);

	useEffect(() => {
		const handler = () => getFurnituresRefetch();
		window.addEventListener('wishlistUpdated', handler);
		return () => window.removeEventListener('wishlistUpdated', handler);
	}, [getFurnituresRefetch]);

	/** HANDLERS **/
	const handlePageChange = useCallback(
		async (page: number) => {
			const updated = { ...inquiry, page };
			setInquiry(updated);
			await router.push(
				`/furniture?input=${JSON.stringify(updated)}`,
				`/furniture?input=${JSON.stringify(updated)}`,
				{ scroll: false },
			);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[inquiry, router],
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
				await getFurnituresRefetch({ input: inquiry });
				window.dispatchEvent(new Event('wishlistUpdated'));
			} catch (err: any) {
				sweetMixinErrorAlert(err.message);
			}
		},
		[user, router, likeTargetFurniture, getFurnituresRefetch, inquiry],
	);

	return (
		<Stack>
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
		</Stack>
	);
};


export default withLayoutBasic(FurnitureList);
