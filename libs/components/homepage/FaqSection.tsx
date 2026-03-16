import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/SouthWest';

const faqs = [
	{
		question: 'How can I place an order on StyleCasa?',
		answer:
			'Placing an order on StyleCasa is easy. Simply browse our website, select the desired products, and add them to your shopping cart. Proceed to the checkout page, provide the necessary information, and complete the payment process. Once your order is confirmed, we will process it and provide you with updates on shipping and delivery.',
	},
	{
		question: 'How long will it take to receive my order?',
		answer:
			'Delivery times vary based on your location and chosen shipping method. Standard delivery typically takes 5-10 business days.',
	},
	{
		question: 'What is your return policy?',
		answer: 'We offer a 30-day return policy. Items must be in their original condition and packaging.',
	},
	{
		question: 'How can I place an order on StyleCasa?',
		answer: 'You can place orders through our website or contact our customer service team for assistance.',
	},
];

const FaqSection = () => {
	const [expanded, setExpanded] = useState(0);

	return (
		<Stack className="faq-section" alignItems="center" gap="50px">
			<Typography className="section-title-text">Frequently asked questions</Typography>
			<Stack className="faq-list">
				{faqs.map((faq, index) => (
					<Box
						key={index}
						className={`faq-item ${expanded === index ? 'faq-item-expanded' : ''}`}
						onClick={() => setExpanded(expanded === index ? -1 : index)}
					>
						<Stack className="faq-question" direction="row" justifyContent="space-between" alignItems="center">
							<Typography className="faq-question-text">{faq.question}</Typography>
							{expanded === index ? (
								<ArrowDownwardIcon sx={{ fontSize: 32, color: '#000' }} />
							) : (
								<ArrowForwardIcon sx={{ fontSize: 32, color: '#000' }} />
							)}
						</Stack>
						{expanded === index && (
							<Typography className="faq-answer">{faq.answer}</Typography>
						)}
					</Box>
				))}
			</Stack>
		</Stack>
	);
};

export default FaqSection;
