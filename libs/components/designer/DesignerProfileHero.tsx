import React from 'react';
import { Stack } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SUBSCRIBE, UNSUBSCRIBE } from '../../../apollo/user/mutation';
import { Member } from '../../types/member/member';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

const DEFAULT_IMAGE = '/icons/user_profile.png';

interface DesignerProfileHeroProps {
	member: Member | null;
	activeTab: string;
	onTabChange: (tab: string) => void;
}

const DesignerProfileHero = ({ member, activeTab, onTabChange }: DesignerProfileHeroProps) => {
	const user = useReactiveVar(userVar);
	const isMyProfile = user?._id === member?._id;

	const isFollowing = member?.followedByMe?.some((f) => f.myFollowing) ?? false;

	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);

	const handleFollow = async () => {
		if (!user._id) {
			sweetMixinErrorAlert('Please login first!');
			return;
		}
		if (!member) return;
		try {
			if (isFollowing) {
				await unsubscribe({ variables: { input: member._id } });
			} else {
				await subscribe({ variables: { input: member._id } });
				await sweetTopSmallSuccessAlert('Followed!', 800);
			}
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	const statTabs = [
		{ key: 'designs', value: member?.memberDesigns ?? 0, label: 'Designs' },
		{ key: 'blog', value: member?.memberArticles ?? 0, label: 'Blog Posts' },
		{ key: 'followers', value: member?.memberFollowers ?? 0, label: 'Followers' },
		{ key: 'followings', value: member?.memberFollowings ?? 0, label: 'Followings' },
		{ key: 'reviews', value: member?.memberComments ?? 0, label: 'Reviews' },
	];

	const image = member?.memberImage
		? `${REACT_APP_API_URL}/${member.memberImage}`
		: DEFAULT_IMAGE;

	return (
		<Stack className="designer-profile-hero">
			<div className="designer-profile-cover" />
			<div className="designer-profile-hero-content">
				<div className="designer-profile-avatar">
					<img src={image} alt={member?.memberNick ?? 'Designer'} />
				</div>
				<div className="designer-profile-info">
					<span className="designer-profile-badge">{member?.memberAddress ?? 'Designer'}</span>
					<h1 className="designer-profile-name">
						{member?.memberFullName ?? member?.memberNick ?? '—'}
					</h1>
				</div>
				<div className="designer-profile-stats-row">
					{statTabs.map((tab) => (
						<button
							key={tab.key}
							type="button"
							className={`designer-profile-stat-tab ${activeTab === tab.key ? 'active' : ''}`}
							onClick={() => onTabChange(tab.key)}
						>
							<span className="designer-profile-stat-value">{tab.value}</span>
							<span className="designer-profile-stat-label">{tab.label}</span>
						</button>
					))}
				</div>
				{!isMyProfile && (
					<div className="designer-profile-actions">
						<button className="designer-follow-btn" type="button" onClick={handleFollow}>
							{isFollowing ? 'Unfollow' : 'Follow'}
						</button>
						<button className="designer-contact-btn" type="button">
							Contact
						</button>
					</div>
				)}
			</div>
		</Stack>
	);
};

export default DesignerProfileHero;
