import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import BlogListSection from '../../libs/components/blog/BlogListSection';
import TrendingArticlesSection from '../../libs/components/blog/TrendingArticlesSection';
import InstagramSection from '../../libs/components/common/InstagramSection';

const Community = () => {
	return (
		<Stack className="community-page">
			<BlogListSection />
			<TrendingArticlesSection />
			<InstagramSection />
		</Stack>
	);
};

export default withLayoutBasic(Community);
