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
} from '../../enums/furniture.enum';
import { Direction } from '../../enums/common.enum';

interface FurnitureDimensionsInput {
	width?: number;
	height?: number;
	depth?: number;
}

export interface FurnitureInput {
	furnitureTitle: string;
	furnitureRoom: FurnitureRoom;
	furnitureCategory: FurnitureCategory;
	furnitureStyle: FurnitureStyle;
	furniturePrice: number;
	furnitureWeight: number;
	furnitureMaterial: FurnitureMaterial;
	furnitureColor: FurnitureColor;
	assemblyType: AssemblyType;
	assemblyTime?: number;
	assemblyDifficulty?: AssemblyDifficulty;
	deliveryMethod: DeliveryMethod;
	furnitureImages: string[];
	furnitureDesc?: string;
	memberId?: string;
	furnitureRent?: boolean;
	furnitureDiscount?: number;
	discountStart?: Date;
	discountEnd?: Date;
	furnitureOnSale?: boolean;
	furnitureBestseller?: boolean;
	launchedAt?: Date;
	furnitureDimensions?: FurnitureDimensionsInput;
}

export interface PricesRange {
	start: number;
	end: number;
}

export interface PeriodsRange {
	start: Date;
	end: Date;
}

export interface DimensionsRange {
	minWidth?: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	minDepth?: number;
	maxDepth?: number;
}

export interface FIsearch {
	memberId?: string;
	roomList?: FurnitureRoom[];
	categoryList?: FurnitureCategory[];
	styleList?: FurnitureStyle[];
	materialList?: FurnitureMaterial[];
	colorList?: FurnitureColor[];
	assemblyDifficultyList?: AssemblyDifficulty[];
	options?: string[];
	pricesRange?: PricesRange;
	dimensionsRange?: DimensionsRange;
	periodsRange?: PeriodsRange;
	text?: string;
	furnitureDiscountMin?: number;
}

export interface FurnituresInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search?: FIsearch;
}

interface DFISearch {
	furnitureStatus?: FurnitureStatus;
}

export interface DesignerFurnituresInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search?: DFISearch;
}

interface ALFISearch {
	furnitureStatus?: FurnitureStatus;
	roomList?: FurnitureRoom[];
	categoryList?: FurnitureCategory[];
}

export interface AllFurnituresInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search?: ALFISearch;
}

export interface OrdinaryInquiry {
	page: number;
	limit: number;
}
