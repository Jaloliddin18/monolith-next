import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const PLACEHOLDER_IMG = '/img/furniture/luxury_chair.jpg';

interface OrderItem {
	id: number;
	title: string;
	qty: number;
	price: number;
	originalPrice: number;
}

const orderItems: OrderItem[] = [
	{ id: 1, title: 'Elegant Comfort Chair', qty: 1, price: 129.99, originalPrice: 68.35 },
	{ id: 2, title: 'Elegant Comfort Chair', qty: 1, price: 89.99, originalPrice: 68.35 },
	{ id: 3, title: 'Elegant Comfort Chair', qty: 1, price: 179.99, originalPrice: 68.35 },
];

const OrderSummary = () => {
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

	const subtotal = 319.97;
	const discount = 30;
	const total = subtotal - discount;

	return (
		<Stack className="order-summary">
			{/* Order Items */}
			<Typography className="summary-title">Order Summary</Typography>
			<Stack className="order-items">
				{orderItems.map((item) => (
					<div className="order-item" key={item.id}>
						<div className="order-item-image">
							<img src={PLACEHOLDER_IMG} alt={item.title} />
						</div>
						<div className="order-item-content">
							<p className="order-item-name">{item.title}</p>
							<p className="order-item-qty">QTY : {item.qty}</p>
							<div className="order-item-price-row">
								<span className="order-item-price">${item.price.toFixed(2)}</span>
								<span className="order-item-original">$ {item.originalPrice.toFixed(2)}</span>
							</div>
						</div>
					</div>
				))}
			</Stack>

			{/* Countdown Timer */}
			<div className="order-timer">
				<div className="timer-header">
					<AccessAlarmIcon sx={{ fontSize: 18, color: '#a86464' }} />
					<span className="timer-text">Hurry up! Sale end in:</span>
				</div>
				<div className="timer-circles">
					<div className="timer-row">
						<div className="timer-circle">
							<span>{String(countdown.hours).padStart(2, '0')}</span>
						</div>
						<span className="timer-colon">:</span>
						<div className="timer-circle">
							<span>{String(countdown.mins).padStart(2, '0')}</span>
						</div>
						<span className="timer-colon">:</span>
						<div className="timer-circle">
							<span>{String(countdown.secs).padStart(2, '0')}</span>
						</div>
					</div>
					<div className="timer-labels">
						<span>HOURS</span>
						<span>MINS</span>
						<span>SECS</span>
					</div>
				</div>
			</div>

			{/* Pricing */}
			<div className="order-pricing">
				<div className="pricing-row">
					<span className="pricing-label">
						Sub total <span className="pricing-count">(3 items)</span>
					</span>
					<span className="pricing-value">${subtotal.toFixed(2)}</span>
				</div>
				<div className="pricing-row">
					<span className="pricing-label">Discount</span>
					<span className="pricing-value green">-${discount}</span>
				</div>
				<div className="pricing-row">
					<span className="pricing-label">Shipping</span>
					<span className="pricing-value green">Free</span>
				</div>
				<div className="pricing-row">
					<span className="pricing-label">Discount</span>
				</div>
			</div>

			{/* Total */}
			<div className="order-total">
				<span>Total</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
		</Stack>
	);
};

export default OrderSummary;
