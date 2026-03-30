import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SouthWestIcon from '@mui/icons-material/SouthWest';

const faqCategories = ['Ordering and Shipping', 'Product Information', 'Returns and Exchanges', 'Payment and Billing'];

const faqDataByCategory: Record<string, { question: string; answer: string }[]> = {
	'Ordering and Shipping': [
		{
			question: 'How can I place an order for furniture?',
			answer:
				'To place an order, simply browse our website, select the desired furniture item, and click on the "Add to Cart" or "Buy Now" button. Follow the prompts to complete the checkout process.',
		},
		{
			question: 'What are the available payment options?',
			answer:
				'We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secured with SSL encryption.',
		},
		{
			question: 'How long does it take to process an order?',
			answer:
				'Orders are typically processed within 1-2 business days. You will receive a confirmation email once your order has been processed and shipped.',
		},
		{
			question: 'Can I track the status of my shipment?',
			answer:
				'Yes, once your order has been shipped, you will receive a tracking number via email. You can use this number to track your shipment on our website or the carrier\'s website.',
		},
		{
			question: 'What is the estimated delivery time?',
			answer:
				'Delivery times vary depending on your location. Standard shipping typically takes 5-10 business days, while express shipping delivers within 2-4 business days.',
		},
	],
	'Product Information': [
		{
			question: 'What materials are used in your furniture?',
			answer:
				'We use high-quality materials including solid wood, engineered wood, premium fabrics, and genuine leather. Each product page lists the specific materials used.',
		},
		{
			question: 'Do you offer customization options?',
			answer:
				'Yes, we offer customization for select products including fabric color, wood finish, and dimensions. Contact our team for custom order inquiries.',
		},
		{
			question: 'How do I care for my furniture?',
			answer:
				'Care instructions vary by material. Generally, dust regularly with a soft cloth, avoid direct sunlight, and use appropriate cleaners for the specific material.',
		},
		{
			question: 'Are your products eco-friendly?',
			answer:
				'We are committed to sustainability. Many of our products use responsibly sourced materials and eco-friendly finishes. Look for our eco-friendly badge on qualifying products.',
		},
		{
			question: 'Do your products come with a warranty?',
			answer:
				'Yes, all our furniture comes with a minimum 1-year warranty against manufacturing defects. Premium collections include extended warranty options.',
		},
	],
	'Returns and Exchanges': [
		{
			question: 'What is your return policy?',
			answer:
				'We offer a 14-day return window for all products. Items must be in their original condition and packaging. Contact our support team to initiate a return.',
		},
		{
			question: 'How do I initiate a return or exchange?',
			answer:
				'To initiate a return, log into your account, go to your order history, and select the item you wish to return. Follow the prompts to generate a return label.',
		},
		{
			question: 'Who covers the return shipping costs?',
			answer:
				'If the return is due to a defect or error on our part, we cover the shipping costs. For other returns, the customer is responsible for return shipping.',
		},
		{
			question: 'How long does it take to process a refund?',
			answer:
				'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.',
		},
		{
			question: 'Can I exchange an item for a different color or size?',
			answer:
				'Yes, exchanges are available subject to stock availability. Contact our support team within 14 days of receiving your order to arrange an exchange.',
		},
	],
	'Payment and Billing': [
		{
			question: 'Is my payment information secure?',
			answer:
				'Absolutely. We use industry-standard SSL encryption and PCI-compliant payment processing to ensure your financial information is always protected.',
		},
		{
			question: 'Do you offer installment payment plans?',
			answer:
				'Yes, we offer installment plans through our financing partners. You can split your payment into 3, 6, or 12 monthly installments on qualifying orders.',
		},
		{
			question: 'Can I use multiple payment methods for one order?',
			answer:
				'Currently, we support one payment method per order. However, you can use gift cards in combination with another payment method.',
		},
		{
			question: 'How do I apply a discount code?',
			answer:
				'Enter your discount code in the promo code field during checkout and click "Apply". The discount will be reflected in your order total before payment.',
		},
		{
			question: 'Will I receive an invoice for my purchase?',
			answer:
				'Yes, a detailed invoice will be sent to your email after your order is confirmed. You can also download invoices from your account order history.',
		},
	],
};

const FaqPage = () => {
	const [activeCategory, setActiveCategory] = useState<string>(faqCategories[0]);
	const [openFaq, setOpenFaq] = useState<number>(0);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? -1 : index);
	};

	const currentFaqs = faqDataByCategory[activeCategory] || [];

	const filteredFaqs = searchQuery
		? currentFaqs.filter(
				(faq) =>
					faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
					faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
		  )
		: currentFaqs;

	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
		setOpenFaq(0);
		setSearchQuery('');
	};

	return (
		<Stack className="faq-page">
			<Stack className="faq-content" alignItems="center">
				<Typography className="faq-title" variant="h2">
					Frequently asked questions
				</Typography>

				<Stack className="faq-controls" alignItems="center">
					<Box className="faq-search">
						<SearchIcon className="search-icon" />
						<input
							type="text"
							placeholder="search your answer"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</Box>

					<Stack className="faq-categories" direction="row">
						{faqCategories.map((category) => (
							<Stack
								className={`category-item ${activeCategory === category ? 'active' : ''}`}
								key={category}
								direction="row"
								alignItems="center"
								onClick={() => handleCategoryChange(category)}
							>
								<Box className="category-radio">
									{activeCategory === category && <Box className="radio-dot" />}
								</Box>
								<Typography className="category-label">{category}</Typography>
							</Stack>
						))}
					</Stack>
				</Stack>

				<Box className="faq-list">
					{filteredFaqs.map((faq, index) => (
						<Box className={`faq-item ${openFaq === index ? 'active' : ''}`} key={index}>
							<Stack
								className="faq-question"
								direction="row"
								alignItems="center"
								justifyContent="space-between"
								onClick={() => toggleFaq(index)}
							>
								<Typography className="faq-q-text">{faq.question}</Typography>
								{openFaq === index ? (
									<SouthWestIcon className="faq-icon" />
								) : (
									<ArrowForwardIcon className="faq-icon" />
								)}
							</Stack>
							{openFaq === index && <Typography className="faq-answer">{faq.answer}</Typography>}
						</Box>
					))}
				</Box>
			</Stack>
		</Stack>
	);
};

export default FaqPage;
