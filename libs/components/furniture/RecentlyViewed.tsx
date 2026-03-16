import React, { useState } from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
				<Typography className="section-title-text">Recently view</Typography>
				<Typography className="view-all-text">View all product</Typography>
			</Stack>
			<Stack className="recently-viewed-content" direction="row" alignItems="center" gap="24px">
				<IconButton className="nav-arrow nav-arrow-left" onClick={handlePrev} disabled={offset === 0}>
					<ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
				</IconButton>
				<Stack direction="row" gap="24px">
					{visibleFurnitures.map((furniture) => (
						<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} size="small" />
					))}
				</Stack>
				<IconButton className="nav-arrow nav-arrow-right" onClick={handleNext} disabled={offset >= maxOffset}>
					<ArrowForwardIosIcon sx={{ fontSize: 20 }} />
				</IconButton>
			</Stack>
		</Stack>
	);
};

export default RecentlyViewed;
