import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { GET_MEMBER_FOLLOWERS } from '../../../apollo/user/query';
import { Follower } from '../../types/follow/follow';
import { FollowInquiry } from '../../types/follow/follow.input';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';

const DEFAULT_INPUT: FollowInquiry = { page: 1, limit: 5, search: { followingId: '' } };

interface MyFollowersProps {
	subscribeHandler: (id: string, refetch: any, query: any) => Promise<void>;
	unsubscribeHandler: (id: string, refetch: any, query: any) => Promise<void>;
	likeMemberHandler: (id: string, refetch: any, query: any) => Promise<void>;
}

const MyFollowers = ({ subscribeHandler, unsubscribeHandler, likeMemberHandler }: MyFollowersProps) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [followInquiry, setFollowInquiry] = useState<FollowInquiry>(DEFAULT_INPUT);
	const [memberFollowers, setMemberFollowers] = useState<Follower[]>([]);
	const [total, setTotal] = useState(0);

	const { refetch } = useQuery(GET_MEMBER_FOLLOWERS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: followInquiry },
		skip: !followInquiry.search?.followingId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberFollowers(data?.getMemberFollowers?.list ?? []);
			setTotal(data?.getMemberFollowers?.metaCounter?.[0]?.total ?? 0);
		},
	});

	useEffect(() => {
		if (user?._id) {
			setFollowInquiry((prev) => ({ ...prev, search: { followingId: user._id } }));
		}
	}, [user?._id]);

	useEffect(() => {
		if (followInquiry.search?.followingId) {
			refetch({ input: followInquiry });
		}
	}, [followInquiry]);

	const paginationHandler = (_e: ChangeEvent<unknown>, page: number) => {
		setFollowInquiry((prev) => ({ ...prev, page }));
	};

	return (
		<Stack className="follows-content">
			<Typography className="content-title">Followers</Typography>

			<Stack className="follows-list-box">
				<Stack className="follows-listing-header" direction="row">
					<Typography className="header-text">Name</Typography>
					<Typography className="header-text">Details</Typography>
					<Typography className="header-text">Subscription</Typography>
				</Stack>

				{memberFollowers.length === 0 && (
					<Typography className="no-follows-text">No followers yet!</Typography>
				)}

				{memberFollowers.map((follower: Follower) => {
					const member = follower.followerData;
					const imagePath = member?.memberImage
						? `${REACT_APP_API_URL}/${member.memberImage}`
						: '/general_images/default_profile.png';
					const isFollowingBack = follower.followedByMe?.[0]?.myFollowing ?? false;
					const isLiked = follower.likedByMe?.[0]?.myFavorite ?? false;
					const isMe = user?._id === follower.followerId;

					return (
						<Stack className="follows-card" key={follower._id} direction="row" alignItems="center">
							<Stack
								className="follows-card-name"
								direction="row"
								alignItems="center"
								gap="12px"
								onClick={() =>
									!!user?._id && user._id === member?._id
										? router.push('/mypage')
										: router.push(`/member/detail?memberId=${member?._id}`)
								}
								sx={{ cursor: 'pointer' }}
							>
								<Box
									component="img"
									src={imagePath}
									alt={member?.memberNick}
									sx={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
								/>
								<Typography className="follows-member-nick">{member?.memberNick ?? 'Anonymous'}</Typography>
							</Stack>

							<Stack className="follows-card-details" direction="row" gap="24px">
								<Box className="follows-stat">
									<span>Followers</span>
									<span>({member?.memberFollowers ?? 0})</span>
								</Box>
								<Box className="follows-stat">
									<span>Followings</span>
									<span>({member?.memberFollowings ?? 0})</span>
								</Box>
								<Box
									className="follows-stat follows-like"
									onClick={() => likeMemberHandler(member?._id ?? '', refetch, followInquiry)}
									sx={{ cursor: 'pointer' }}
								>
									{isLiked ? (
										<FavoriteIcon sx={{ fontSize: 18, color: '#e57373' }} />
									) : (
										<FavoriteBorderIcon sx={{ fontSize: 18, color: '#888' }} />
									)}
									<span>({member?.memberLikes ?? 0})</span>
								</Box>
							</Stack>

							<Stack className="follows-card-action" direction="row" alignItems="center" gap="8px">
								{!isMe && (
									<>
										{isFollowingBack && (
											<Typography className="following-label">Following</Typography>
										)}
										{isFollowingBack ? (
											<Button
												className="unfollow-btn"
												onClick={() => unsubscribeHandler(member?._id ?? '', refetch, followInquiry)}
											>
												Unfollow
											</Button>
										) : (
											<Button
												className="follow-btn"
												onClick={() => subscribeHandler(member?._id ?? '', refetch, followInquiry)}
											>
												Follow
											</Button>
										)}
									</>
								)}
							</Stack>
						</Stack>
					);
				})}
			</Stack>

			{total > 5 && (
				<Stack className="follows-pagination" alignItems="center" gap="8px">
					<Pagination
						page={followInquiry.page}
						count={Math.ceil(total / followInquiry.limit)}
						onChange={paginationHandler}
						shape="rounded"
						color="primary"
					/>
					<Typography className="follows-total">{total} followers</Typography>
				</Stack>
			)}
		</Stack>
	);
};

export default MyFollowers;
