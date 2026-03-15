import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { MeFollowed } from '../follow/follow';
import { MeLiked } from '../like/like';
import { TotalCounter } from '../common';

export interface Member {
	_id: string;
	memberType: MemberType;
	memberStatus: MemberStatus;
	memberAuthType: MemberAuthType;
	memberPhone: string;
	memberNick: string;
	memberPassword?: string;
	memberFullName?: string;
	memberImage?: string;
	memberAddress?: string;
	memberDesc?: string;
	memberFurnitures: number;
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
	meLiked?: MeLiked[];
	meFollowed?: MeFollowed[];
}

export interface Members {
	list: Member[];
	metaCounter: TotalCounter[];
}
