import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MEMBER_FOLLOWINGS } from '../../../apollo/user/query';
import { SUBSCRIBE, UNSUBSCRIBE } from '../../../apollo/user/mutation';
import { Following } from '../../types/follow/follow';
import { FollowInquiry } from '../../types/follow/follow.input';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

const DEFAULT_IMAGE = '/icons/user_profile.png';

interface DesignerFollowingsPanelProps {
	memberId: string;
}

const DesignerFollowingsPanel = ({ memberId }: DesignerFollowingsPanelProps) => {
	const router = useRouter();
	const [followings, setFollowings] = useState<Following[]>([]);

	const inquiry: FollowInquiry = {
		page: 1,
		limit: 10,
		search: { followerId: memberId },
	};

	const { refetch } = useQuery(GET_MEMBER_FOLLOWINGS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFollowings(data?.getMemberFollowings?.list ?? []);
		},
	});

	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);

	const handleFollow = async (followingId: string, isFollowing: boolean) => {
		try {
			if (isFollowing) {
				await unsubscribe({ variables: { input: followingId } });
			} else {
				await subscribe({ variables: { input: followingId } });
				await sweetTopSmallSuccessAlert('Followed!', 800);
			}
			await refetch({ input: inquiry });
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	const handleClick = (id: string) => {
		router.push(`/member/detail?memberId=${id}`);
	};

	return (
		<Stack className="designer-followings-panel">
			<div className="member-list-header">
				<span className="member-list-col-name">Name</span>
				<span className="member-list-col-details">Details</span>
				<span className="member-list-col-action">Subscription</span>
			</div>
			<div className="member-list">
				{followings.map((person) => {
					const following = person.followingData;
					if (!following) return null;
					const image = following.memberImage
						? `${REACT_APP_API_URL}/${following.memberImage}`
						: DEFAULT_IMAGE;
					const isFollowing = person.followedByMe?.some((f) => f.myFollowing) ?? false;

					return (
						<div key={person._id} className="member-list-row" onClick={() => handleClick(following._id)}>
							<div className="member-list-name">
								<div className="member-list-avatar">
									<img src={image} alt={following.memberNick} />
								</div>
								<span className="member-list-nick">{following.memberFullName ?? following.memberNick}</span>
							</div>
							<div className="member-list-details">
								<span className="member-detail-item">
									<strong>Followers</strong> ({following.memberFollowers})
								</span>
								<span className="member-detail-item">
									<strong>Followings</strong> ({following.memberFollowings})
								</span>
								<span className="member-detail-item">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
										<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
									</svg>
									({following.memberLikes})
								</span>
							</div>
							<div className="member-list-action">
								<button
									className="member-follow-btn"
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										handleFollow(following._id, isFollowing);
									}}
								>
									{isFollowing ? 'Unfollow' : 'Follow'}
								</button>
							</div>
						</div>
					);
				})}
				{followings.length === 0 && (
					<p style={{ padding: '24px', color: 'var(--color-text-muted)' }}>Not following anyone yet.</p>
				)}
			</div>
		</Stack>
	);
};

export default DesignerFollowingsPanel;
