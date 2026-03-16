import React, { useState } from 'react';
import { Box, Stack, Typography, Checkbox, Slider, InputBase, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { FurnitureRoom, FurnitureMaterial, FurnitureColor } from '../../enums/furniture.enum';
import { FIsearch } from '../../types/furniture/furniture.input';

interface FilterSidebarProps {
	searchFilter: FIsearch;
	onFilterChange: (search: FIsearch) => void;
}

const roomLabels: Record<FurnitureRoom, string> = {
	[FurnitureRoom.LIVING_ROOM]: 'Living Room',
	[FurnitureRoom.DINING]: 'Dining',
	[FurnitureRoom.BEDROOM]: 'Bedroom',
	[FurnitureRoom.HOME_OFFICE]: 'Office',
	[FurnitureRoom.OUTDOOR]: 'Outdoor',
	[FurnitureRoom.CHILDRENS_ROOM]: 'Kids',
	[FurnitureRoom.BATHROOM]: 'Bathroom',
	[FurnitureRoom.HALLWAY]: 'Entryway',
	[FurnitureRoom.GARAGE]: 'Garage',
	[FurnitureRoom.LAUNDRY]: 'Laundry',
	[FurnitureRoom.KITCHEN]: 'Kitchen',
	[FurnitureRoom.GAMING_ROOM]: 'Gaming Room',
};

const materialLabels: Record<FurnitureMaterial, string> = {
	[FurnitureMaterial.SOLID_WOOD]: 'Mahogany',
	[FurnitureMaterial.METAL]: 'Metal',
	[FurnitureMaterial.FABRIC]: 'Fabric',
	[FurnitureMaterial.LEATHER]: 'Leather',
	[FurnitureMaterial.PLASTIC]: 'Plastic',
	[FurnitureMaterial.GLASS]: 'Glass',
	[FurnitureMaterial.BAMBOO]: 'Bamboo',
	[FurnitureMaterial.RATTAN]: 'Rattan',
	[FurnitureMaterial.PARTICLE_BOARD]: 'Maple',
	[FurnitureMaterial.MDF]: 'Cherry',
	[FurnitureMaterial.RECYCLED]: 'Recycled',
};

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
	[FurnitureColor.MULTICOLOR]: 'linear-gradient(135deg, #FF0000, #00FF00, #0000FF)',
};

const VISIBLE_ITEMS = 3;
const VISIBLE_COLORS = 12;

const discountOptions = [
	{ label: '10% and above', value: 10 },
	{ label: '20% and above', value: 20 },
	{ label: '30% and above', value: 30 },
	{ label: '40% and above', value: 40 },
];

const compactCheckboxSx = {
	color: '#999',
	'&.Mui-checked': { color: '#A86464' },
	padding: '2px',
};

const FilterSidebar = ({ searchFilter, onFilterChange }: FilterSidebarProps) => {
	const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
		categories: true,
		material: true,
		rating: true,
		colors: true,
		discount: true,
		availability: true,
		price: true,
	});

	const [showMore, setShowMore] = useState<Record<string, boolean>>({});
	const [categorySearch, setCategorySearch] = useState('');
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
	const filtered = categorySearch
		? allRooms.filter((r) => roomLabels[r].toLowerCase().includes(categorySearch.toLowerCase()))
		: allRooms;
	const visibleRooms = showMore.categories ? filtered : filtered.slice(0, VISIBLE_ITEMS);
	const allMats = Object.values(FurnitureMaterial);
	const visibleMats = showMore.material ? allMats : allMats.slice(0, VISIBLE_ITEMS);
	const allColors = Object.values(FurnitureColor);
	const visibleColors = showMore.colors ? allColors : allColors.slice(0, VISIBLE_COLORS);

	const chevron = (key: string) => (
		<KeyboardArrowDownIcon
			sx={{ fontSize: 20, transform: expandedSections[key] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
		/>
	);

	const showMoreLink = (key: string, hasMore: boolean) =>
		hasMore ? (
			<Stack className="show-more-link" direction="row" alignItems="center" gap="4px" onClick={() => toggleMore(key)}>
				<Typography className="show-more-text">{showMore[key] ? 'Show less' : 'Show more'}</Typography>
			</Stack>
		) : null;

	return (
		<Stack className="filter-sidebar">
			{/* Header */}
			<Stack className="filter-header" direction="row" justifyContent="space-between" alignItems="center">
				<Typography className="filter-title">Filters</Typography>
				<Stack className="clear-all-btn" direction="row" alignItems="center" gap="6px" onClick={clearAll}>
					<Typography className="clear-all-text">CLEAR ALL</Typography>
					<CloseIcon sx={{ fontSize: 14 }} />
				</Stack>
			</Stack>

			{/* Search */}
			<Stack className="filter-search">
				<Stack className="filter-search-input" direction="row" alignItems="center" gap="6px">
					<SearchIcon sx={{ fontSize: 18, color: '#999' }} />
					<InputBase
						placeholder="Search for categories"
						value={categorySearch}
						onChange={(e) => setCategorySearch(e.target.value)}
						sx={{ flex: 1, fontFamily: "'Jost', sans-serif", fontSize: '13px' }}
					/>
				</Stack>
			</Stack>

			{/* Categories */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('categories')}>
					<Typography className="filter-section-title">Categories</Typography>
					{chevron('categories')}
				</Stack>
				{expandedSections.categories && (
					<Stack className="filter-section-body">
						<Stack className="filter-checkbox-row" direction="row" alignItems="center" onClick={toggleAllRooms}>
							<Checkbox checked={searchFilter.roomList?.length === allRooms.length || false} size="small" sx={compactCheckboxSx} />
							<Typography className="filter-checkbox-label">All</Typography>
							<Typography className="filter-checkbox-count">(50505)</Typography>
						</Stack>
						{visibleRooms.map((room) => (
							<Stack key={room} className="filter-checkbox-row" direction="row" alignItems="center" onClick={() => toggleRoom(room)}>
								<Checkbox checked={searchFilter.roomList?.includes(room) || false} size="small" sx={compactCheckboxSx} />
								<Typography className="filter-checkbox-label">{roomLabels[room]}</Typography>
							</Stack>
						))}
						{showMoreLink('categories', filtered.length > VISIBLE_ITEMS)}
					</Stack>
				)}
			</Stack>

			{/* Material */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('material')}>
					<Typography className="filter-section-title">Material</Typography>
					{chevron('material')}
				</Stack>
				{expandedSections.material && (
					<Stack className="filter-section-body">
						<Stack className="filter-checkbox-row" direction="row" alignItems="center" onClick={toggleAllMaterials}>
							<Checkbox checked={searchFilter.materialList?.length === allMats.length || false} size="small" sx={compactCheckboxSx} />
							<Typography className="filter-checkbox-label">All</Typography>
							<Typography className="filter-checkbox-count">(50505)</Typography>
						</Stack>
						{visibleMats.map((mat) => (
							<Stack key={mat} className="filter-checkbox-row" direction="row" alignItems="center" onClick={() => toggleMaterial(mat)}>
								<Checkbox checked={searchFilter.materialList?.includes(mat) || false} size="small" sx={compactCheckboxSx} />
								<Typography className="filter-checkbox-label">{materialLabels[mat]}</Typography>
							</Stack>
						))}
						{showMoreLink('material', allMats.length > VISIBLE_ITEMS)}
					</Stack>
				)}
			</Stack>

			{/* Customer Rating */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('rating')}>
					<Typography className="filter-section-title">Customer rating</Typography>
					{chevron('rating')}
				</Stack>
				{expandedSections.rating && (
					<Stack className="filter-section-body">
						<Stack direction="row" alignItems="center" gap="2px" sx={{ padding: '2px 0' }}>
							{Array.from({ length: 5 }, (_, i) => (
								<StarBorderIcon key={i} sx={{ fontSize: 20, color: '#999' }} />
							))}
						</Stack>
					</Stack>
				)}
			</Stack>

			{/* Colors */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('colors')}>
					<Typography className="filter-section-title">Colors</Typography>
					{chevron('colors')}
				</Stack>
				{expandedSections.colors && (
					<>
						<Stack className="filter-colors-grid" direction="row" flexWrap="wrap" gap="8px">
							{visibleColors.map((color) => (
								<Box
									key={color}
									className={`filter-color-swatch ${searchFilter.colorList?.includes(color) ? 'selected' : ''}`}
									sx={{
										background: colorMap[color],
										border: searchFilter.colorList?.includes(color) ? '2px solid #A86464' : '1px solid #E6E6E6',
									}}
									onClick={() => toggleColor(color)}
								/>
							))}
						</Stack>
						{showMoreLink('colors', allColors.length > VISIBLE_COLORS)}
					</>
				)}
			</Stack>

			{/* Discount Offer */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('discount')}>
					<Typography className="filter-section-title">Discount offer</Typography>
					{chevron('discount')}
				</Stack>
				{expandedSections.discount && (
					<Stack className="filter-section-body">
						{discountOptions.map((opt) => (
							<Stack key={opt.value} className="filter-checkbox-row" direction="row" alignItems="center" onClick={() => setSelectedDiscount(opt.value)}>
								<Radio checked={selectedDiscount === opt.value} size="small" sx={{ ...compactCheckboxSx, '&.Mui-checked': { color: '#A86464' } }} />
								<Typography className="filter-checkbox-label">{opt.label}</Typography>
							</Stack>
						))}
						{showMoreLink('discount', true)}
					</Stack>
				)}
			</Stack>

			{/* Availability */}
			<Stack className="filter-section">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('availability')}>
					<Typography className="filter-section-title">Availability</Typography>
					{chevron('availability')}
				</Stack>
				{expandedSections.availability && (
					<Stack className="filter-section-body">
						<Stack className="filter-checkbox-row" direction="row" alignItems="center">
							<Checkbox size="small" sx={compactCheckboxSx} />
							<Typography className="filter-checkbox-label">Include Out of Stock</Typography>
						</Stack>
						{showMoreLink('availability', true)}
					</Stack>
				)}
			</Stack>

			{/* Price Range */}
			<Stack className="filter-section filter-section-last">
				<Stack className="filter-section-header" direction="row" justifyContent="space-between" alignItems="center" onClick={() => toggle('price')}>
					<Typography className="filter-section-title">Price range</Typography>
					{chevron('price')}
				</Stack>
				{expandedSections.price && (
					<Stack className="filter-price-range" gap="8px">
						<Stack direction="row" justifyContent="space-between">
							<Typography className="filter-price-label">${price.start}</Typography>
							<Typography className="filter-price-label">${price.end}</Typography>
						</Stack>
						<Slider
							value={[price.start, price.end]}
							onChange={handlePrice}
							min={0}
							max={5000}
							step={5}
							sx={{
								color: '#000',
								padding: '8px 0',
								'& .MuiSlider-thumb': { backgroundColor: '#fff', border: '2px solid #000', width: 14, height: 14 },
								'& .MuiSlider-track': { backgroundColor: '#000' },
								'& .MuiSlider-rail': { backgroundColor: '#E6E6E6' },
							}}
						/>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default FilterSidebar;
