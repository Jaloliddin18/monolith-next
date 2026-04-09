import React, { useRef, useState } from 'react';
import {
	Box,
	Typography,
	MenuItem,
	Select,
	FormControl,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CREATE_FURNITURE } from '../../../apollo/user/mutation';
import {
	FurnitureRoom,
	FurnitureCategory,
	FurnitureStyle,
	FurnitureMaterial,
	FurnitureColor,
	AssemblyType,
	AssemblyDifficulty,
	DeliveryMethod,
	SustainabilityLabel,
} from '../../enums/furniture.enum';
import { REACT_APP_API_URL } from '../../config';
import { getJwtToken } from '../../auth';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { T } from '../../types/common';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const REQUIRED_MARK = <span className="af-required-mark">*</span>;
const TOTAL_STEPS = 3;
const STEP_LABELS = ['Required Info', 'Details', 'Images & Extras'];

const AddFurniture = () => {
	const router = useRouter();
	const token = getJwtToken();
	const imageInputRef = useRef<HTMLInputElement>(null);

	const [step, setStep] = useState(1);
	const [dragOver, setDragOver] = useState(false);

	const [form, setForm] = useState({
		furnitureTitle: '',
		furnitureRoom: '' as FurnitureRoom,
		furnitureCategory: '' as FurnitureCategory,
		furnitureStyle: '' as FurnitureStyle,
		furniturePrice: '',
		furnitureWeight: '',
		furnitureMaterial: '' as FurnitureMaterial,
		furnitureColor: '' as FurnitureColor,
		assemblyType: '' as AssemblyType,
		assemblyDifficulty: '' as AssemblyDifficulty | '',
		assemblyTime: '',
		deliveryMethod: '' as DeliveryMethod,
		furnitureDesc: '',
		furnitureRent: false,
		furnitureOnSale: false,
		furnitureBestseller: false,
		furnitureDiscount: '',
		discountStart: '',
		discountEnd: '',
		launchedAt: '',
		sustainabilityLabel: '' as SustainabilityLabel | '',
		width: '',
		height: '',
		depth: '',
	});

	const [images, setImages] = useState<string[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const [uploading, setUploading] = useState(false);

	const [createFurniture] = useMutation(CREATE_FURNITURE);

	const set = (field: string, value: T) =>
		setForm((prev) => ({ ...prev, [field]: value }));

	const uploadImage = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.append(
			'operations',
			JSON.stringify({
				query: `mutation ImageUploader($file: Upload!, $target: String!) { imageUploader(file: $file, target: $target) }`,
				variables: { file: null, target: 'furniture' },
			}),
		);
		formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
		formData.append('0', file);

		const response = await fetch(`${process.env.REACT_APP_API_GRAPHQL_URL}`, {
			method: 'POST',
			headers: {
				'apollo-require-preflight': 'true',
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});
		const json = await response.json();
		return json.data.imageUploader as string;
	};

	const processFiles = async (files: File[]) => {
		if (!files.length) return;
		setUploading(true);
		try {
			const uploaded: string[] = [];
			const previews: string[] = [];
			for (const file of files) {
				const path = await uploadImage(file);
				uploaded.push(path);
				previews.push(`${REACT_APP_API_URL}/${path}`);
			}
			setImages((prev) => [...prev, ...uploaded]);
			setImagePreviews((prev) => [...prev, ...previews]);
		} catch {
			sweetMixinErrorAlert('Image upload failed');
		} finally {
			setUploading(false);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		processFiles(Array.from(e.target.files ?? []));
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		const files = Array.from(e.dataTransfer.files).filter((f) =>
			f.type.startsWith('image/'),
		);
		processFiles(files);
	};

	const removeImage = (idx: number) => {
		setImages((prev) => prev.filter((_, i) => i !== idx));
		setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
	};

	const handleNext = () => {
		if (step === 1) {
			if (
				!form.furnitureTitle ||
				!form.furnitureRoom ||
				!form.furnitureCategory ||
				!form.furnitureStyle ||
				!form.furniturePrice ||
				!form.furnitureWeight ||
				!form.furnitureMaterial ||
				!form.furnitureColor ||
				!form.assemblyType ||
				!form.deliveryMethod
			) {
				sweetMixinErrorAlert('Please fill all required fields');
				return;
			}
		}
		setStep((s) => s + 1);
	};

	const handleSubmit = async () => {
		if (images.length === 0) {
			sweetMixinErrorAlert('Please upload at least one image');
			return;
		}
		try {
			const input: T = {
				furnitureTitle: form.furnitureTitle,
				furnitureRoom: form.furnitureRoom,
				furnitureCategory: form.furnitureCategory,
				furnitureStyle: form.furnitureStyle,
				furniturePrice: parseFloat(form.furniturePrice),
				furnitureWeight: parseFloat(form.furnitureWeight),
				furnitureMaterial: form.furnitureMaterial,
				furnitureColor: form.furnitureColor,
				assemblyType: form.assemblyType,
				deliveryMethod: form.deliveryMethod,
				furnitureImages: images,
			};

			if (form.furnitureDesc) input.furnitureDesc = form.furnitureDesc;
			if (form.assemblyDifficulty) input.assemblyDifficulty = form.assemblyDifficulty;
			if (form.assemblyTime) input.assemblyTime = parseInt(form.assemblyTime);
			if (form.sustainabilityLabel) input.sustainabilityLabel = form.sustainabilityLabel;
			if (form.furnitureDiscount) input.furnitureDiscount = parseFloat(form.furnitureDiscount);
			if (form.discountStart) input.discountStart = new Date(form.discountStart);
			if (form.discountEnd) input.discountEnd = new Date(form.discountEnd);
			if (form.launchedAt) input.launchedAt = new Date(form.launchedAt);
			input.furnitureRent = form.furnitureRent;
			input.furnitureOnSale = form.furnitureOnSale;
			input.furnitureBestseller = form.furnitureBestseller;

			if (form.width || form.height || form.depth) {
				input.furnitureDimensions = {
					...(form.width && { width: parseFloat(form.width) }),
					...(form.height && { height: parseFloat(form.height) }),
					...(form.depth && { depth: parseFloat(form.depth) }),
				};
			}

			await createFurniture({ variables: { input } });
			await sweetTopSmallSuccessAlert('Furniture created successfully!', 700);
			router.push('/mypage/my-furnitures');
		} catch (err: any) {
			sweetMixinErrorAlert(err?.message ?? 'Something went wrong');
		}
	};

	return (
		<Box className="add-furniture-page">
			{/* Back navigation */}
			<button
				className="add-furniture-back-btn"
				onClick={() => router.push('/mypage/my-furnitures')}
			>
				<ArrowBackOutlinedIcon sx={{ fontSize: 17 }} />
				Back to My Furnitures
			</button>

			{/* Page header */}
			<Box className="add-furniture-page-header">
				<Typography className="add-furniture-page-title">Add New Furniture</Typography>
				<Typography className="add-furniture-page-subtitle">
					Fill in the details to list your furniture on the platform
				</Typography>
			</Box>

			{/* Step indicator */}
			<Box className="add-furniture-steps">
				{[1, 2, 3].map((s) => (
					<React.Fragment key={s}>
						<Box className={`af-step ${step >= s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
							<span className="af-step-num">{s}</span>
							<span className="af-step-label">{STEP_LABELS[s - 1]}</span>
						</Box>
						{s < TOTAL_STEPS && (
							<Box className={`af-step-line ${step > s ? 'done' : ''}`} />
						)}
					</React.Fragment>
				))}
			</Box>

			{/* Form card */}
			<Box className="add-furniture-card">
				{/* ── Step 1: Required Info ── */}
				{step === 1 && (
					<>
						<Typography className="add-furniture-section-title">
							Required Information
						</Typography>
						<div className="add-furniture-grid">
							<Box className="add-furniture-field">
								<label className="add-furniture-label">Title {REQUIRED_MARK}</label>
								<TextField
									fullWidth
									placeholder="e.g. Minimalist Oak Sofa"
									value={form.furnitureTitle}
									onChange={(e) => set('furnitureTitle', e.target.value)}
									className="add-furniture-input"
								/>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Price ($) {REQUIRED_MARK}</label>
								<TextField
									fullWidth
									type="number"
									placeholder="0.00"
									value={form.furniturePrice}
									onChange={(e) => set('furniturePrice', e.target.value)}
									className="add-furniture-input"
								/>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Room {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.furnitureRoom}
										onChange={(e) => set('furnitureRoom', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select room</MenuItem>
										{Object.values(FurnitureRoom).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Category {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.furnitureCategory}
										onChange={(e) => set('furnitureCategory', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select category</MenuItem>
										{Object.values(FurnitureCategory).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Style {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.furnitureStyle}
										onChange={(e) => set('furnitureStyle', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select style</MenuItem>
										{Object.values(FurnitureStyle).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Weight (kg) {REQUIRED_MARK}</label>
								<TextField
									fullWidth
									type="number"
									placeholder="0.0"
									value={form.furnitureWeight}
									onChange={(e) => set('furnitureWeight', e.target.value)}
									className="add-furniture-input"
								/>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Material {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.furnitureMaterial}
										onChange={(e) => set('furnitureMaterial', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select material</MenuItem>
										{Object.values(FurnitureMaterial).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Color {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.furnitureColor}
										onChange={(e) => set('furnitureColor', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select color</MenuItem>
										{Object.values(FurnitureColor).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Assembly Type {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.assemblyType}
										onChange={(e) => set('assemblyType', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select assembly type</MenuItem>
										{Object.values(AssemblyType).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>

							<Box className="add-furniture-field">
								<label className="add-furniture-label">Delivery Method {REQUIRED_MARK}</label>
								<FormControl fullWidth>
									<Select
										value={form.deliveryMethod}
										onChange={(e) => set('deliveryMethod', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="" disabled>Select delivery method</MenuItem>
										{Object.values(DeliveryMethod).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</div>
					</>
				)}

				{/* ── Step 2: Details (Optional) ── */}
				{step === 2 && (
					<>
						<Box className="add-furniture-section">
							<Typography className="add-furniture-section-title">
								Description{' '}
								<span className="add-furniture-optional">(optional)</span>
							</Typography>
							<TextField
								fullWidth
								multiline
								rows={5}
								placeholder="Describe your furniture in detail (5–500 characters)"
								value={form.furnitureDesc}
								onChange={(e) => set('furnitureDesc', e.target.value)}
								className="add-furniture-input"
							/>
						</Box>

						<Box className="add-furniture-section">
							<Typography className="add-furniture-section-title">
								Assembly Details{' '}
								<span className="add-furniture-optional">(optional)</span>
							</Typography>
							<div className="add-furniture-grid">
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Assembly Difficulty</label>
									<FormControl fullWidth>
										<Select
											value={form.assemblyDifficulty}
											onChange={(e) => set('assemblyDifficulty', e.target.value)}
											className="add-furniture-select"
											displayEmpty
										>
											<MenuItem value="">None</MenuItem>
											{Object.values(AssemblyDifficulty).map((v) => (
												<MenuItem key={v} value={v}>{v}</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Assembly Time (min)</label>
									<TextField
										fullWidth
										type="number"
										placeholder="e.g. 30"
										value={form.assemblyTime}
										onChange={(e) => set('assemblyTime', e.target.value)}
										className="add-furniture-input"
									/>
								</Box>
							</div>
						</Box>

						<Box className="add-furniture-section">
							<Typography className="add-furniture-section-title">
								Dimensions (cm){' '}
								<span className="add-furniture-optional">(optional)</span>
							</Typography>
							<div className="add-furniture-grid three-col">
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Width</label>
									<TextField
										fullWidth
										type="number"
										placeholder="cm"
										value={form.width}
										onChange={(e) => set('width', e.target.value)}
										className="add-furniture-input"
									/>
								</Box>
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Height</label>
									<TextField
										fullWidth
										type="number"
										placeholder="cm"
										value={form.height}
										onChange={(e) => set('height', e.target.value)}
										className="add-furniture-input"
									/>
								</Box>
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Depth</label>
									<TextField
										fullWidth
										type="number"
										placeholder="cm"
										value={form.depth}
										onChange={(e) => set('depth', e.target.value)}
										className="add-furniture-input"
									/>
								</Box>
							</div>
						</Box>
					</>
				)}

				{/* ── Step 3: Images & Extras ── */}
				{step === 3 && (
					<>
						{/* Drag & drop image upload */}
						<Box className="add-furniture-section">
							<Typography className="add-furniture-section-title">
								Upload Photos {REQUIRED_MARK}
							</Typography>
							<Box
								className={`add-furniture-dropzone ${dragOver ? 'drag-over' : ''}`}
								onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
								onDragLeave={() => setDragOver(false)}
								onDrop={handleDrop}
								onClick={() => imageInputRef.current?.click()}
							>
								<CloudUploadOutlinedIcon className="af-dropzone-icon" />
								<Typography className="af-dropzone-text">
									{uploading ? 'Uploading...' : 'Drag and drop images here'}
								</Typography>
								<Typography className="af-dropzone-hint">
									Photos must be JPEG or PNG format
								</Typography>
								<button
									className="af-browse-btn"
									onClick={(e) => { e.stopPropagation(); imageInputRef.current?.click(); }}
								>
									Browse Files ↗
								</button>
							</Box>
							<input
								ref={imageInputRef}
								type="file"
								accept="image/*"
								multiple
								hidden
								onChange={handleImageChange}
							/>

							{/* Image previews */}
							{imagePreviews.length > 0 && (
								<Box className="af-preview-row">
									{imagePreviews.map((src, i) => (
										<Box key={i} className="af-preview-item">
											<img src={src} alt={`preview-${i}`} />
											<button
												className="af-preview-remove"
												onClick={() => removeImage(i)}
											>
												<DeleteOutlineIcon sx={{ fontSize: 16 }} />
											</button>
										</Box>
									))}
								</Box>
							)}
						</Box>

						{/* Pricing & Sale */}
						<Box className="add-furniture-section">
							<Typography className="add-furniture-section-title">
								Pricing & Sale{' '}
								<span className="add-furniture-optional">(optional)</span>
							</Typography>
							<div className="add-furniture-grid">
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Discount (%)</label>
									<TextField
										fullWidth
										type="number"
										placeholder="e.g. 10"
										value={form.furnitureDiscount}
										onChange={(e) => set('furnitureDiscount', e.target.value)}
										className="add-furniture-input"
									/>
								</Box>
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Discount Start</label>
									<TextField
										fullWidth
										type="date"
										value={form.discountStart}
										onChange={(e) => set('discountStart', e.target.value)}
										className="add-furniture-input"
										InputLabelProps={{ shrink: true }}
									/>
								</Box>
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Discount End</label>
									<TextField
										fullWidth
										type="date"
										value={form.discountEnd}
										onChange={(e) => set('discountEnd', e.target.value)}
										className="add-furniture-input"
										InputLabelProps={{ shrink: true }}
									/>
								</Box>
								<Box className="add-furniture-field">
									<label className="add-furniture-label">Launch Date</label>
									<TextField
										fullWidth
										type="date"
										value={form.launchedAt}
										onChange={(e) => set('launchedAt', e.target.value)}
										className="add-furniture-input"
										InputLabelProps={{ shrink: true }}
									/>
								</Box>
							</div>
							<div className="add-furniture-checkboxes">
								<FormControlLabel
									control={
										<Checkbox
											checked={form.furnitureRent}
											onChange={(e) => set('furnitureRent', e.target.checked)}
										/>
									}
									label="Available for Rent"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={form.furnitureOnSale}
											onChange={(e) => set('furnitureOnSale', e.target.checked)}
										/>
									}
									label="On Sale"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={form.furnitureBestseller}
											onChange={(e) => set('furnitureBestseller', e.target.checked)}
										/>
									}
									label="Bestseller"
								/>
							</div>
						</Box>

						{/* Sustainability */}
						<Box className="add-furniture-section">
							<Typography className="add-furniture-section-title">
								Sustainability{' '}
								<span className="add-furniture-optional">(optional)</span>
							</Typography>
							<Box className="add-furniture-field" style={{ maxWidth: 320 }}>
								<label className="add-furniture-label">Sustainability Label</label>
								<FormControl fullWidth>
									<Select
										value={form.sustainabilityLabel}
										onChange={(e) => set('sustainabilityLabel', e.target.value)}
										className="add-furniture-select"
										displayEmpty
									>
										<MenuItem value="">None</MenuItem>
										{Object.values(SustainabilityLabel).map((v) => (
											<MenuItem key={v} value={v}>{v.replace(/_/g, ' ')}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</Box>
					</>
				)}

				{/* Bottom step navigation */}
				<Box className="add-furniture-step-nav">
					{step > 1 ? (
						<button
							className="af-nav-prev-btn"
							onClick={() => setStep((s) => s - 1)}
						>
							← Previous
						</button>
					) : (
						<button
							className="af-nav-prev-btn"
							onClick={() => router.push('/mypage/my-furnitures')}
						>
							← Cancel
						</button>
					)}

					{step < TOTAL_STEPS ? (
						<button className="af-nav-next-btn" onClick={handleNext}>
							Next Step <ArrowForwardIcon sx={{ fontSize: 16 }} />
						</button>
					) : (
						<button className="af-nav-next-btn" onClick={handleSubmit}>
							Submit Furniture <ArrowForwardIcon sx={{ fontSize: 16 }} />
						</button>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default AddFurniture;
