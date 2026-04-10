import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import withLayoutHome from '../libs/components/layout/LayoutHome';
import { GET_FURNITURES } from '../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../apollo/user/mutation';
import { userVar } from '../apollo/store';
import { Furniture } from '../libs/types/furniture/furniture';
import { Direction } from '../libs/enums/common.enum';
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

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const { data: trendingData, refetch: refetchTrending } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 6, sort: 'furnitureViews', direction: Direction.DESC, search: {} } },
		notifyOnNetworkStatusChange: false,
	});

	const { data: topRatedData, refetch: refetchTopRated } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 3, sort: 'furnitureRank', direction: Direction.DESC, search: {} } },
		notifyOnNetworkStatusChange: false,
	});

	const { data: topSelectionData, refetch: refetchTopSelection } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 6, sort: 'createdAt', direction: Direction.DESC, search: {} } },
		notifyOnNetworkStatusChange: false,
	});

	const { data: suggestedData, refetch: refetchSuggested } = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 3, sort: 'furnitureLikes', direction: Direction.DESC, search: {} } },
		notifyOnNetworkStatusChange: false,
	});

	const trendingFurnitures: Furniture[] = trendingData?.getFurnitures?.list ?? [];
	const topRatedFurnitures: Furniture[] = topRatedData?.getFurnitures?.list ?? [];
	const topSelectionFurnitures: Furniture[] = topSelectionData?.getFurnitures?.list ?? [];
	const suggestedFurnitures: Furniture[] = suggestedData?.getFurnitures?.list ?? [];

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

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutHome(Home);
