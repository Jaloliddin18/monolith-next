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

interface FurnitureDimensionsUpdate {
	width?: number;
	height?: number;
	depth?: number;
}

export interface FurnitureUpdate {
	_id: string;
	furnitureTitle?: string;
	furnitureRoom?: FurnitureRoom;
	furnitureCategory?: FurnitureCategory;
	furnitureStyle?: FurnitureStyle;
	furnitureStatus?: FurnitureStatus;
	furniturePrice?: number;
	furnitureLastChancePrice?: number;
	furnitureDimensions?: FurnitureDimensionsUpdate;
	furnitureWeight?: number;
	furnitureMaterial?: FurnitureMaterial;
	furnitureColor?: FurnitureColor;
	sustainabilityLabel?: SustainabilityLabel;
	assemblyType?: AssemblyType;
	assemblyTime?: number;
	assemblyDifficulty?: AssemblyDifficulty;
	deliveryMethod?: DeliveryMethod;
	furnitureImages?: string[];
	furnitureVideo?: string;
	furniture3DModel?: string;
	furnitureDesc?: string;
	assemblyInstructions?: string;
	furnitureRent?: boolean;
	furnitureDiscount?: number;
	discountStart?: Date;
	discountEnd?: Date;
	furnitureOnSale?: boolean;
	furnitureBestseller?: boolean;
	discontinuedAt?: Date;
	deletedAt?: Date;
}
