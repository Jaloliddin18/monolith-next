import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import ArticleContent from '../../libs/components/blog/ArticleContent';
import ArticleComments from '../../libs/components/blog/ArticleComments';
import RelatedPostsSection from '../../libs/components/blog/RelatedPostsSection';

const CommunityDetail = () => {
	return (
		<Stack className="blog-detail-page">
			<ArticleContent />
			<ArticleComments />
			<RelatedPostsSection />
		</Stack>
	);
};

export default withLayoutBasic(CommunityDetail);
