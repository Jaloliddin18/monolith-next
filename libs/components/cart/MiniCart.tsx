import React, { useState } from 'react';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CartItem {
	id: number;
	title: string;
	price: number;
	originalPrice: number;
	discountPercent: number;
	quantity: number;
	image: string;
	badge?: string;
}

interface SuggestedProduct {
	id: number;
	title: string;
	price: number;
	originalPrice: string;
	image: string;
	badge?: string;
}

const initialCartItems: CartItem[] = [
	{
		id: 1,
		title: 'Elegant Comfort Chair',
		price: 179.99,
		originalPrice: 68.35,
		discountPercent: 20,
		quantity: 1,
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		id: 2,
		title: 'Elegant Comfort Chair',
		price: 179.99,
		originalPrice: 68.35,
		discountPercent: 20,
		quantity: 1,
		image: '/img/furniture/luxury_chair.jpg',
		badge: 'PopularPicks',
	},
	{
		id: 3,
		title: 'Elegant Comfort Chair',
		price: 179.99,
		originalPrice: 68.35,
		discountPercent: 20,
		quantity: 1,
		image: '/img/furniture/luxury_chair.jpg',
	},
];

const suggestedProducts: SuggestedProduct[] = [
	{
		id: 1,
		title: 'Wooden Showpice Table',
		price: 32.10,
		originalPrice: '$ 68.35 USD',
		image: '/img/furniture/luxury_chair.jpg',
		badge: 'Top rating',
	},
	{
		id: 2,
		title: 'Wooden Showpice Table',
		price: 32.10,
		originalPrice: '$ 68.35 USD',
		image: '/img/furniture/luxury_chair.jpg',
	},
	{
		id: 3,
		title: 'Wooden Showpice Table',
		price: 32.10,
		originalPrice: '$ 68.35 USD',
		image: '/img/furniture/luxury_chair.jpg',
	},
];

interface MiniCartProps {
	open: boolean;
	onClose: () => void;
}

const MiniCart = ({ open, onClose }: MiniCartProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
	const [couponCode, setCouponCode] = useState('');

	const handleQuantityChange = (id: number, delta: number) => {
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity + delta) }
					: item
			)
		);
	};

	const handleRemoveItem = (id: number) => {
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const discount = 30;
	const total = subTotal - discount;

	if (!open) return null;

	return (
		<div id="mini-cart-sidebar">
			<div className="mini-cart-backdrop" onClick={onClose} />
			<div className="mini-cart-panel">
				{/* Header */}
				<div className="mini-cart-header">
					<div className="header-title">
						<h3>Your Cart</h3>
						<span className="item-count">({totalItems} Items)</span>
					</div>
					<button className="close-btn" onClick={onClose}>
						<CloseIcon />
					</button>
				</div>

				{cartItems.length > 0 ? (
					<>
						{/* Cart Items */}
						<div className="mini-cart-items">
							{cartItems.map((item) => (
								<div className="cart-item" key={item.id}>
									<div className="cart-item-image">
										<img src={item.image} alt={item.title} />
										{item.badge && (
											<span className="item-badge">{item.badge}</span>
										)}
									</div>
									<div className="cart-item-details">
										<div className="cart-item-content">
											<p className="item-title">{item.title}</p>
											<div className="item-price-row">
												<span className="current-price">${item.price.toFixed(2)}</span>
												<span className="original-price">$ {item.originalPrice.toFixed(2)}</span>
												<span className="discount">({item.discountPercent}% off)</span>
											</div>
											<div className="quantity-controls">
												<button onClick={() => handleQuantityChange(item.id, -1)}>
													<RemoveIcon sx={{ fontSize: 18 }} />
												</button>
												<span className="quantity-value">{item.quantity}</span>
												<button onClick={() => handleQuantityChange(item.id, 1)}>
													<AddIcon sx={{ fontSize: 18 }} />
												</button>
											</div>
										</div>
										<button className="delete-btn" onClick={() => handleRemoveItem(item.id)}>
											<DeleteOutlineIcon sx={{ fontSize: 22 }} />
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Summary Section */}
						<div className="mini-cart-summary">
							{/* Coupon */}
							<div className="coupon-section">
								<input
									type="text"
									placeholder="Enter coupon code"
									value={couponCode}
									onChange={(e) => setCouponCode(e.target.value)}
								/>
								<button className="apply-btn">APPLY</button>
							</div>

							{/* Pricing */}
							<div className="pricing-rows">
								<div className="pricing-row">
									<span className="pricing-label">
										Sub total <span className="pricing-count">({totalItems} items)</span>
									</span>
									<span className="pricing-value">${subTotal.toFixed(2)}</span>
								</div>
								<div className="pricing-row">
									<span className="pricing-label">Discount</span>
									<span className="pricing-value green">-${discount}</span>
								</div>
								<div className="pricing-row">
									<span className="pricing-label">Shipping</span>
									<span className="pricing-value green">Free</span>
								</div>
							</div>

							{/* Total */}
							<div className="total-row">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>

							{/* Action Buttons */}
							<div className="cart-actions">
								<Link href="/mypage/cart" className="btn-view-cart" onClick={onClose}>
									VIEW MY CART
								</Link>
								<button className="btn-checkout">CHECK OUT</button>
							</div>
						</div>
					</>
				) : (
					/* Empty Cart State */
					<div className="empty-cart-state">
						<div className="empty-cart-illustration">
							<img src="/img/cart/empty-cart.svg" alt="Empty cart" />
						</div>
						<div className="empty-cart-text">
							<h3>Your Cart is Currently Empty</h3>
							<p>Start Adding Furniture to Create Your Perfect Space</p>
						</div>
						<Link href="/furniture" className="btn-shop-now" onClick={onClose}>
							SHOPPING NOW
						</Link>
					</div>
				)}

				{/* Suggested Products */}
				<div className="suggested-products">
					<h4>Suggested Products</h4>
					<div className="suggested-grid">
						{suggestedProducts.map((product) => (
							<div className="suggested-card" key={product.id}>
								<div className="suggested-image">
									<img src={product.image} alt={product.title} />
									{product.badge && (
										<span className="suggested-badge">{product.badge}</span>
									)}
								</div>
								<div className="suggested-content">
									<p className="suggested-title">{product.title}</p>
									<div className="suggested-price-row">
										<span className="suggested-price">$ {product.price.toFixed(2)}</span>
										<span className="suggested-original">{product.originalPrice}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MiniCart;
