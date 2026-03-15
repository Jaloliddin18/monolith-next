import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

interface LivingRoomProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const LivingRoom = ({ furnitures, onLike }: LivingRoomProps) => {
	return (
		<Stack className="living-room-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Living Room Furniture to Suit Your Lifestyle
			</Typography>

			<Stack direction="row" gap={3}>
				{/* Featured Large Card */}
				<Box className="living-featured">
					<Box className="living-featured-img">
						<img src="/img/furniture/placeholder.png" alt="Lounge Chair" />
					</Box>
					<Typography variant="h6" mt={1}>Lounge Chair</Typography>
					<Typography variant="body2" color="primary" fontWeight={600}>$32.10</Typography>
				</Box>

				{/* Sidebar Filters + Grid */}
				<Box className="living-grid-area">
					<Stack direction="row" gap={2} mb={3} className="living-filters">
						{['Top selection', 'Categories', 'Color', 'NewArrivals', 'MustHaves'].map((filter) => (
							<Typography key={filter} variant="body2" className="filter-tab">
								{filter}
							</Typography>
						))}
					</Stack>

					<Stack direction="row" flexWrap="wrap" gap={2}>
						{furnitures.slice(0, 6).map((furniture) => (
							<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
						))}
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
};

export default LivingRoom;
