import React, { useState } from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import DesignerProfileHero from '../../libs/components/designer/DesignerProfileHero';
import DesignerDesignsPanel from '../../libs/components/designer/DesignerDesignsPanel';
import DesignerBlogPanel from '../../libs/components/designer/DesignerBlogPanel';
import DesignerFollowersPanel from '../../libs/components/designer/DesignerFollowersPanel';
import DesignerFollowingsPanel from '../../libs/components/designer/DesignerFollowingsPanel';
import DesignerReviewsPanel from '../../libs/components/designer/DesignerReviewsPanel';
import { useQuery } from '@apollo/client';
import { GET_MEMBER } from '../../apollo/user/query';
import { Member } from '../../libs/types/member/member';
import { T } from '../../libs/types/common';
import { useRouter } from 'next/router';

const DesignerDetail = () => {
	const router = useRouter();
	const memberId = router.query?.memberId as string;
	const [activeTab, setActiveTab] = useState('designs');
	const [member, setMember] = useState<Member | null>(null);

	useQuery(GET_MEMBER, {
		fetchPolicy: 'cache-and-network',
		variables: { input: memberId },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMember(data?.getMember ?? null);
		},
	});

	const renderPanel = () => {
		if (!memberId) return null;
		switch (activeTab) {
			case 'designs':
				return <DesignerDesignsPanel memberId={memberId} member={member} />;
			case 'blog':
				return <DesignerBlogPanel memberId={memberId} />;
			case 'followers':
				return <DesignerFollowersPanel memberId={memberId} />;
			case 'followings':
				return <DesignerFollowingsPanel memberId={memberId} />;
			case 'reviews':
				return <DesignerReviewsPanel />;
			default:
				return null;
		}
	};

	return (
		<Stack className="designer-detail-page">
			<DesignerProfileHero member={member} activeTab={activeTab} onTabChange={setActiveTab} />
			<div className="designer-panel-content">{renderPanel()}</div>
		</Stack>
	);
};

export default withLayoutBasic(DesignerDetail);
