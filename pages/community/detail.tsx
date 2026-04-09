import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import ArticleContent from '../../libs/components/blog/ArticleContent';
import ArticleComments from '../../libs/components/blog/ArticleComments';
import RelatedPostsSection from '../../libs/components/blog/RelatedPostsSection';
import { useRouter } from 'next/router';

const CommunityDetail = () => {
	const router = useRouter();
	const articleId = router.query?.articleId as string;

	return (
		<Stack className="blog-detail-page">
			<ArticleContent articleId={articleId} />
			<ArticleComments articleId={articleId} />
			<RelatedPostsSection articleId={articleId} />
		</Stack>
	);
};

export default withLayoutBasic(CommunityDetail);
