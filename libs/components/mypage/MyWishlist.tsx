import { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box, Typography, IconButton, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Link from 'next/link';
import { Furniture } from '../../types/furniture/furniture';
import { FurnitureStatus, FurnitureCategory, FurnitureRoom, FurnitureStyle, FurnitureMaterial, FurnitureColor, AssemblyType, AssemblyDifficulty, DeliveryMethod, SustainabilityLabel } from '../../enums/furniture.enum';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

const hardcodedWishlist: Furniture[] = [
	{
		_id: 'wish-1',
		furnitureTitle: 'Elegant Comfort Chair',
		furniturePrice: 224.99,
		furnitureLastChancePrice: 179.99,
		furnitureImages: [],
		furnitureRank: 44,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 30,
		furnitureComments: 5,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.MODERN,
		furnitureMaterial: FurnitureMaterial.SOLID_WOOD,
		furnitureColor: FurnitureColor.BLACK,
		furnitureWeight: 15,
		furnitureRent: false,
		furnitureDiscount: 20,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'wish-2',
		furnitureTitle: 'Elegant Comfort Chair',
		furniturePrice: 142.84,
		furnitureLastChancePrice: 99.99,
		furnitureImages: [],
		furnitureRank: 46,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.DISCONTINUED,
		furnitureLikes: 22,
		furnitureComments: 3,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.MODERN,
		furnitureMaterial: FurnitureMaterial.FABRIC,
		furnitureColor: FurnitureColor.BROWN,
		furnitureWeight: 12,
		furnitureRent: false,
		furnitureDiscount: 30,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'wish-3',
		furnitureTitle: 'Modern Floating Bed',
		furniturePrice: 899,
		furnitureLastChancePrice: 764.25,
		furnitureImages: [],
		furnitureRank: 45,
		furnitureViews: 5560,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 45,
		furnitureComments: 8,
		furnitureRoom: FurnitureRoom.BEDROOM,
		furnitureCategory: FurnitureCategory.BEDS_MATTRESSES,
		furnitureStyle: FurnitureStyle.MODERN,
		furnitureMaterial: FurnitureMaterial.SOLID_WOOD,
		furnitureColor: FurnitureColor.BLACK,
		furnitureWeight: 50,
		furnitureRent: false,
		furnitureDiscount: 30,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.SELF_ASSEMBLY,
		assemblyDifficulty: AssemblyDifficulty.MEDIUM,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'wish-4',
		furnitureTitle: 'Elegant Comfort Chair',
		furniturePrice: 144.43,
		furnitureLastChancePrice: 129.99,
		furnitureImages: [],
		furnitureRank: 34,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 18,
		furnitureComments: 2,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.TRADITIONAL,
		furnitureMaterial: FurnitureMaterial.LEATHER,
		furnitureColor: FurnitureColor.BLACK,
		furnitureWeight: 14,
		furnitureRent: false,
		furnitureDiscount: 10,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'wish-5',
		furnitureTitle: 'Elegant Comfort Chair',
		furniturePrice: 144.43,
		furnitureLastChancePrice: 129.99,
		furnitureImages: [],
		furnitureRank: 34,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 10,
		furnitureComments: 1,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.TRADITIONAL,
		furnitureMaterial: FurnitureMaterial.LEATHER,
		furnitureColor: FurnitureColor.BLACK,
		furnitureWeight: 14,
		furnitureRent: false,
		furnitureDiscount: 10,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

export const hardcodedRecentlyViewed: Furniture[] = [
	{
		_id: 'rv-1',
		furnitureTitle: 'Elegant Crystal Chandelie',
		furniturePrice: 199,
		furnitureLastChancePrice: 159.20,
		furnitureImages: [],
		furnitureRank: 47,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 55,
		furnitureComments: 12,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.MODERN,
		furnitureMaterial: FurnitureMaterial.METAL,
		furnitureColor: FurnitureColor.NATURAL_WOOD,
		furnitureWeight: 8,
		furnitureRent: false,
		furnitureDiscount: 20,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'rv-2',
		furnitureTitle: 'Velvet Swivel Chair',
		furniturePrice: 349,
		furnitureLastChancePrice: 279.20,
		furnitureImages: [],
		furnitureRank: 47,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 40,
		furnitureComments: 6,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.MODERN,
		furnitureMaterial: FurnitureMaterial.FABRIC,
		furnitureColor: FurnitureColor.GREEN,
		furnitureWeight: 18,
		furnitureRent: false,
		furnitureDiscount: 20,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'rv-3',
		furnitureTitle: 'Contemporary Accent Chair',
		furniturePrice: 349,
		furnitureLastChancePrice: 279.20,
		furnitureImages: [],
		furnitureRank: 47,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 35,
		furnitureComments: 4,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.SCANDINAVIAN,
		furnitureMaterial: FurnitureMaterial.FABRIC,
		furnitureColor: FurnitureColor.BLUE,
		furnitureWeight: 16,
		furnitureRent: false,
		furnitureDiscount: 20,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: 'rv-4',
		furnitureTitle: 'Mid-Century Armchair',
		furniturePrice: 399,
		furnitureLastChancePrice: 319.20,
		furnitureImages: [],
		furnitureRank: 47,
		furnitureViews: 12125,
		furnitureStatus: FurnitureStatus.ACTIVE,
		furnitureLikes: 28,
		furnitureComments: 3,
		furnitureRoom: FurnitureRoom.LIVING_ROOM,
		furnitureCategory: FurnitureCategory.CHAIRS,
		furnitureStyle: FurnitureStyle.INDUSTRIAL,
		furnitureMaterial: FurnitureMaterial.SOLID_WOOD,
		furnitureColor: FurnitureColor.BROWN,
		furnitureWeight: 20,
		furnitureRent: false,
		furnitureDiscount: 20,
		furnitureOnSale: true,
		furnitureBestseller: false,
		assemblyType: AssemblyType.PRE_ASSEMBLED,
		assemblyDifficulty: AssemblyDifficulty.EASY,
		deliveryMethod: DeliveryMethod.HOME_DELIVERY,
		sustainabilityLabel: SustainabilityLabel.NONE,
		memberId: 'member-1',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

const MyWishlist = () => {
	const router = useRouter();
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [wishlistItems, setWishlistItems] = useState(hardcodedWishlist);

	const handleRemoveFromWishlist = (furnitureId: string) => {
		setWishlistItems((prev) => prev.filter((item) => item._id !== furnitureId));
	};

	const getDiscount = (furniture: Furniture) => {
		const clearancePrice = furniture.furnitureLastChancePrice;
		if (clearancePrice && clearancePrice < furniture.furniturePrice) {
			const percent = Math.round(((furniture.furniturePrice - clearancePrice) / furniture.furniturePrice) * 100);
			return { hasDiscount: true, discountPrice: clearancePrice, percent };
		}
		return { hasDiscount: false, discountPrice: 0, percent: 0 };
	};

	const getRating = (furniture: Furniture) => {
		return furniture.furnitureRank ? (furniture.furnitureRank / 10).toFixed(1) : '4.5';
	};

	return (
		<Stack className="wishlist-content">
			<Typography className="content-title">My Wishlist({wishlistItems.length})</Typography>

			{wishlistItems.length === 0 ? (
				<Box className="placeholder-content">Your wishlist is empty</Box>
			) : (
				<Stack className="wishlist-items">
					{wishlistItems.map((furniture) => {
						const { hasDiscount, discountPrice, percent } = getDiscount(furniture);
						const isOutOfStock = furniture.furnitureStatus === FurnitureStatus.DISCONTINUED;
						const isHovered = hoveredId === furniture._id;

						return (
							<Box
								key={furniture._id}
								className="wishlist-item"
								onMouseEnter={() => setHoveredId(furniture._id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<Box className="wishlist-item-image">
									<Link href={`/furniture/detail?id=${furniture._id}`}>
										<img src={PLACEHOLDER_IMG} alt={furniture.furnitureTitle} />
									</Link>
									{isOutOfStock && (
										<Box className="out-of-stock-badge">
											<Typography>Out of stock</Typography>
										</Box>
									)}
									{isHovered && !isOutOfStock && (
										<Button
											className="move-to-cart-btn"
											onClick={() => router.push(`/furniture/detail?id=${furniture._id}`)}
										>
											MOVE TO CART
										</Button>
									)}
								</Box>

								<Stack className="wishlist-item-details">
									<Stack className="item-top-row" direction="row" justifyContent="space-between" alignItems="flex-start">
										<Stack gap="8px">
											<Stack direction="row" alignItems="center" gap="8px">
												<Box className="rating-badge">
													<Typography className="rating-value">{getRating(furniture)}</Typography>
													<img src="/icons/star_icon.svg" alt="star" width={12} height={12} />
												</Box>
												<Typography className="review-count">({furniture.furnitureViews?.toLocaleString() || 0})</Typography>
											</Stack>
											<Link href={`/furniture/detail?id=${furniture._id}`}>
												<Typography className="item-title">{furniture.furnitureTitle}</Typography>
											</Link>
											<Stack direction="row" alignItems="center" gap="8px">
												<Typography className="item-price">
													${hasDiscount ? discountPrice.toFixed(2) : furniture.furniturePrice.toFixed(2)}
												</Typography>
												{hasDiscount && (
													<>
														<Typography className="item-price-old">${furniture.furniturePrice.toFixed(2)}</Typography>
														<Typography className="item-discount">({percent}% off)</Typography>
													</>
												)}
											</Stack>
										</Stack>
										<IconButton className="delete-btn" onClick={() => handleRemoveFromWishlist(furniture._id)}>
											<DeleteOutlineIcon sx={{ fontSize: 20, color: '#999' }} />
										</IconButton>
									</Stack>
								</Stack>
							</Box>
						);
					})}
				</Stack>
			)}

			{wishlistItems.length > 0 && (
				<Button className="continues-shopping-btn" onClick={() => router.push('/furniture')}>
					CONTINUES SHOPPING
				</Button>
			)}

		</Stack>
	);
};

export default MyWishlist;
