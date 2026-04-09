import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import withLayoutHome from '../libs/components/layout/LayoutHome';
import { GET_FURNITURES } from '../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../apollo/user/mutation';
import { userVar } from '../apollo/store';
import { Furniture } from '../libs/types/furniture/furniture';
import { Direction } from '../libs/enums/common.enum';
import { T } from '../libs/types/common';
import { sweetMixinErrorAlert } from '../libs/sweetAlert';

import HeroSection from '../libs/components/homepage/HeroSection';
import IntroSection from '../libs/components/homepage/IntroSection';
import ServicesSection from '../libs/components/homepage/ServicesSection';
import AwesomeServices from '../libs/components/homepage/AwesomeServices';
import NewestChair from '../libs/components/homepage/NewestChair';
import TrendingNow from '../libs/components/homepage/TrendingNow';
import ShopByCategory from '../libs/components/homepage/ShopByCategory';
import SuggestedSection from '../libs/components/homepage/SuggestedSection';
import SaleBanner from '../libs/components/homepage/SaleBanner';
import TopRated from '../libs/components/homepage/TopRated';
import LivingRoom from '../libs/components/homepage/LivingRoom';
import TopSelection from '../libs/components/homepage/TopSelection';
import FaqSection from '../libs/components/homepage/FaqSection';
import InstagramSection from '../libs/components/common/InstagramSection';
import BlogSection from '../libs/components/homepage/BlogSection';
import StoreFinder from '../libs/components/homepage/StoreFinder';

const Home = () => {
	const router = useRouter();
	const user = useReactiveVar(userVar);

	const [trendingFurnitures, setTrendingFurnitures] = useState<Furniture[]>([]);
	const [topRatedFurnitures, setTopRatedFurnitures] = useState<Furniture[]>([]);
	const [topSelectionFurnitures, setTopSelectionFurnitures] = useState<Furniture[]>([]);
	const [suggestedFurnitures, setSuggestedFurnitures] = useState<Furniture[]>([]);

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const { refetch: refetchTrending } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 6, sort: 'furnitureViews', direction: Direction.DESC, search: {} } },
		onCompleted: (data: T) => setTrendingFurnitures(data?.getFurnitures?.list ?? []),
	});

	const { refetch: refetchTopRated } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 3, sort: 'furnitureRank', direction: Direction.DESC, search: {} } },
		onCompleted: (data: T) => setTopRatedFurnitures(data?.getFurnitures?.list ?? []),
	});

	const { refetch: refetchTopSelection } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 6, sort: 'createdAt', direction: Direction.DESC, search: {} } },
		onCompleted: (data: T) => setTopSelectionFurnitures(data?.getFurnitures?.list ?? []),
	});

	const { refetch: refetchSuggested } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 3, sort: 'furnitureLikes', direction: Direction.DESC, search: {} } },
		onCompleted: (data: T) => setSuggestedFurnitures(data?.getFurnitures?.list ?? []),
	});

	useEffect(() => {
		const handler = () => {
			refetchTrending();
			refetchTopRated();
			refetchTopSelection();
			refetchSuggested();
		};
		window.addEventListener('wishlistUpdated', handler);
		return () => window.removeEventListener('wishlistUpdated', handler);
	}, [refetchTrending, refetchTopRated, refetchTopSelection, refetchSuggested]);

	const handleLike = useCallback(
		async (id: string) => {
			try {
				if (!user?._id) {
					router.push('/account/join');
					return;
				}
				await likeTargetFurniture({ variables: { input: id }, fetchPolicy: 'network-only' });
				window.dispatchEvent(new Event('wishlistUpdated'));
			} catch (err: any) {
				sweetMixinErrorAlert(err.message);
			}
		},
		[user, router, likeTargetFurniture],
	);

	return (
		<Stack id="home-page">
			<HeroSection />
			<IntroSection />
			<ServicesSection />
			<AwesomeServices />
			<NewestChair />
			<TrendingNow trendFurnitures={trendingFurnitures} onLike={handleLike} />
			<ShopByCategory />
			<SuggestedSection furnitures={suggestedFurnitures} onLike={handleLike} />
			<SaleBanner />
			<TopRated furnitures={topRatedFurnitures} onLike={handleLike} />
			<LivingRoom />
			<TopSelection furnitures={topSelectionFurnitures} onLike={handleLike} />
			<StoreFinder />
			<FaqSection />
			<InstagramSection />
			<BlogSection />
		</Stack>
	);
};

export default withLayoutHome(Home);
