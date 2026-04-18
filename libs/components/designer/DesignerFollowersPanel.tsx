import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { GET_MEMBER_FOLLOWERS } from '../../../apollo/user/query';
import { SUBSCRIBE, UNSUBSCRIBE, LIKE_TARGET_MEMBER } from '../../../apollo/user/mutation';
import { Follower } from '../../types/follow/follow';
import { Member } from '../../types/member/member';
import { FollowInquiry } from '../../types/follow/follow.input';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';
import { userVar } from '../../../apollo/store';

const DEFAULT_IMAGE = '/general_images/default_profile.png';

interface DesignerFollowersPanelProps {
	memberId: string;
	followerEvent?: { follower: Member; added: boolean } | null;
}

const DesignerFollowersPanel = ({ memberId, followerEvent }: DesignerFollowersPanelProps) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [followers, setFollowers] = useState<Follower[]>([]);

	const inquiry: FollowInquiry = {
		page: 1,
		limit: 10,
		search: { followingId: memberId },
	};

	const { refetch } = useQuery(GET_MEMBER_FOLLOWERS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFollowers(data?.getMemberFollowers?.list ?? []);
		},
	});

	useEffect(() => {
		if (!followerEvent) return;
		refetch({ input: inquiry });
	}, [followerEvent]);

	const [subscribe] = useMutation(SUBSCRIBE);
	const [unsubscribe] = useMutation(UNSUBSCRIBE);
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const handleFollow = async (followerId: string, isFollowing: boolean) => {
		try {
			if (isFollowing) {
				await unsubscribe({ variables: { input: followerId } });
			} else {
				await subscribe({ variables: { input: followerId } });
			}
			const delta = isFollowing ? -1 : 1;
			setFollowers((prev) =>
				prev.map((f) =>
					f.followerData?._id === followerId
						? {
								...f,
								followedByMe: [
									{ followingId: followerId, followerId: memberId, myFollowing: !isFollowing },
								],
								followerData: f.followerData
									? { ...f.followerData, memberFollowers: (f.followerData.memberFollowers ?? 0) + delta }
									: f.followerData,
						  }
						: f,
				),
			);
		} catch {
			// errors handled globally by Apollo errorLink
		}
	};

	const handleLike = async (targetId: string, wasLiked: boolean) => {
		try {
			const result = await likeTargetMember({ variables: { input: targetId } });
			const serverMember = result.data?.likeTargetMember;
			setFollowers((prev) =>
				prev.map((f) =>
					f.followerData?._id === targetId
						? {
								...f,
								likedByMe: [{ myFavorite: !wasLiked, likeRefId: targetId, memberId: '' }],
								followerData: f.followerData
									? { ...f.followerData, memberLikes: serverMember?.memberLikes ?? f.followerData.memberLikes }
									: f.followerData,
						  }
						: f,
				),
			);
		} catch {
			// errors handled globally by Apollo errorLink
		}
	};

	const handleClick = (id: string) => {
		if (!!user?._id && user._id === id) {
			router.push('/mypage');
		} else {
			router.push(`/member/detail?memberId=${id}`);
		}
	};

	return (
		<Stack className="designer-followers-panel">
			<div className="member-list-header">
				<span className="member-list-col-name">Name</span>
				<span className="member-list-col-details">Details</span>
				<span className="member-list-col-action">Subscription</span>
			</div>
			<div className="member-list">
				{followers.map((person) => {
					const follower = person.followerData;
					if (!follower) return null;
					const image = follower.memberImage
						? `${REACT_APP_API_URL}/${follower.memberImage}`
						: DEFAULT_IMAGE;
					const isFollowing = person.followedByMe?.some((f) => f.myFollowing) ?? false;
					const isLiked = person.likedByMe?.[0]?.myFavorite ?? false;

					return (
						<div key={person._id} className="member-list-row" onClick={() => handleClick(follower._id)}>
							<div className="member-list-name">
								<div className="member-list-avatar">
									<img src={image} alt={follower.memberNick} />
								</div>
								<span className="member-list-nick">{follower.memberFullName || follower.memberNick}</span>
							</div>
							<div className="member-list-details">
								<span className="member-detail-item">
									<strong>Followers</strong> ({follower.memberFollowers ?? 0})
								</span>
								<span className="member-detail-item">
									<strong>Followings</strong> ({follower.memberFollowings ?? 0})
								</span>
								<span
									className="member-detail-item"
									style={{ cursor: 'pointer' }}
									onClick={(e) => {
										e.stopPropagation();
										handleLike(follower._id, isLiked);
									}}
								>
									<svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? '#e57373' : 'none'} stroke={isLiked ? '#e57373' : '#999'} strokeWidth="2">
										<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
									</svg>
									({follower.memberLikes ?? 0})
								</span>
							</div>
							<div className="member-list-action">
								<button
									className="member-follow-btn"
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										handleFollow(follower._id, isFollowing);
									}}
								>
									{isFollowing ? 'Unfollow' : 'Follow'}
								</button>
							</div>
						</div>
					);
				})}
				{followers.length === 0 && (
					<p style={{ padding: '24px', color: 'var(--color-text-muted)' }}>No followers yet.</p>
				)}
			</div>
		</Stack>
	);
};

export default DesignerFollowersPanel;
