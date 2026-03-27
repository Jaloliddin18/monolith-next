import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box, Typography, IconButton, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Link from 'next/link';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

interface CartItem {
	id: string;
	title: string;
	price: number;
	originalPrice: number;
	discountPercent: number;
	quantity: number;
	outOfStock: boolean;
}

const initialCartItems: CartItem[] = [
	{ id: 'cart-1', title: 'Elegant Comfort Chair', price: 129.99, originalPrice: 68.35, discountPercent: 10, quantity: 1, outOfStock: true },
	{ id: 'cart-2', title: 'Elegant Comfort Chair', price: 99.99, originalPrice: 68.35, discountPercent: 30, quantity: 1, outOfStock: true },
	{ id: 'cart-3', title: 'Elegant Comfort Chair', price: 179.99, originalPrice: 68.35, discountPercent: 20, quantity: 1, outOfStock: false },
	{ id: 'cart-4', title: 'Elegant Comfort Chair', price: 89.99, originalPrice: 68.35, discountPercent: 10, quantity: 1, outOfStock: false },
	{ id: 'cart-5', title: 'Elegant Comfort Chair', price: 79.99, originalPrice: 68.35, discountPercent: 20, quantity: 1, outOfStock: false },
];

const MyCart = () => {
	const router = useRouter();
	const [cartItems, setCartItems] = useState(initialCartItems);
	const [couponCode, setCouponCode] = useState('');
	const [countdown, setCountdown] = useState({ hours: 18, mins: 23, secs: 0 });

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
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const handleQuantityChange = (id: string, delta: number) => {
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
			),
		);
	};

	const inStockItems = cartItems.filter((item) => !item.outOfStock);
	const subtotal = inStockItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const discount = 30;
	const total = subtotal - discount;

	return (
		<Stack className="cart-content" direction="row" gap="24px">
			<Stack className="cart-items-section">
				<Typography className="content-title">My Cart({cartItems.length})</Typography>

				<Stack className="cart-items">
					{cartItems.map((item) => (
						<Box key={item.id} className="cart-item">
							<Box className="cart-item-image">
								<img src={PLACEHOLDER_IMG} alt={item.title} />
								{item.outOfStock && (
									<Box className="out-of-stock-overlay">
										<Typography>Out of stock</Typography>
									</Box>
								)}
							</Box>

							<Stack className="cart-item-details">
								<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
									<Stack gap="12px">
										<Typography className="item-title">{item.title}</Typography>
										<Stack direction="row" alignItems="center" gap="8px">
											<Typography className="item-price">${item.price.toFixed(2)}</Typography>
											<Typography className="item-price-old">$ {item.originalPrice.toFixed(2)}</Typography>
											<Typography className="item-discount">({item.discountPercent}% off)</Typography>
										</Stack>
										{!item.outOfStock && (
											<Box className="quantity-control">
												<IconButton className="qty-btn" onClick={() => handleQuantityChange(item.id, -1)}>
													<RemoveIcon sx={{ fontSize: 20 }} />
												</IconButton>
												<Typography className="qty-value">{item.quantity}</Typography>
												<IconButton className="qty-btn" onClick={() => handleQuantityChange(item.id, 1)}>
													<AddIcon sx={{ fontSize: 20 }} />
												</IconButton>
											</Box>
										)}
									</Stack>
									<IconButton className="delete-btn" onClick={() => handleRemove(item.id)}>
										<DeleteOutlineIcon sx={{ fontSize: 20, color: '#999' }} />
									</IconButton>
								</Stack>
							</Stack>
						</Box>
					))}
				</Stack>
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
						<Typography className="summary-label">Discount</Typography>
						<Typography className="summary-value-green">-${discount}</Typography>
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
