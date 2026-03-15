import React, { useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { Furniture } from '../../types/furniture/furniture';
import ProductCard from './ProductCard';

const categories = ['Lamp', 'Desks', 'Chair', 'Sofas', 'Bed', 'Table'];

interface ShopByCategoryProps {
	furnitures: Furniture[];
	onLike: (id: string) => void;
}

const ShopByCategory = ({ furnitures, onLike }: ShopByCategoryProps) => {
	const [activeCategory, setActiveCategory] = useState('Chair');

	return (
		<Stack className="category-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Shop by Category
			</Typography>

			<Stack direction="row" justifyContent="center" gap={2} className="category-tabs" mb={4}>
				{categories.map((cat) => (
					<Button
						key={cat}
						className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
						onClick={() => setActiveCategory(cat)}
					>
						{cat}
					</Button>
				))}
			</Stack>

			<Stack direction="row" className="product-grid" gap={3} justifyContent="center">
				{furnitures.slice(0, 4).map((furniture) => (
					<ProductCard key={furniture._id} furniture={furniture} onLike={onLike} />
				))}
			</Stack>
		</Stack>
	);
};

export default ShopByCategory;
