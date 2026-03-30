import React, { useState } from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import DesignerProfileHero from '../../libs/components/designer/DesignerProfileHero';
import DesignerDesignsPanel from '../../libs/components/designer/DesignerDesignsPanel';
import DesignerBlogPanel from '../../libs/components/designer/DesignerBlogPanel';
import DesignerFollowersPanel from '../../libs/components/designer/DesignerFollowersPanel';
import DesignerFollowingsPanel from '../../libs/components/designer/DesignerFollowingsPanel';
import DesignerReviewsPanel from '../../libs/components/designer/DesignerReviewsPanel';

const DesignerDetail = () => {
	const [activeTab, setActiveTab] = useState('designs');

	const renderPanel = () => {
		switch (activeTab) {
			case 'designs':
				return <DesignerDesignsPanel />;
			case 'blog':
				return <DesignerBlogPanel />;
			case 'followers':
				return <DesignerFollowersPanel />;
			case 'followings':
				return <DesignerFollowingsPanel />;
			case 'reviews':
				return <DesignerReviewsPanel />;
			default:
				return null;
		}
	};

	return (
		<Stack className="designer-detail-page">
			<DesignerProfileHero activeTab={activeTab} onTabChange={setActiveTab} />
			<div className="designer-panel-content">{renderPanel()}</div>
		</Stack>
	);
};

export default withLayoutBasic(DesignerDetail);
