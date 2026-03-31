import { Stack, Box, Typography } from '@mui/material';

interface StandardCoupon {
	title: string;
	subtitle: string;
	code: string;
}

interface TicketCoupon {
	lines: string[];
	description: string;
	code: string;
}

const standardCoupons: StandardCoupon[] = [
	{ title: 'Get 10% off on all furniture', subtitle: 'Expires in 30 days', code: 'S T Y L E 1 0 O F F' },
	{ title: 'free shipping on orders over $50', subtitle: 'Limited time offer', code: 'F R E E S H I P 5 0' },
	{ title: '20% discount for new customers', subtitle: 'Limited to first-time purchases', code: 'N E W C U S T O M E R 2 0' },
	{ title: 'Refer a friend and get 10% off your next order', subtitle: 'Ongoing promotion', code: 'R E F E R 1 0' },
	{ title: 'Save 15% on office furniture', subtitle: 'Limited time offer', code: 'O F F I C E 1 5' },
	{ title: 'Get 15% off\nbuy(minimum 3 items)', subtitle: 'Ongoing promotion', code: 'B U N D L E 1 5' },
];

const ticketCoupons: TicketCoupon[] = [
	{ lines: ['SPECIAL', '10% off'], description: 'Valid for all major banks', code: 'BANK15OFF' },
	{ lines: ['AMAZING 25% off'], description: 'Applicable for all bank credit card', code: 'BANK25DEAL' },
];

const MyCoupons = () => {
	return (
		<Stack className="coupons-content">
			<Typography className="content-title">My Coupons</Typography>

			<Box className="coupons-grid">
				{standardCoupons.map((coupon, i) => (
					<Box key={i} className="coupon-card">
						<Stack className="coupon-info">
							<Typography className="coupon-title">{coupon.title}</Typography>
							<Typography className="coupon-subtitle">{coupon.subtitle}</Typography>
						</Stack>
						<Stack className="coupon-code-wrapper">
							<Typography className="coupon-code">{coupon.code}</Typography>
						</Stack>
					</Box>
				))}
			</Box>

			<Stack className="ticket-coupons-row">
				{ticketCoupons.map((ticket, i) => (
					<Box key={i} className="ticket-coupon">
						<Box className="ticket-main">
							{ticket.lines.map((line, j) => (
								<Typography key={j} className="ticket-heading-line">
									{line}
								</Typography>
							))}
							<Typography className="ticket-desc">{ticket.description}</Typography>
						</Box>
						<Box className="ticket-stub">
							<Typography className="ticket-code">{ticket.code}</Typography>
						</Box>
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default MyCoupons;
