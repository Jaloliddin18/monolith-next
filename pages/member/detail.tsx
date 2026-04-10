import React, { useState, useRef, useCallback } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
	const optimisticRef = useRef(false);

	const isDesigner = member?.memberType === MemberType.DESIGNER;
	const [activeTab, setActiveTab] = useState('blog');

	const [followerEvent, setFollowerEvent] = useState<{ follower: Member; added: boolean } | null>(null);

	const handleMemberUpdate = useCallback((updated: Member) => {
		optimisticRef.current = true;
		setMember(updated);
	}, []);

	const handleFollowToggle = useCallback((follower: Member, added: boolean) => {
		setFollowerEvent({ follower, added });
	}, []);

	useQuery(GET_MEMBER, {
		fetchPolicy: 'cache-and-network',
		variables: { input: memberId },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			const fetched: Member = data?.getMember ?? null;
			// Don't overwrite optimistic updates from user interactions
			if (optimisticRef.current) return;
			setMember(fetched);
			if (fetched?.memberType === MemberType.DESIGNER) {
				setActiveTab('designs');
			}
		},
	});

	return (
		<Stack className="designer-detail-page">
			<DesignerProfileHero
				member={member}
				activeTab={activeTab}
				onTabChange={setActiveTab}
				onMemberUpdate={handleMemberUpdate}
				onFollowToggle={handleFollowToggle}
			/>
			<div className="designer-panel-content">
				{memberId && (
					<>
						{isDesigner && (
							<div style={{ display: activeTab === 'designs' ? undefined : 'none' }}>
								<DesignerDesignsPanel memberId={memberId} member={member} />
							</div>
						)}
						<div style={{ display: activeTab === 'blog' ? undefined : 'none' }}>
							<DesignerBlogPanel memberId={memberId} />
						</div>
						<div style={{ display: activeTab === 'followers' ? undefined : 'none' }}>
							<DesignerFollowersPanel memberId={memberId} followerEvent={followerEvent} />
						</div>
						<div style={{ display: activeTab === 'followings' ? undefined : 'none' }}>
							<DesignerFollowingsPanel memberId={memberId} />
						</div>
						<div style={{ display: activeTab === 'reviews' ? undefined : 'none' }}>
							<DesignerReviewsPanel memberId={memberId} />
						</div>
					</>
				)}
			</div>
		</Stack>
	);
};

export const getServerSideProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(DesignerDetail);
