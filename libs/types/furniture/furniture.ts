import {
	AssemblyDifficulty,
	AssemblyType,
	DeliveryMethod,
	FurnitureCategory,
	FurnitureColor,
	FurnitureMaterial,
	FurnitureRoom,
	FurnitureStatus,
	FurnitureStyle,
	SustainabilityLabel,
} from '../../enums/furniture.enum';
import { Member, TotalCounter } from '../member/member';
import { LikedByMe } from '../like/like';

export interface FurnitureDimensions {
	width?: number;
	height?: number;
	depth?: number;
}

export interface Furniture {
	_id: string;
	furnitureTitle: string;
	furnitureRoom: FurnitureRoom;
	furnitureCategory: FurnitureCategory;
	furnitureStyle: FurnitureStyle;
	furnitureStatus: FurnitureStatus;
	furnitureMaterial: FurnitureMaterial;
	sustainabilityLabel: SustainabilityLabel;
	assemblyType: AssemblyType;
	assemblyDifficulty: AssemblyDifficulty;
	deliveryMethod: DeliveryMethod;
	furniturePrice: number;
	furnitureLastChancePrice?: number;
	furnitureDimensions?: FurnitureDimensions;
	furnitureWeight: number;
	furnitureColor: FurnitureColor;
	assemblyTime?: number;
	furnitureImages: string[];
	furnitureVideo?: string;
	furniture3DModel?: string;
	furnitureDesc?: string;
	assemblyInstructions?: string;
	furnitureViews: number;
	furnitureLikes: number;
	furnitureComments: number;
	furnitureRank: number;
	furnitureRent: boolean;
	furnitureDiscount: number;
	discountStart?: Date;
	discountEnd?: Date;
	furnitureOnSale: boolean;
	furnitureBestseller: boolean;
	launchedAt?: Date;
	discontinuedAt?: Date;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	memberId: string;

	/** from aggregation **/
	memberData?: Member;
	likedByMe?: LikedByMe[];
}

export interface Furnitures {
	list: Furniture[];
	metaCounter: TotalCounter[];
}
