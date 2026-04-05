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
	[FurnitureColor.BLACK]: '#000000',
	[FurnitureColor.GREY]: '#808080',
	[FurnitureColor.BROWN]: '#8B4513',
	[FurnitureColor.BEIGE]: '#F5F5DC',
	[FurnitureColor.RED]: '#FF0000',
	[FurnitureColor.BLUE]: '#0000FF',
	[FurnitureColor.GREEN]: '#008000',
	[FurnitureColor.YELLOW]: '#FFD700',
	[FurnitureColor.ORANGE]: '#FFA500',
	[FurnitureColor.PINK]: '#FFC0CB',
	[FurnitureColor.PURPLE]: '#800080',
	[FurnitureColor.NATURAL_WOOD]: '#DEB887',
	[FurnitureColor.MULTICOLOR]: '#CDAE79',
};

const VISIBLE_ITEMS = 3;
const VISIBLE_COLORS = 12;

const discountOptions = [
	{ label: '10% and above', value: 10 },
	{ label: '20% and above', value: 20 },
	{ label: '30% and above', value: 30 },
	{ label: '40% and above', value: 40 },
];

const FilterSidebar = ({ searchFilter, onFilterChange }: FilterSidebarProps) => {
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
		room: true,
		style: true,
		material: true,
		rating: true,
		colors: true,
		discount: true,
		availability: true,
		price: true,
	});
	const [showMore, setShowMore] = useState<Record<string, boolean>>({});
	const [selectedDiscount, setSelectedDiscount] = useState<number>(10);

	const toggle = (s: string) => setExpandedSections((p) => ({ ...p, [s]: !p[s] }));
	const toggleMore = (s: string) => setShowMore((p) => ({ ...p, [s]: !p[s] }));

	const clearAll = () => {
		onFilterChange({});
		setSelectedDiscount(10);
	};

	const toggleRoom = (room: FurnitureRoom) => {
		const cur = searchFilter.roomList || [];
		const next = cur.includes(room) ? cur.filter((r) => r !== room) : [...cur, room];
		onFilterChange({ ...searchFilter, roomList: next.length ? next : undefined });
	};

	const toggleAllRooms = () => {
		const all = Object.values(FurnitureRoom);
		onFilterChange({ ...searchFilter, roomList: searchFilter.roomList?.length === all.length ? undefined : all });
	};

	const toggleStyle = (style: FurnitureStyle) => {
		const cur = searchFilter.styleList || [];
		const next = cur.includes(style) ? cur.filter((s) => s !== style) : [...cur, style];
		onFilterChange({ ...searchFilter, styleList: next.length ? next : undefined });
	};

	const toggleAllStyles = () => {
		const all = Object.values(FurnitureStyle);
		onFilterChange({ ...searchFilter, styleList: searchFilter.styleList?.length === all.length ? undefined : all });
	};

	const toggleMaterial = (mat: FurnitureMaterial) => {
		const cur = searchFilter.materialList || [];
		const next = cur.includes(mat) ? cur.filter((m) => m !== mat) : [...cur, mat];
		onFilterChange({ ...searchFilter, materialList: next.length ? next : undefined });
	};

	const toggleAllMaterials = () => {
		const all = Object.values(FurnitureMaterial);
		onFilterChange({ ...searchFilter, materialList: searchFilter.materialList?.length === all.length ? undefined : all });
	};

	const toggleColor = (color: FurnitureColor) => {
		const cur = searchFilter.colorList || [];
		const next = cur.includes(color) ? cur.filter((c) => c !== color) : [...cur, color];
		onFilterChange({ ...searchFilter, colorList: next.length ? next : undefined });
	};

	const handlePrice = (_: Event, v: number | number[]) => {
		const [start, end] = v as number[];
		onFilterChange({ ...searchFilter, pricesRange: { start, end } });
	};

	const price = searchFilter.pricesRange || { start: 25, end: 255 };
	const allRooms = Object.values(FurnitureRoom);
	const visibleRooms = showMore.room ? allRooms : allRooms.slice(0, VISIBLE_ITEMS);
	const allStyles = Object.values(FurnitureStyle);
	const visibleStyles = showMore.style ? allStyles : allStyles.slice(0, VISIBLE_ITEMS);
	const allMats = Object.values(FurnitureMaterial);
	const visibleMats = showMore.material ? allMats : allMats.slice(0, VISIBLE_ITEMS);
	const allColors = Object.values(FurnitureColor);
	const visibleColors = showMore.colors ? allColors : allColors.slice(0, VISIBLE_COLORS);

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

	const ShowMoreLink = ({ sectionKey, hasMore }: { sectionKey: string; hasMore: boolean }) =>
		hasMore ? (
			<Stack className="show-more-link" direction="row" alignItems="center" gap="10px" onClick={() => toggleMore(sectionKey)}>
				<Box
					component="img"
					src="/icons/ArrowRight.svg"
					alt="↓"
					width={20}
					height={20}
					sx={{ transform: 'rotate(90deg)' }}
				/>
				<Typography className="show-more-text">
					{showMore[sectionKey] ? 'Show less' : 'Show more'}
				</Typography>
			</Stack>
		) : null;

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
						<Stack className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={toggleAllRooms} sx={{ cursor: 'pointer' }}>
							<CustomCheckbox checked={searchFilter.roomList?.length === allRooms.length || false} />
							<Typography className="filter-checkbox-label">All</Typography>
						</Stack>
						{visibleRooms.map((room) => (
							<Stack key={room} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => toggleRoom(room)} sx={{ cursor: 'pointer' }}>
								<CustomCheckbox checked={searchFilter.roomList?.includes(room) || false} />
								<Typography className="filter-checkbox-label">{room.replace(/_/g, ' ')}</Typography>
							</Stack>
						))}
						<ShowMoreLink sectionKey="room" hasMore={allRooms.length > VISIBLE_ITEMS} />
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
						<Stack className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={toggleAllStyles} sx={{ cursor: 'pointer' }}>
							<CustomCheckbox checked={searchFilter.styleList?.length === allStyles.length || false} />
							<Typography className="filter-checkbox-label">All</Typography>
						</Stack>
						{visibleStyles.map((style) => (
							<Stack key={style} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => toggleStyle(style)} sx={{ cursor: 'pointer' }}>
								<CustomCheckbox checked={searchFilter.styleList?.includes(style) || false} />
								<Typography className="filter-checkbox-label">{style.replace(/_/g, ' ')}</Typography>
							</Stack>
						))}
						<ShowMoreLink sectionKey="style" hasMore={allStyles.length > VISIBLE_ITEMS} />
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
						<Stack className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={toggleAllMaterials} sx={{ cursor: 'pointer' }}>
							<CustomCheckbox checked={searchFilter.materialList?.length === allMats.length || false} />
							<Stack direction="row" alignItems="center" gap="8px">
								<Typography className="filter-checkbox-label">All</Typography>
								<Typography className="filter-checkbox-count">(50505)</Typography>
							</Stack>
						</Stack>
						{visibleMats.map((mat) => (
							<Stack key={mat} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => toggleMaterial(mat)} sx={{ cursor: 'pointer' }}>
								<CustomCheckbox checked={searchFilter.materialList?.includes(mat) || false} />
								<Typography className="filter-checkbox-label">{mat.replace(/_/g, ' ')}</Typography>
							</Stack>
						))}
						<ShowMoreLink sectionKey="material" hasMore={allMats.length > VISIBLE_ITEMS} />
					</Stack>
				)}
			</Stack>

			{/* Customer Rating */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('rating')}>
					<Typography className="filter-section-title">Customer rating</Typography>
					<Chevron sectionKey="rating" />
				</Stack>
				{expandedSections.rating && (
					<Stack className="filter-section-body">
						<Stack direction="row" alignItems="center" gap="14px" sx={{ padding: '4px 0' }}>
							{Array.from({ length: 5 }, (_, i) => (
								<Box
									key={i}
									component="img"
									src="/icons/star_icon.svg"
									alt="star"
									width={18}
									height={18}
									sx={{ opacity: 0.3, cursor: 'pointer', '&:hover': { opacity: 1 } }}
								/>
							))}
						</Stack>
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
						<Stack direction="row" flexWrap="wrap" gap="14px" sx={{ py: '8px' }}>
							{visibleColors.map((color) => (
								<Box
									key={color}
									className={`filter-color-swatch${searchFilter.colorList?.includes(color) ? ' selected' : ''}`}
									sx={{
										background: colorMap[color],
										border: searchFilter.colorList?.includes(color)
											? '2px solid #A86464'
											: color === FurnitureColor.WHITE ? '1px solid #e6e6e6' : 'none',
									}}
									onClick={() => toggleColor(color)}
								/>
							))}
						</Stack>
						<ShowMoreLink sectionKey="colors" hasMore={allColors.length > VISIBLE_COLORS} />
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
					<Stack className="filter-section-body">
						{discountOptions.map((opt) => (
							<Stack key={opt.value} className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" onClick={() => setSelectedDiscount(opt.value)} sx={{ cursor: 'pointer' }}>
								<Box
									className={`filter-radio-btn${selectedDiscount === opt.value ? ' selected' : ''}`}
								/>
								<Typography className="filter-checkbox-label">{opt.label}</Typography>
							</Stack>
						))}
						<ShowMoreLink sectionKey="discount" hasMore={true} />
					</Stack>
				)}
			</Stack>

			{/* Availability */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('availability')}>
					<Typography className="filter-section-title">Availability</Typography>
					<Chevron sectionKey="availability" />
				</Stack>
				{expandedSections.availability && (
					<Stack className="filter-section-body">
						<Stack className="filter-checkbox-row" direction="row" alignItems="center" gap="14px" sx={{ py: '12px', cursor: 'pointer' }}>
							<CustomCheckbox checked={false} />
							<Typography className="filter-checkbox-label">Include Out of Stock</Typography>
						</Stack>
						<ShowMoreLink sectionKey="availability" hasMore={true} />
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
							step={5}
							valueLabelDisplay="on"
							valueLabelFormat={(v) => `$${v}`}
							sx={{
								color: '#000',
								mt: '44px',
								mb: '8px',
								'& .MuiSlider-thumb': {
									backgroundColor: '#000',
									width: 10,
									height: 10,
									boxShadow: 'none',
									'&:hover': { boxShadow: 'none' },
									'&.Mui-active': { boxShadow: 'none' },
									'&.Mui-focusVisible': { boxShadow: 'none' },
									'&::before': { display: 'none' },
								},
								'& .MuiSlider-track': { backgroundColor: '#000', border: 'none', height: 2 },
								'& .MuiSlider-rail': { backgroundColor: '#ccc', height: 2, opacity: 1 },
								'& .MuiSlider-valueLabel': {
									backgroundColor: '#fff',
									color: '#000',
									fontSize: '12px',
									fontFamily: "'Jost', sans-serif",
									fontWeight: 500,
									lineHeight: '18px',
									border: '1px solid #e6e6e6',
									borderRadius: '3px',
									padding: '3px 8px',
									boxShadow: 'none',
									top: 2,
									'&::before': {
										width: 8,
										height: 8,
										backgroundColor: '#fff',
										borderRight: '1px solid #e6e6e6',
										borderBottom: '1px solid #e6e6e6',
									},
								},
							}}
						/>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default FilterSidebar;
