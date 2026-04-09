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
import { MemberType } from '../../libs/enums/member.enum';
import { T } from '../../libs/types/common';
import { useRouter } from 'next/router';

const DesignerDetail = () => {
	const router = useRouter();
	const memberId = router.query?.memberId as string;
	const [member, setMember] = useState<Member | null>(null);

	const isDesigner = member?.memberType === MemberType.DESIGNER;
	const [activeTab, setActiveTab] = useState('blog');

	useQuery(GET_MEMBER, {
		fetchPolicy: 'cache-and-network',
		variables: { input: memberId },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			const fetched: Member = data?.getMember ?? null;
			setMember(fetched);
			if (fetched?.memberType === MemberType.DESIGNER) {
				setActiveTab('designs');
			}
		},
	});

	const renderPanel = () => {
		if (!memberId) return null;
		switch (activeTab) {
			case 'designs':
				return isDesigner ? <DesignerDesignsPanel memberId={memberId} member={member} /> : null;
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
			<DesignerProfileHero
				member={member}
				activeTab={activeTab}
				onTabChange={setActiveTab}
				onMemberUpdate={setMember}
			/>
			<div className="designer-panel-content">{renderPanel()}</div>
		</Stack>
	);
};

export default withLayoutBasic(DesignerDetail);
