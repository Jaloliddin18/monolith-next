import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { LikedByMe } from '../like/like';
import { FollowedByMe } from '../follow/follow';

export interface Member {
	_id: string;
	memberType: MemberType;
	memberStatus: MemberStatus;
	memberAuthType: MemberAuthType;
	memberPhone: string;
	memberNick: string;
	memberPassword?: string;
	memberFullName?: string;
	memberImage: string;
	memberAddress?: string;
	memberDesc?: string;
	memberDesigns: number;
	memberArticles: number;
	memberFollowers: number;
	memberFollowings: number;
	memberPoints: number;
	memberLikes: number;
	memberViews: number;
	memberComments: number;
	memberRank: number;
	memberWarnings: number;
	memberBlocks: number;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	accessToken?: string;

	/** from aggregation **/
	likedByMe?: LikedByMe[];
	followedByMe?: FollowedByMe[];
}

export interface TotalCounter {
	total: number;
}

export interface Members {
	list: Member[];
	metaCounter: TotalCounter[];
}
