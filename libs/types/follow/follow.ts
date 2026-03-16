import { Member, TotalCounter } from '../member/member';
import { LikedByMe } from '../like/like';

export interface FollowedByMe {
	followingId: string;
	followerId: string;
	myFollowing: boolean;
}

export interface Follower {
	_id: string;
	followingId: string;
	followerId: string;
	createdAt: Date;
	updatedAt: Date;

	/** from aggregation **/
	likedByMe?: LikedByMe[];
	followedByMe?: FollowedByMe[];
	followerData?: Member;
}

export interface Following {
	_id: string;
	followingId: string;
	followerId: string;
	createdAt: Date;
	updatedAt: Date;

	/** from aggregation **/
	likedByMe?: LikedByMe[];
	followedByMe?: FollowedByMe[];
	followingData?: Member;
}

export interface Followings {
	list: Following[];
	metaCounter: TotalCounter[];
}

export interface Followers {
	list: Follower[];
	metaCounter: TotalCounter[];
}
