import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { GET_FURNITURES } from '../../../apollo/user/query';
import { CartItem, getCartItems, removeFromCart, updateCartQuantity } from '../../utils/cartStorage';
import { Furniture } from '../../types/furniture/furniture';
import { Direction } from '../../enums/common.enum';
import { REACT_APP_API_URL } from '../../config';
import { T } from '../../types/common';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

interface MiniCartProps {
	open: boolean;
	onClose: () => void;
}

const MiniCart = ({ open, onClose }: MiniCartProps) => {
	const router = useRouter();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [couponCode, setCouponCode] = useState('');
	const [suggestedProducts, setSuggestedProducts] = useState<Furniture[]>([]);

	useEffect(() => {
		if (open) setCartItems(getCartItems());
	}, [open]);

	useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 3, sort: 'furnitureRank', direction: Direction.DESC, search: {} } },
		onCompleted: (data: T) => setSuggestedProducts(data?.getFurnitures?.list ?? []),
	});

	const handleQuantityChange = (id: string, delta: number) => {
		const item = cartItems.find((i) => i._id === id);
		if (!item) return;
		setCartItems(updateCartQuantity(id, item.quantity + delta));
	};

	const handleRemoveItem = (id: string) => {
		setCartItems(removeFromCart(id));
	};

	const getItemImage = (item: CartItem) =>
		item.furnitureImages?.[0] ? `${REACT_APP_API_URL}/${item.furnitureImages[0]}` : PLACEHOLDER_IMG;

	const getSuggestedImage = (f: Furniture) =>
		f.furnitureImages?.[0] ? `${REACT_APP_API_URL}/${f.furnitureImages[0]}` : PLACEHOLDER_IMG;

	const getDisplayPrice = (item: CartItem) =>
		item.furnitureLastChancePrice && item.furnitureLastChancePrice < item.furniturePrice
			? item.furnitureLastChancePrice
			: item.furniturePrice;

	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const subTotal = cartItems.reduce((sum, item) => sum + getDisplayPrice(item) * item.quantity, 0);

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
							{cartItems.map((item) => {
								const displayPrice = getDisplayPrice(item);
								const hasDiscount = item.furnitureLastChancePrice && item.furnitureLastChancePrice < item.furniturePrice;
								const discountPercent = hasDiscount
									? Math.round(((item.furniturePrice - item.furnitureLastChancePrice!) / item.furniturePrice) * 100)
									: item.furnitureDiscount ?? 0;

								return (
									<div className="cart-item" key={item._id}>
										<div className="cart-item-image">
											<img src={getItemImage(item)} alt={item.furnitureTitle} />
										</div>
										<div className="cart-item-details">
											<div className="cart-item-content">
												<p className="item-title">{item.furnitureTitle}</p>
												<div className="item-price-row">
													<span className="current-price">${displayPrice.toFixed(2)}</span>
													{hasDiscount && (
														<>
															<span className="original-price">${item.furniturePrice.toFixed(2)}</span>
															<span className="discount">({discountPercent}% off)</span>
														</>
													)}
												</div>
												<div className="quantity-controls">
													<button onClick={() => handleQuantityChange(item._id, -1)}>
														<RemoveIcon sx={{ fontSize: 18 }} />
													</button>
													<span className="quantity-value">{item.quantity}</span>
													<button onClick={() => handleQuantityChange(item._id, 1)}>
														<AddIcon sx={{ fontSize: 18 }} />
													</button>
												</div>
											</div>
											<button className="delete-btn" onClick={() => handleRemoveItem(item._id)}>
												<DeleteOutlineIcon sx={{ fontSize: 22 }} />
											</button>
										</div>
									</div>
								);
							})}
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
									<span className="pricing-label">Shipping</span>
									<span className="pricing-value green">Free</span>
								</div>
							</div>

							{/* Total */}
							<div className="total-row">
								<span>Total</span>
								<span>${subTotal.toFixed(2)}</span>
							</div>

							{/* Action Buttons */}
							<div className="cart-actions">
								<Link href="/mypage/cart" className="btn-view-cart" onClick={onClose}>
									VIEW MY CART
								</Link>
								<Link href="/checkout" className="btn-checkout" onClick={onClose}>CHECK OUT</Link>
							</div>
						</div>
					</>
				) : (
					/* Empty Cart State */
					<div className="empty-cart-state">
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
				{suggestedProducts.length > 0 && (
					<div className="suggested-products">
						<h4>Suggested Products</h4>
						<div className="suggested-grid">
							{suggestedProducts.map((product) => {
								const hasDiscount = product.furnitureDiscount > 0;
								const originalPrice = hasDiscount
									? product.furniturePrice / (1 - product.furnitureDiscount / 100)
									: null;
								return (
									<div
										className="suggested-card"
										key={product._id}
										onClick={() => { router.push(`/furniture/detail?id=${product._id}`); onClose(); }}
										style={{ cursor: 'pointer' }}
									>
										<div className="suggested-image">
											<img src={getSuggestedImage(product)} alt={product.furnitureTitle} />
											{product.furnitureBestseller && (
												<span className="suggested-badge">Best seller</span>
											)}
										</div>
										<div className="suggested-content">
											<p className="suggested-title">{product.furnitureTitle}</p>
											<div className="suggested-price-row">
												<span className="suggested-price">${product.furniturePrice.toFixed(2)}</span>
												{originalPrice && (
													<span className="suggested-original">${originalPrice.toFixed(2)}</span>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MiniCart;
