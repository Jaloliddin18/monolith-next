import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_FURNITURES } from '../../../apollo/user/query';
import { Furniture } from '../../types/furniture/furniture';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import { Direction } from '../../enums/common.enum';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const popularInquiry: FurnituresInquiry = {
	page: 1,
	limit: 5,
	sort: 'furnitureRank',
	direction: Direction.DESC,
	search: {},
};

const PopularProducts = () => {
	const router = useRouter();
	const [furnitures, setFurnitures] = useState<Furniture[]>([]);

	useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: popularInquiry },
		onCompleted: (data: T) => {
			setFurnitures(data?.getFurnitures?.list ?? []);
		},
	});

	const featured = furnitures[0];
	const gridItems = furnitures.slice(1, 5);

	const getImage = (f: Furniture) =>
		f.furnitureImages?.[0] ? `${REACT_APP_API_URL}/${f.furnitureImages[0]}` : DEFAULT_IMAGE;

	const handleClick = (id: string) => router.push(`/furniture/detail?id=${id}`);

	return (
		<Stack className="popular-products-section">
			{/* Header */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" className="popular-products-header">
				<Typography className="popular-products-title">Popular product</Typography>
				<Link href="/furniture" style={{ textDecoration: 'none' }}>
					<Stack direction="row" alignItems="center" gap="10px" className="popular-view-all">
						<Typography className="popular-view-all-text">View All product</Typography>
						<Box component="img" src="/icons/ArrowUpRight.svg" alt="↗" width={20} height={20} />
					</Stack>
				</Link>
			</Stack>

			{/* Content row */}
			<Stack direction="row" gap="24px" className="popular-products-content">
				{/* Left: featured large card */}
				<Box className="popular-featured-card" onClick={() => featured && handleClick(featured._id)} sx={{ cursor: featured ? 'pointer' : 'default' }}>
					<img src={featured ? getImage(featured) : DEFAULT_IMAGE} alt={featured?.furnitureTitle ?? 'Featured'} className="popular-featured-img" />

					{/* Hotspot dots */}
					<Box className="popular-hotspot" sx={{ left: '381px', top: '329px' }} />
					<Box className="popular-hotspot" sx={{ left: '124px', top: '329px' }} />
					<Box className="popular-hotspot" sx={{ left: '454px', top: '483px' }} />

					{/* Info popup */}
					<Stack className="popular-featured-popup" gap="24px" alignItems="center">
						<Stack gap="12px" alignItems="center">
							<Typography className="popular-featured-name">
								{featured?.furnitureTitle ?? 'Lounge Chair'}
							</Typography>
							<Typography className="popular-featured-price">
								$ {featured?.furniturePrice?.toFixed(2) ?? '32.10'}
							</Typography>
						</Stack>
						<Box className="popular-buy-btn" onClick={(e) => { e.stopPropagation(); featured && handleClick(featured._id); }}>
							<Typography className="popular-buy-btn-text">BUY NOW</Typography>
						</Box>
					</Stack>
				</Box>

				{/* Right: 2×2 grid */}
				<Stack direction="row" flexWrap="wrap" gap="24px" className="popular-grid">
					{(gridItems.length > 0 ? gridItems : Array(4).fill(null)).map((item: Furniture | null, idx) => {
						const image = item ? getImage(item) : DEFAULT_IMAGE;
						const title = item?.furnitureTitle ?? 'Perfect Bed for a Restorative';
						const price = item?.furniturePrice ?? 40.5;
						const hasDiscount = item && item.furnitureDiscount > 0;
						const originalPrice = hasDiscount ? price / (1 - item!.furnitureDiscount / 100) : null;

						return (
							<Stack
								key={item?._id ?? `placeholder-${idx}`}
								className="popular-grid-card"
								gap="14px"
								onClick={() => item && handleClick(item._id)}
								sx={{ cursor: item ? 'pointer' : 'default' }}
							>
								<Box className="popular-grid-img">
									{item?.furnitureBestseller && (
										<Box className="popular-grid-badge bestseller">Best seller</Box>
									)}
									<img src={image} alt={title} />
								</Box>
								<Stack gap="4px">
									<Typography className="popular-grid-title">{title}</Typography>
									<Stack direction="row" alignItems="center" gap="8px">
										<Typography className="popular-grid-price">${price.toFixed(2)}</Typography>
										{originalPrice && (
											<Typography className="popular-grid-price-old">${originalPrice.toFixed(2)}</Typography>
										)}
									</Stack>
								</Stack>
							</Stack>
						);
					})}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PopularProducts;
