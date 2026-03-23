import { useState } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from '../homepage/ProductCard';

interface RecentlyViewedProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const RecentlyViewed = ({ furnitures, onLike }: RecentlyViewedProps) => {
	const [offset, setOffset] = useState(0);
	const visibleCount = 4;
	const maxOffset = Math.max(0, furnitures.length - visibleCount);

	const handlePrev = () => setOffset((prev) => Math.max(0, prev - 1));
	const handleNext = () => setOffset((prev) => Math.min(maxOffset, prev + 1));

	const visibleFurnitures = furnitures.slice(offset, offset + visibleCount);

	if (furnitures.length === 0) return null;

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
				{visibleFurnitures.map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} size="small" />
				))}
			</Stack>
		</Stack>
	);
};

export default RecentlyViewed;
