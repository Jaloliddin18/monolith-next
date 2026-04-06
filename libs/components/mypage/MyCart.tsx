import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box, Typography, IconButton, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { CartItem, getCartItems, removeFromCart, updateCartQuantity } from '../../utils/cartStorage';
import { REACT_APP_API_URL } from '../../config';
import { FurnitureStatus } from '../../enums/furniture.enum';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

const MyCart = () => {
	const router = useRouter();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [couponCode, setCouponCode] = useState('');
	const [countdown, setCountdown] = useState({ hours: 18, mins: 23, secs: 0 });

	useEffect(() => {
		setCartItems(getCartItems());
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				let { hours, mins, secs } = prev;
				if (secs > 0) {
					secs--;
				} else if (mins > 0) {
					mins--;
					secs = 59;
				} else if (hours > 0) {
					hours--;
					mins = 59;
					secs = 59;
				}
				return { hours, mins, secs };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleRemove = (id: string) => {
		setCartItems(removeFromCart(id));
	};

	const handleQuantityChange = (id: string, delta: number) => {
		const item = cartItems.find((i) => i._id === id);
		if (!item) return;
		setCartItems(updateCartQuantity(id, item.quantity + delta));
	};

	const getItemImage = (item: CartItem) => {
		return item.furnitureImages?.[0] ? `${REACT_APP_API_URL}/${item.furnitureImages[0]}` : PLACEHOLDER_IMG;
	};

	const isOutOfStock = (item: CartItem) => item.furnitureStatus === FurnitureStatus.DISCONTINUED;

	const getDisplayPrice = (item: CartItem) => {
		if (item.furnitureLastChancePrice && item.furnitureLastChancePrice < item.furniturePrice) {
			return item.furnitureLastChancePrice;
		}
		return item.furniturePrice;
	};

	const inStockItems = cartItems.filter((item) => !isOutOfStock(item));
	const subtotal = inStockItems.reduce((sum, item) => sum + getDisplayPrice(item) * item.quantity, 0);
	const total = subtotal;

	return (
		<Stack className="cart-content" direction="row" gap="24px">
			<Stack className="cart-items-section">
				<Typography className="content-title">My Cart({cartItems.length})</Typography>

				{cartItems.length === 0 ? (
					<Box className="placeholder-content">Your cart is empty</Box>
				) : (
					<Stack className="cart-items">
						{cartItems.map((item) => {
							const outOfStock = isOutOfStock(item);
							const displayPrice = getDisplayPrice(item);
							const hasDiscount = item.furnitureLastChancePrice && item.furnitureLastChancePrice < item.furniturePrice;
							const discountPercent = hasDiscount
								? Math.round(((item.furniturePrice - item.furnitureLastChancePrice!) / item.furniturePrice) * 100)
								: item.furnitureDiscount ?? 0;

							return (
								<Box key={item._id} className="cart-item">
									<Box className="cart-item-image">
										<img src={getItemImage(item)} alt={item.furnitureTitle} />
										{outOfStock && (
											<Box className="out-of-stock-overlay">
												<Typography>Out of stock</Typography>
											</Box>
										)}
									</Box>

									<Stack className="cart-item-details">
										<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
											<Stack gap="12px">
												<Typography className="item-title">{item.furnitureTitle}</Typography>
												<Stack direction="row" alignItems="center" gap="8px">
													<Typography className="item-price">${displayPrice.toFixed(2)}</Typography>
													{hasDiscount && (
														<>
															<Typography className="item-price-old">${item.furniturePrice.toFixed(2)}</Typography>
															<Typography className="item-discount">({discountPercent}% off)</Typography>
														</>
													)}
												</Stack>
												{!outOfStock && (
													<Box className="quantity-control">
														<IconButton className="qty-btn" onClick={() => handleQuantityChange(item._id, -1)}>
															<RemoveIcon sx={{ fontSize: 20 }} />
														</IconButton>
														<Typography className="qty-value">{item.quantity}</Typography>
														<IconButton className="qty-btn" onClick={() => handleQuantityChange(item._id, 1)}>
															<AddIcon sx={{ fontSize: 20 }} />
														</IconButton>
													</Box>
												)}
											</Stack>
											<IconButton className="delete-btn" onClick={() => handleRemove(item._id)}>
												<DeleteOutlineIcon sx={{ fontSize: 20, color: '#999' }} />
											</IconButton>
										</Stack>
									</Stack>
								</Box>
							);
						})}
					</Stack>
				)}
			</Stack>

			<Stack className="billing-summary">
				<Typography className="billing-title">Billing Summary</Typography>

				<Stack className="billing-timer">
					<Stack direction="row" alignItems="center" gap="8px">
						<AccessAlarmIcon sx={{ fontSize: 18, color: '#a86464' }} />
						<Typography className="timer-label">Hurry up! Sale end in:</Typography>
					</Stack>
					<Stack gap="4px">
						<Stack direction="row" alignItems="center" gap="14px">
							<Box className="timer-badge">
								<Typography>{String(countdown.hours).padStart(2, '0')}</Typography>
							</Box>
							<Typography className="timer-colon">:</Typography>
							<Box className="timer-badge">
								<Typography>{String(countdown.mins).padStart(2, '0')}</Typography>
							</Box>
							<Typography className="timer-colon">:</Typography>
							<Box className="timer-badge">
								<Typography>{String(countdown.secs).padStart(2, '0')}</Typography>
							</Box>
						</Stack>
						<Stack direction="row" gap="32px">
							<Typography className="timer-unit">HOURS</Typography>
							<Typography className="timer-unit">MINS</Typography>
							<Typography className="timer-unit">SECS</Typography>
						</Stack>
					</Stack>
				</Stack>

				<Stack className="billing-details">
					<Box className="coupon-input">
						<input type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
						<button className="apply-btn">APPLY</button>
					</Box>

					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Stack direction="row" alignItems="center" gap="4px">
							<Typography className="summary-label">Sub total</Typography>
							<Typography className="summary-count">({inStockItems.length} items)</Typography>
						</Stack>
						<Typography className="summary-value">${subtotal.toFixed(2)}</Typography>
					</Stack>

					<Stack direction="row" justifyContent="space-between" alignItems="center">
						<Typography className="summary-label">Shipping</Typography>
						<Typography className="summary-value-green">Free</Typography>
					</Stack>
				</Stack>

				<Stack className="billing-total" direction="row" justifyContent="space-between">
					<Typography className="total-label">Total</Typography>
					<Typography className="total-value">${total.toFixed(2)}</Typography>
				</Stack>

				<Button className="checkout-btn" onClick={() => router.push('/checkout')}>CHECK OUT</Button>
			</Stack>
		</Stack>
	);
};

export default MyCart;
