import React from 'react';
import { Stack } from '@mui/material';
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
	return (
		<Stack id="home-page">
			<HeroSection />
			<IntroSection />
			<ServicesSection />
			<AwesomeServices />
			<NewestChair newFurnitures={[]} onLike={() => {}} />
			<TrendingNow trendFurnitures={[]} onLike={() => {}} />
			<ShopByCategory furnitures={[]} onLike={() => {}} />
			<SuggestedSection furnitures={[]} onLike={() => {}} />
			<SaleBanner />
			<TopRated furnitures={[]} onLike={() => {}} />
			<LivingRoom furnitures={[]} onLike={() => {}} />
			<TopSelection furnitures={[]} onLike={() => {}} />
			<StoreFinder />
			<FaqSection />
			<InstagramSection />
			<BlogSection />
		</Stack>
	);
};

export default withLayoutHome(Home);
