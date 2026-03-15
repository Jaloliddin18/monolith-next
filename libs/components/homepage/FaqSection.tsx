import React from 'react';
import { Box, Stack, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
	{
		question: 'How can I place an order on StyleCasa?',
		answer:
			'Placing an order on StyleCasa is easy. Simply browse our website, select the desired products, and add them to your shopping cart. Proceed to the checkout page, provide the necessary information, and complete the payment process. Once your order is confirmed, we will process it and provide you with updates on shipping and delivery.',
	},
	{
		question: 'How long will it take to receive my order?',
		answer: 'Delivery times vary based on your location and chosen shipping method. Standard delivery typically takes 5-10 business days.',
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
	return (
		<Stack className="faq-section">
			<Typography className="section-title" variant="h2" textAlign="center" mb={4}>
				Frequently asked questions
			</Typography>

			<Box className="faq-container">
				{faqs.map((faq, index) => (
					<Accordion key={index} className="faq-accordion" defaultExpanded={index === 0}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="body1" fontWeight={500}>
								{faq.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="body2" color="text.secondary">
								{faq.answer}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Stack>
	);
};

export default FaqSection;
