import React, { useState } from 'react';
import { Box, Stack, Typography, Slider } from '@mui/material';
import { FurnitureRoom, FurnitureMaterial, FurnitureColor, FurnitureStyle } from '../../enums/furniture.enum';
import { FIsearch } from '../../types/furniture/furniture.input';

interface FilterSidebarProps {
	searchFilter: FIsearch;
	onFilterChange: (search: FIsearch) => void;
}



const colorMap: Record<FurnitureColor, string> = {
	[FurnitureColor.WHITE]: '#FFFFFF',
	[FurnitureColor.BLACK]: '#1C1C1C',
	[FurnitureColor.GREY]: '#8A8A8A',
	[FurnitureColor.BROWN]: '#6B4226',
	[FurnitureColor.BEIGE]: '#C8B99A',
	[FurnitureColor.RED]: '#8B1A1A',
	[FurnitureColor.BLUE]: '#1B3A6B',
	[FurnitureColor.GREEN]: '#2D5A27',
	[FurnitureColor.YELLOW]: '#C9A84C',
	[FurnitureColor.ORANGE]: '#C46A4A',
	[FurnitureColor.PINK]: '#C47A8A',
	[FurnitureColor.PURPLE]: '#4A2D6B',
	[FurnitureColor.NATURAL_WOOD]: 'linear-gradient(135deg, #8B6340, #C4956A)',
	[FurnitureColor.MULTICOLOR]: 'linear-gradient(135deg, #C46A4A, #1B3A6B, #2D5A27)',
};


const FilterSidebar = ({ searchFilter, onFilterChange }: FilterSidebarProps) => {
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
		room: true,
		style: true,
		material: true,
		colors: true,
		discount: true,
		price: true,
	});
	const [selectedDiscount, setSelectedDiscount] = useState<number>(0);

	const toggle = (s: string) => setExpandedSections((p) => ({ ...p, [s]: !p[s] }));

	const applyFilter = (search: FIsearch) => {
		const scrollPos = window.scrollY;
		onFilterChange(search);
		requestAnimationFrame(() => {
			window.scrollTo(0, scrollPos);
		});
	};

	const clearAll = () => {
		applyFilter({});
		setSelectedDiscount(0);
	};

	const toggleRoom = (room: FurnitureRoom) => {
		const cur = searchFilter.roomList || [];
		const next = cur.includes(room) ? cur.filter((r) => r !== room) : [...cur, room];
		applyFilter({ ...searchFilter, roomList: next.length ? next : undefined });
	};

	const toggleStyle = (style: FurnitureStyle) => {
		const cur = searchFilter.styleList || [];
		const next = cur.includes(style) ? cur.filter((s) => s !== style) : [...cur, style];
		applyFilter({ ...searchFilter, styleList: next.length ? next : undefined });
	};

	const toggleMaterial = (mat: FurnitureMaterial) => {
		const cur = searchFilter.materialList || [];
		const next = cur.includes(mat) ? cur.filter((m) => m !== mat) : [...cur, mat];
		applyFilter({ ...searchFilter, materialList: next.length ? next : undefined });
	};

	const toggleColor = (color: FurnitureColor) => {
		const cur = searchFilter.colorList || [];
		const next = cur.includes(color) ? cur.filter((c) => c !== color) : [...cur, color];
		applyFilter({ ...searchFilter, colorList: next.length ? next : undefined });
	};

	const handleDiscount = (_: Event, v: number | number[]) => {
		const val = v as number;
		setSelectedDiscount(val);
		applyFilter({ ...searchFilter, furnitureDiscountMin: val > 0 ? val : undefined });
	};

	const handlePrice = (_: Event, v: number | number[]) => {
		const [start, end] = v as number[];
		applyFilter({ ...searchFilter, pricesRange: { start, end } });
	};

	const price = searchFilter.pricesRange || { start: 0, end: 5000 };
	const allRooms = Object.values(FurnitureRoom);
	const allStyles = Object.values(FurnitureStyle);
	const allMats = Object.values(FurnitureMaterial);
	const allColors = Object.values(FurnitureColor);

	const Chevron = ({ sectionKey }: { sectionKey: string }) => (
		<Box
			component="img"
			src="/icons/CaretDown.svg"
			alt="▾"
			width={24}
			height={24}
			sx={{
				transform: expandedSections[sectionKey] ? 'rotate(180deg)' : 'none',
				transition: 'transform 0.2s',
			}}
		/>
	);

	const CustomCheckbox = ({ checked }: { checked: boolean }) => (
		<Box className={`filter-custom-checkbox${checked ? ' checked' : ''}`} />
	);

	return (
		<Stack className="filter-sidebar">
			{/* Header */}
			<Stack className="filter-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="filter-title">Filters</Typography>
				<Stack className="clear-all-btn" direction="row" alignItems="center" gap="12px" onClick={clearAll}>
					<Typography className="clear-all-text">CLEAR ALL</Typography>
					<Box sx={{ fontSize: 16, lineHeight: 1, color: '#000', userSelect: 'none' }}>×</Box>
				</Stack>
			</Stack>

			{/* Room Type */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('room')}>
					<Typography className="filter-section-title">Room Type</Typography>
					<Chevron sectionKey="room" />
				</Stack>
				{expandedSections.room && (
					<Stack className="filter-section-body">
						{allRooms.map((room) => (
							<Stack key={room} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => toggleRoom(room)} sx={{ cursor: 'pointer' }}>
								<CustomCheckbox checked={searchFilter.roomList?.includes(room) || false} />
								<Typography className="filter-checkbox-label">{room.replace(/_/g, ' ')}</Typography>
							</Stack>
						))}
					</Stack>
				)}
			</Stack>

			{/* Style */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('style')}>
					<Typography className="filter-section-title">Style</Typography>
					<Chevron sectionKey="style" />
				</Stack>
				{expandedSections.style && (
					<Stack className="filter-section-body">
						{allStyles.map((style) => (
							<Stack key={style} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => toggleStyle(style)} sx={{ cursor: 'pointer' }}>
								<CustomCheckbox checked={searchFilter.styleList?.includes(style) || false} />
								<Typography className="filter-checkbox-label">{style.replace(/_/g, ' ')}</Typography>
							</Stack>
						))}
					</Stack>
				)}
			</Stack>

			{/* Material */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('material')}>
					<Typography className="filter-section-title">Material</Typography>
					<Chevron sectionKey="material" />
				</Stack>
				{expandedSections.material && (
					<Stack className="filter-section-body">
						{allMats.map((mat) => (
							<Stack key={mat} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => toggleMaterial(mat)} sx={{ cursor: 'pointer' }}>
								<CustomCheckbox checked={searchFilter.materialList?.includes(mat) || false} />
								<Typography className="filter-checkbox-label">{mat.replace(/_/g, ' ')}</Typography>
							</Stack>
						))}
					</Stack>
				)}
			</Stack>

			{/* Colors */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('colors')}>
					<Typography className="filter-section-title">Colors</Typography>
					<Chevron sectionKey="colors" />
				</Stack>
				{expandedSections.colors && (
					<Stack className="filter-section-body">
						<Stack direction="row" flexWrap="wrap" gap="14px" sx={{ py: '8px', px: '4px' }}>
							{allColors.map((color) => (
								<Box
									key={color}
									className={`filter-color-swatch${searchFilter.colorList?.includes(color) ? ' selected' : ''}`}
									sx={{
										background: colorMap[color],
										border: color === FurnitureColor.WHITE ? '1.5px solid #E8E0D8' : '1.5px solid transparent',
									}}
									onClick={() => toggleColor(color)}
								/>
							))}
						</Stack>
					</Stack>
				)}
			</Stack>

			{/* Discount Offer */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('discount')}>
					<Typography className="filter-section-title">Discount offer</Typography>
					<Chevron sectionKey="discount" />
				</Stack>
				{expandedSections.discount && (
					<Stack className="filter-price-range">
						<Slider
							value={selectedDiscount}
							onChange={handleDiscount}
							min={0}
							max={100}
							step={5}
							valueLabelDisplay="off"
							sx={{
								color: '#1C1A17',
								mt: '8px',
								mb: '4px',
								'& .MuiSlider-thumb': {
									width: 14,
									height: 14,
									backgroundColor: '#1C1A17',
									border: '2px solid #fff',
									boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
									'&:hover': { boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
									'&.Mui-active': { boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
									'&.Mui-focusVisible': { boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
									'&::before': { display: 'none' },
								},
								'& .MuiSlider-track': { backgroundColor: '#1C1A17', border: 'none', height: 2 },
								'& .MuiSlider-rail': { backgroundColor: '#E8E0D8', height: 2, opacity: 1 },
							}}
						/>
						<Stack direction="row" justifyContent="space-between">
							<Typography className="price-range-label">
								{selectedDiscount === 0 ? 'No filter' : `${selectedDiscount}% and above`}
							</Typography>
							<Typography className="price-range-label">100%</Typography>
						</Stack>
					</Stack>
				)}
			</Stack>

			{/* Price Range */}
			<Stack className="filter-section filter-section-last">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('price')}>
					<Typography className="filter-section-title price-title">Price range</Typography>
					<Chevron sectionKey="price" />
				</Stack>
				{expandedSections.price && (
					<Stack className="filter-price-range">
						<Slider
							value={[price.start, price.end]}
							onChange={handlePrice}
							min={0}
							max={5000}
							step={50}
							valueLabelDisplay="off"
							sx={{
								color: '#1C1A17',
								mt: '8px',
								mb: '4px',
								'& .MuiSlider-thumb': {
									width: 14,
									height: 14,
									backgroundColor: '#1C1A17',
									border: '2px solid #fff',
									boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
									'&:hover': { boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
									'&.Mui-active': { boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
									'&.Mui-focusVisible': { boxShadow: '0 1px 4px rgba(0,0,0,0.3)' },
									'&::before': { display: 'none' },
								},
								'& .MuiSlider-track': { backgroundColor: '#1C1A17', border: 'none', height: 2 },
								'& .MuiSlider-rail': { backgroundColor: '#E8E0D8', height: 2, opacity: 1 },
							}}
						/>
						<Stack direction="row" justifyContent="space-between">
							<Typography className="price-range-label">${price.start.toLocaleString()}</Typography>
							<Typography className="price-range-label">${price.end.toLocaleString()}</Typography>
						</Stack>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default FilterSidebar;
