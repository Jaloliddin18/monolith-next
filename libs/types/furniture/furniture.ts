import { FurnitureCategory, FurnitureStatus, FurnitureType } from '../../enums/furniture.enum';
import { Member } from '../member/member';
import { MeLiked } from '../like/like';
import { TotalCounter } from '../common';

export interface Furniture {
	_id: string;
	furnitureType: FurnitureType;
	furnitureStatus: FurnitureStatus;
	furnitureCategory: FurnitureCategory;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureClearancePrice?: number;
	furnitureImages: string[];
	furnitureDesc?: string;
	furnitureViews: number;
	furnitureLikes: number;
	furnitureComments: number;
	furnitureRank: number;
	memberId: string;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
	meLiked?: MeLiked[];
}

export interface Furnitures {
	list: Furniture[];
	metaCounter: TotalCounter[];
}
