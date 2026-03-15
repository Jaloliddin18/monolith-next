import React, { useCallback, useState } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';
import { GET_FURNITURES } from '../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../apollo/user/mutation';
import { Furniture } from '../libs/types/furniture/furniture';
import { T } from '../libs/types/common';
import { Direction } from '../libs/enums/common.enum';
import { Messages } from '../libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../libs/sweetAlert';
import { userVar } from '../apollo/store';
import withLayoutHome from '../libs/components/layout/LayoutHome';

// Homepage sections
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
import InstagramSection from '../libs/components/homepage/InstagramSection';
import BlogSection from '../libs/components/homepage/BlogSection';
import StoreFinder from '../libs/components/homepage/StoreFinder';

const Home = () => {
	const user = useReactiveVar(userVar);
	const [newFurnitures, setNewFurnitures] = useState<Furniture[]>([]);
	const [trendFurnitures, setTrendFurnitures] = useState<Furniture[]>([]);
	const [topRatedFurnitures, setTopRatedFurnitures] = useState<Furniture[]>([]);

	/** GET NEW FURNITURES */
	const {
		loading: newLoading,
		refetch: newRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'network-only',
		variables: {
			input: { page: 1, limit: 4, sort: 'createdAt', direction: Direction.DESC, search: {} },
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNewFurnitures(data?.getFurnitures?.list ?? []);
		},
	});

	/** GET TRENDING FURNITURES */
	const {
		loading: trendLoading,
		refetch: trendRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'network-only',
		variables: {
			input: { page: 1, limit: 6, sort: 'furnitureLikes', direction: Direction.DESC, search: {} },
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendFurnitures(data?.getFurnitures?.list ?? []);
		},
	});

	/** GET TOP RATED FURNITURES */
	const {
		loading: topLoading,
		refetch: topRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'network-only',
		variables: {
			input: { page: 1, limit: 6, sort: 'furnitureRank', direction: Direction.DESC, search: {} },
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopRatedFurnitures(data?.getFurnitures?.list ?? []);
		},
	});

	/** LIKE */
	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const likeHandler = useCallback(
		async (id: string) => {
			try {
				if (!id) return;
				if (!user._id) throw new Error(Messages.NOT_AUTHENTICATED);
				await likeTargetFurniture({ variables: { input: id } });
				await newRefetch();
				await trendRefetch();
				await topRefetch();
				await sweetTopSmallSuccessAlert('success', 800);
			} catch (err: any) {
				sweetMixinErrorAlert(err.message);
			}
		},
		[user],
	);

	return (
		<Stack id="home-page">
			<HeroSection />
			<IntroSection />
			<ServicesSection />
			<AwesomeServices />
			<NewestChair newFurnitures={newFurnitures} onLike={likeHandler} />
			<TrendingNow trendFurnitures={trendFurnitures} onLike={likeHandler} />
			<ShopByCategory furnitures={trendFurnitures} onLike={likeHandler} />
			<SuggestedSection furnitures={topRatedFurnitures} onLike={likeHandler} />
			<SaleBanner />
			<TopRated furnitures={topRatedFurnitures} onLike={likeHandler} />
			<LivingRoom furnitures={trendFurnitures} onLike={likeHandler} />
			<TopSelection furnitures={newFurnitures} onLike={likeHandler} />
			<StoreFinder />
			<FaqSection />
			<InstagramSection />
			<BlogSection />
		</Stack>
	);
};

export default withLayoutHome(Home);
