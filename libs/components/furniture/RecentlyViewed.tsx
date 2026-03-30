import { useState } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductCard from '../common/ProductCard';

const recentItems = [
	{ id: '10', title: 'Oak Dining Table', price: 120.00, originalPrice: 200.00, discount: 40, rating: 4.5, reviewCount: 7890 },
	{ id: '11', title: 'Leather Recliner', price: 85.50, originalPrice: 171.00, discount: 50, rating: 4.3, reviewCount: 5430 },
	{ id: '12', title: 'Glass Console Table', price: 42.00, originalPrice: 70.00, discount: 40, rating: 4.6, reviewCount: 3210 },
	{ id: '13', title: 'Woven Storage Basket', price: 18.90, originalPrice: 37.80, discount: 50, rating: 4.1, reviewCount: 9100 },
	{ id: '14', title: 'Marble Side Table', price: 65.00, originalPrice: 130.00, discount: 50, rating: 4.7, reviewCount: 6540 },
	{ id: '15', title: 'Fabric Sofa Set', price: 199.00, originalPrice: 398.00, discount: 50, rating: 4.4, reviewCount: 11200 },
	{ id: '16', title: 'Wooden Wall Shelf', price: 29.99, originalPrice: 49.99, discount: 40, rating: 4.2, reviewCount: 4320 },
	{ id: '17', title: 'Ceramic Floor Lamp', price: 55.00, originalPrice: 110.00, discount: 50, rating: 4.8, reviewCount: 8760 },
];

interface RecentlyViewedProps {
	onLike?: (id: string) => void;
}

const RecentlyViewed = ({ onLike }: RecentlyViewedProps) => {
	const [offset, setOffset] = useState(0);
	const visibleCount = 4;
	const maxOffset = Math.max(0, recentItems.length - visibleCount);

	const handlePrev = () => setOffset((prev) => Math.max(0, prev - 1));
	const handleNext = () => setOffset((prev) => Math.min(maxOffset, prev + 1));

	const visibleItems = recentItems.slice(offset, offset + visibleCount);

	return (
		<Stack className="recently-viewed-section" alignItems="center">
			<Stack className="recently-viewed-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="section-title-text">Recently View</Typography>
				<Stack direction="row" gap="24px" alignItems="center">
					<IconButton className="nav-arrow" onClick={handlePrev} disabled={offset === 0}>
						<ArrowBackIcon sx={{ fontSize: 24, color: '#000' }} />
					</IconButton>
					<IconButton className="nav-arrow" onClick={handleNext} disabled={offset >= maxOffset}>
						<ArrowForwardIcon sx={{ fontSize: 24, color: '#000' }} />
					</IconButton>
				</Stack>
			</Stack>
			<Stack className="recently-viewed-content" direction="row" gap="24px">
				{visibleItems.map((item) => (
					<ProductCard
						key={item.id}
						id={item.id}
						image="/img/furniture/luxury_chair.jpg"
						title={item.title}
						price={item.price}
						originalPrice={item.originalPrice}
						discount={item.discount}
						rating={item.rating}
						reviewCount={item.reviewCount}
						onLike={onLike}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default RecentlyViewed;
