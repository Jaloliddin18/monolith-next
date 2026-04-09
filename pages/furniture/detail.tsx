import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
import { Box, Stack, Typography, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShieldIcon from '@mui/icons-material/VerifiedUser';
import ReplayIcon from '@mui/icons-material/Replay';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import InstagramSection from '../../libs/components/common/InstagramSection';
import { addToCart } from '../../libs/utils/cartStorage';
import ProductReviews from '../../libs/components/furniture/ProductReviews';
import { GET_FURNITURE, GET_FURNITURES } from '../../apollo/user/query';
import { LIKE_TARGET_FURNITURE } from '../../apollo/user/mutation';
import { Furniture } from '../../libs/types/furniture/furniture';
import { FurnituresInquiry } from '../../libs/types/furniture/furniture.input';
import { userVar } from '../../apollo/store';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { REACT_APP_API_URL } from '../../libs/config';
import { Direction } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';

const colorSwatches = ['#9BABB8', '#BCB7AC', '#CBB279', '#867070', '#9E7676', '#E6BA95', '#C1A3A3'];

const offers = [
	'SBI Cards Offer: Enjoy a 10% discount on your purchase with SBI Cards, up to $100.',
	'ICICI Bank Offer: Avail a special cash-back of 15% on using your ICICI Bank card.',
	'Enjoy a flat discount of 20% on the Nova Sofa with Chaise when you make the payment with your SBI Bank credit or debit card.',
	'Axis Bank Offer: 12% instant discount when you use your Axis Bank card',
];


const faqItems = [
	{ question: 'How can I place an order on MONOLITH?', answer: 'Placing an order on MONOLITH is easy. Simply browse our website, select the desired products, and add them to your shopping cart. Proceed to the checkout page, provide the necessary information, and complete the payment process. Once your order is confirmed, we will process it and provide you with updates on shipping and delivery.' },
	{ question: 'How long will it take to receive my order?', answer: '' },
	{ question: 'What is your return policy?', answer: '' },
	{ question: 'How can I place an order on MONOLITH?', answer: '' },
];

const FurnitureDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const user = useReactiveVar(userVar);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(1);
	const [openFaq, setOpenFaq] = useState(0);
	const [countdown, setCountdown] = useState({ days: 10, hours: 18, mins: 23, secs: 0 });
	const [similarFurnitures, setSimilarFurnitures] = useState<Furniture[]>([]);

	const { data: furnitureData, refetch: refetchFurniture } = useQuery(GET_FURNITURE, {
		variables: { input: id as string },
		skip: !id,
		fetchPolicy: 'cache-and-network',
	});

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const furniture: Furniture | undefined = furnitureData?.getFurniture;

	const similarInquiry: FurnituresInquiry = {
		page: 1,
		limit: 5,
		sort: 'furnitureRank',
		direction: Direction.DESC,
		search: furniture?.furnitureCategory ? { categoryList: [furniture.furnitureCategory] } : {},
	};

	useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: similarInquiry },
		skip: !furniture?.furnitureCategory,
		onCompleted: (data: T) => {
			const list: Furniture[] = data?.getFurnitures?.list ?? [];
			setSimilarFurnitures(list.filter((f) => f._id !== furniture?._id).slice(0, 4));
		},
	});

	const hasDiscount = furniture?.furnitureLastChancePrice && furniture.furnitureLastChancePrice < furniture.furniturePrice;
	const currentPrice = hasDiscount ? furniture.furnitureLastChancePrice! : furniture?.furniturePrice ?? 0;
	const discountPercent = hasDiscount
		? Math.round(((furniture.furniturePrice - furniture.furnitureLastChancePrice!) / furniture.furniturePrice) * 100)
		: 0;
	const isLiked = furniture?.likedByMe?.[0]?.myFavorite ?? false;

	const imagePath = useCallback(
		(idx: number) => {
			const images = furniture?.furnitureImages;
			if (images && images[idx]) return `${REACT_APP_API_URL}/${images[idx]}`;
			return '/img/furniture/luxury_chair.jpg';
		},
		[furniture],
	);

	useEffect(() => {
		const handler = () => refetchFurniture();
		window.addEventListener('wishlistUpdated', handler);
		return () => window.removeEventListener('wishlistUpdated', handler);
	}, [refetchFurniture]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				let { days, hours, mins, secs } = prev;
				if (secs > 0) secs--;
				else if (mins > 0) { mins--; secs = 59; }
				else if (hours > 0) { hours--; mins = 59; secs = 59; }
				else if (days > 0) { days--; hours = 23; mins = 59; secs = 59; }
				return { days, hours, mins, secs };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleLike = async () => {
		if (!user?._id) return router.push('/account/join');
		try {
			await likeTargetFurniture({ variables: { input: furniture?._id }, fetchPolicy: 'network-only' });
			await refetchFurniture();
			window.dispatchEvent(new Event('wishlistUpdated'));
			sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message);
		}
	};

	const handleAddToCart = () => {
		if (!furniture) return;
		addToCart(furniture, quantity);
		sweetTopSmallSuccessAlert('Added to cart', 800);
	};

	return (
		<Stack className="furniture-detail-page">
			{/* Main Product Section */}
			<Stack className="detail-main" direction="row">
				{/* Left: Images */}
				<Stack className="detail-images">
					<Box className="detail-main-image">
						<img src={imagePath(selectedImage)} alt={furniture?.furnitureTitle} />
						<Box className="expand-btn">
							<img src="/icons/ArrowsOutSimple.svg" alt="Expand" width={24} height={24} />
						</Box>
						<Stack className="image-dots" direction="row">
							{Array.from({ length: Math.max(furniture?.furnitureImages?.length ?? 1, 1) }, (_, idx) => (
								<Box
									key={idx}
									className={`dot ${idx === selectedImage ? 'active' : ''}`}
									onClick={() => setSelectedImage(idx)}
								/>
							))}
						</Stack>
					</Box>
					<Stack className="detail-thumbnails" direction="row">
						<Box className="thumb-nav-btn left">
							<ArrowBackIcon sx={{ fontSize: 16 }} />
						</Box>
						{Array.from({ length: Math.max(furniture?.furnitureImages?.length ?? 1, 1) }, (_, idx) => (
							<Box
								key={idx}
								className={`thumbnail ${idx === selectedImage ? 'active' : ''}`}
								onClick={() => setSelectedImage(idx)}
							>
								<img src={imagePath(idx)} alt={`Thumbnail ${idx + 1}`} />
							</Box>
						))}
					</Stack>
				</Stack>

				{/* Right: Product Info */}
				<Stack className="detail-info">
					<Stack className="detail-info-main">
						{/* Rating + Actions */}
						<Stack className="detail-top-row" direction="row" justifyContent="space-between" alignItems="center">
							<Stack direction="row" alignItems="center" gap="12px">
								<Box className="rating-badge">
									<span>{furniture?.furnitureRank ? (furniture.furnitureRank / 2).toFixed(1) : '4.5'}</span>
									<StarIcon sx={{ fontSize: 16, color: '#fff' }} />
								</Box>
								<Typography className="review-count">({furniture?.furnitureComments ?? 20} review)</Typography>
							</Stack>
							<Stack direction="row" gap="14px" alignItems="center">
								<IconButton onClick={handleLike} sx={{ p: 0 }}>
									{isLiked ? <FavoriteIcon sx={{ color: '#a86464' }} /> : <FavoriteBorderIcon sx={{ color: '#000' }} />}
								</IconButton>
								<IconButton sx={{ p: 0 }}>
									<ShareIcon sx={{ color: '#000' }} />
								</IconButton>
							</Stack>
						</Stack>

						{/* Title */}
						<Typography className="detail-title">
							{furniture?.furnitureTitle ?? 'The Cloud Nine Sectional Sofa'}
						</Typography>

						{/* Subtitle */}
						<Typography className="detail-subtitle">
							{furniture?.furnitureDesc ?? 'The Cloud Nine Sectional Sofa from MONOLITH is the epitome of luxury and comfort.'}
						</Typography>

						{/* Price */}
						<Stack className="detail-price-row" direction="row" alignItems="center" gap="8px">
							<Typography className="detail-price">$ {currentPrice.toFixed(2)}</Typography>
							{hasDiscount && (
								<>
									<Typography className="detail-price-old">$ {furniture.furniturePrice.toFixed(2)}</Typography>
									<Typography className="detail-discount">{discountPercent}% off</Typography>
								</>
							)}
						</Stack>

						{/* Countdown */}
						<Stack className="detail-countdown-section">
							<Stack direction="row" alignItems="center" gap="8px">
								<AccessAlarmIcon sx={{ fontSize: 18, color: '#a86464' }} />
								<Typography className="countdown-label">Hurry up! Sale end in:</Typography>
							</Stack>
							<Stack className="countdown-timer">
								<Stack direction="row" alignItems="center" gap="14px">
									{[
										{ val: countdown.days, label: 'DAYS' },
										{ val: countdown.hours, label: 'HOURS' },
										{ val: countdown.mins, label: 'MINS' },
										{ val: countdown.secs, label: 'SECS' },
									].map((item, idx) => (
										<React.Fragment key={item.label}>
											{idx > 0 && <Typography className="countdown-colon">:</Typography>}
											<Box className="countdown-circle">
												<span>{String(item.val).padStart(2, '0')}</span>
											</Box>
										</React.Fragment>
									))}
								</Stack>
								<Stack direction="row" gap="32px" className="countdown-labels">
									<span>DAYS</span>
									<span>HOURS</span>
									<span>MINS</span>
									<span>SECS</span>
								</Stack>
							</Stack>
						</Stack>

						{/* Quantity */}
						<Stack direction="row" alignItems="center" gap="24px">
							<Typography className="detail-label">Quantity:</Typography>
							<Box className="quantity-selector">
								<IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ p: 0 }}>
									<RemoveIcon sx={{ fontSize: 24 }} />
								</IconButton>
								<Typography className="quantity-value">{quantity}</Typography>
								<IconButton onClick={() => setQuantity(quantity + 1)} sx={{ p: 0 }}>
									<AddIcon sx={{ fontSize: 24 }} />
								</IconButton>
							</Box>
						</Stack>

						{/* Colors */}
						<Stack direction="row" alignItems="center" gap="24px">
							<Typography className="detail-label">Colors:</Typography>
							<Stack direction="row" gap="12px">
								{colorSwatches.map((color, idx) => (
									<Box
										key={color}
										className={`color-swatch ${idx === selectedColor ? 'active' : ''}`}
										sx={{ background: color }}
										onClick={() => setSelectedColor(idx)}
									/>
								))}
							</Stack>
							<Stack direction="row" alignItems="center" gap="8px">
								<CheckIcon sx={{ fontSize: 16, color: '#379237' }} />
								<Typography className="stock-label">50 in stock</Typography>
							</Stack>
						</Stack>

						{/* Add to Cart */}
						<Button className="btn-add-to-cart" variant="contained" fullWidth onClick={handleAddToCart}>
							ADD TO CART
						</Button>

						{/* Delivery */}
						<Stack className="detail-delivery">
							<Stack direction="row" alignItems="center" gap="14px" className="delivery-title-row">
								<LocalShippingOutlinedIcon sx={{ fontSize: 24 }} />
								<Typography className="delivery-title">Delivery options</Typography>
							</Stack>
							<Box className="delivery-input">
								<span className="placeholder">Enter pin code</span>
								<span className="check-btn">CHECK</span>
							</Box>
						</Stack>

						{/* Trust badges */}
						<Stack className="detail-trust-badges">
							<Stack direction="row" alignItems="center" gap="14px">
								<VerifiedIcon sx={{ fontSize: 24, color: '#000' }} />
								<Typography className="trust-text">100% Original Products</Typography>
							</Stack>
							<Stack direction="row" alignItems="center" gap="14px">
								<ShieldIcon sx={{ fontSize: 24, color: '#000' }} />
								<Typography className="trust-text">Secure shopping</Typography>
							</Stack>
							<Stack direction="row" alignItems="center" gap="14px">
								<ReplayIcon sx={{ fontSize: 24, color: '#000' }} />
								<Typography className="trust-text">Easy 14 days returns and exchanges</Typography>
							</Stack>
						</Stack>
					</Stack>

					{/* Available Offers */}
					<Stack className="detail-offers">
						<Typography className="section-heading">Available offers</Typography>
						<ul className="offers-list">
							{offers.map((offer, idx) => (
								<li key={idx}>{offer}</li>
							))}
						</ul>
					</Stack>

					{/* Description */}
					<Stack className="detail-description">
						<Typography className="section-heading">Description</Typography>
						<Typography className="desc-text">
							{furniture?.furnitureDesc ??
								'The Cloud Nine Sectional Sofa offers ample room for relaxation and entertaining. Sink into the plush seat and back cushions, filled with high-quality foam that provides optimal comfort and support. The tufted detailing on the cushions adds a touch of elegance and sophistication to the overall aesthetic.'}
						</Typography>
					</Stack>
				</Stack>
			</Stack>

			{/* Reviews Section */}
			<ProductReviews furnitureId={furniture?._id} />

			{/* Similar Products */}
			<Stack className="detail-similar-section">
				<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
					<Typography className="section-title-lg">Similar products</Typography>
					<Stack direction="row" gap="24px">
						<IconButton><ArrowBackIcon /></IconButton>
						<IconButton><ArrowForwardIcon /></IconButton>
					</Stack>
				</Stack>
				<Stack className="products-row" direction="row" gap="24px">
					{(similarFurnitures.length > 0 ? similarFurnitures : []).map((item) => {
						const itemImage = item.furnitureImages?.[0]
							? `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
							: '/img/furniture/luxury_chair.jpg';
						const hasDiscount = item.furnitureDiscount > 0;
						const originalPrice = hasDiscount
							? item.furniturePrice / (1 - item.furnitureDiscount / 100)
							: null;
						return (
							<Box
								className="product-card-sm"
								key={item._id}
								onClick={() => router.push(`/furniture/detail?id=${item._id}`)}
								sx={{ cursor: 'pointer' }}
							>
								<Box className="product-card-sm-img">
									<img src={itemImage} alt={item.furnitureTitle} />
								</Box>
								<Box className="product-card-sm-info">
									<Stack direction="row" alignItems="center" gap="4px">
										<Box className="rating-badge-sm">
											<span>{item.furnitureRank ? (item.furnitureRank / 2).toFixed(1) : '4.5'}</span>
											<StarIcon sx={{ fontSize: 12, color: '#fff' }} />
										</Box>
										<Typography className="rating-count-sm">({item.furnitureComments})</Typography>
									</Stack>
									<Typography className="product-sm-title">{item.furnitureTitle}</Typography>
									<Stack direction="row" alignItems="center" gap="8px">
										<Typography className="product-sm-price">${item.furniturePrice.toFixed(2)}</Typography>
										{originalPrice && (
											<Typography className="product-sm-old-price">${originalPrice.toFixed(2)}</Typography>
										)}
									</Stack>
								</Box>
							</Box>
						);
					})}
					{similarFurnitures.length === 0 && (
						<Typography sx={{ color: 'var(--color-text-muted)', py: 2 }}>No similar products found.</Typography>
					)}
				</Stack>
			</Stack>

			{/* FAQ Section */}
			<Stack className="detail-faq-section">
				<Stack className="section-header-row" direction="row" justifyContent="space-between" alignItems="center">
					<Typography className="section-title-lg">Recent Questions and Answers</Typography>
					<Button variant="outlined" className="btn-all-reviews">ASK QUESTION</Button>
				</Stack>
				<Stack className="faq-list">
					{faqItems.map((faq, idx) => (
						<Box className="faq-item" key={idx} onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}>
							<Stack direction="row" justifyContent="space-between" alignItems="center" className="faq-question-row">
								<Typography className="faq-question">{faq.question}</Typography>
								{openFaq === idx ? (
									<KeyboardArrowDownIcon sx={{ fontSize: 32, color: '#000' }} />
								) : (
									<KeyboardArrowRightIcon sx={{ fontSize: 32, color: '#000' }} />
								)}
							</Stack>
							{openFaq === idx && faq.answer && (
								<Typography className="faq-answer">{faq.answer}</Typography>
							)}
						</Box>
					))}
				</Stack>
			</Stack>

			{/* Instagram Section */}
			<InstagramSection />
		</Stack>
	);
};

export default withLayoutBasic(FurnitureDetail);
