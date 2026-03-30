import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const termsData = [
	{
		title: 'Acceptance of Terms',
		paragraphs: [
			'Users are informed that by accessing and using the Style Casa Wooden Furniture website or making a purchase, they are agreeing to the terms and conditions outlined in this agreement.',
			'Understanding of Terms: It is stated that users should carefully read and understand the terms and conditions before using the website or making any transactions. By continuing to use the website or making a purchase, users acknowledge that they have understood and accepted these terms.',
			'Legal Capacity: This section may specify that users must be of legal age or have the necessary legal capacity to enter into a contract. It may also mention that parents or guardians should supervise the use of the website by minors.',
			'Changes to Terms: It is stated that Style Casa Wooden Furniture reserves the right to modify or update the terms and conditions at any time. Users are advised to review the terms periodically to stay informed of any changes. Continued use of the website after changes indicate acceptance of the modified terms.',
			'Compliance with Laws: Users are required to comply with all applicable laws and regulations while using the Style Casa Wooden Furniture website. This includes respecting intellectual property rights, not engaging in fraudulent activities, and not violating any legal restrictions.',
			"Termination: The section may state that Style Casa Wooden Furniture has the right to terminate or suspend a user's access to the website if they violate the terms and conditions or engage in any prohibited activities.",
			'Severability: This provision states that if any part of the terms and conditions is deemed unenforceable or invalid, it will not affect the validity of the remaining provisions.',
			'Governing Law and Jurisdiction: It may specify the governing law and jurisdiction that applies to any disputes arising from the use of the website or the interpretation of the terms and conditions.',
			'The "Acceptance of Terms" section is important to establish the legal agreement between Style Casa Wooden Furniture and its users, ensuring that users are aware of and agree to the terms and conditions governing their use of the website and any associated services or purchases.',
		],
	},
	{
		title: 'Product Information',
		paragraphs: [
			'Style Casa Wooden Furniture provides detailed product information on its website, including descriptions, dimensions, materials, and images. While we strive to ensure accuracy, slight variations may occur due to photography, display settings, or manufacturing processes.',
			'Product Availability: All products listed on the website are subject to availability. Style Casa Wooden Furniture reserves the right to discontinue any product without prior notice.',
			'Pricing: Product prices are displayed in the applicable currency and are subject to change without notice. Prices do not include shipping fees, taxes, or other applicable charges unless explicitly stated.',
		],
	},
	{
		title: 'Ordering and Payment',
		paragraphs: [
			'Orders can be placed through our website by adding items to the cart and completing the checkout process. An order confirmation will be sent via email upon successful placement.',
			'Payment Methods: We accept major credit cards, debit cards, PayPal, and bank transfers. All payments are processed securely through encrypted channels.',
			'Order Confirmation: Once an order is placed, you will receive a confirmation email with your order details. This does not guarantee acceptance of the order. We reserve the right to cancel any order due to stock unavailability or pricing errors.',
		],
	},
	{
		title: 'Pricing and Promotions',
		paragraphs: [
			'All prices listed on the Style Casa Wooden Furniture website are in the applicable currency and include VAT where required. Prices are subject to change without prior notice.',
			'Promotional Offers: From time to time, Style Casa may offer promotional discounts or special deals. These promotions are subject to specific terms and conditions and may have limited availability.',
			'Price Matching: Style Casa does not offer price matching with other retailers or websites.',
		],
	},
	{
		title: 'Shipping and Delivery',
		paragraphs: [
			'Style Casa Wooden Furniture offers shipping to select locations. Delivery times vary depending on the destination and product availability.',
			'Shipping Costs: Shipping fees are calculated at checkout based on the delivery address and order size. Free shipping may be available for orders above a specified amount.',
			'Delivery Timeframes: Estimated delivery times are provided at checkout. While we strive to meet these estimates, delays may occur due to unforeseen circumstances.',
		],
	},
	{
		title: 'Returns and Refunds',
		paragraphs: [
			'Style Casa Wooden Furniture offers a 14-day return policy for most products. Items must be returned in their original condition and packaging.',
			'Refund Process: Once the returned item is received and inspected, a refund will be processed to the original payment method within 5-7 business days.',
			'Non-Returnable Items: Certain items, including custom-made furniture and clearance items, may not be eligible for return. Please check the product page for specific return eligibility.',
		],
	},
	{
		title: 'Intellectual Property',
		paragraphs: [
			'All content on the Style Casa Wooden Furniture website, including text, images, logos, and designs, is the intellectual property of Style Casa and is protected by applicable copyright and trademark laws.',
			'Unauthorized use, reproduction, or distribution of any content from the website is strictly prohibited without prior written consent from Style Casa Wooden Furniture.',
		],
	},
	{
		title: 'Privacy and Data Protection',
		paragraphs: [
			'Style Casa Wooden Furniture is committed to protecting user privacy. Personal information collected during registration, ordering, or browsing is handled in accordance with our Privacy Policy.',
			'Data Security: We implement industry-standard security measures to protect personal data from unauthorized access, disclosure, or misuse.',
			'Cookies: Our website uses cookies to enhance user experience. By continuing to use the website, users consent to the use of cookies as described in our Cookie Policy.',
		],
	},
	{
		title: 'Limitation of Liability',
		paragraphs: [
			'Style Casa Wooden Furniture shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.',
			'Product Warranties: While we strive to provide high-quality products, Style Casa makes no warranties, express or implied, regarding the suitability of products for a particular purpose.',
			'Force Majeure: Style Casa shall not be held responsible for delays or failures in performance resulting from events beyond our reasonable control, including natural disasters, strikes, or government actions.',
		],
	},
	{
		title: 'Governing Law and Jurisdiction',
		paragraphs: [
			'These terms and conditions are governed by and construed in accordance with the laws of the applicable jurisdiction. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in the specified region.',
			'Dispute Resolution: In the event of a dispute, users are encouraged to contact Style Casa Wooden Furniture directly to seek an amicable resolution before pursuing legal action.',
		],
	},
];

const TermsPage = () => {
	const [activeSection, setActiveSection] = useState<number>(0);

	return (
		<Stack className="terms-page">
			<Stack className="terms-content">
				<Stack className="terms-header" direction="row" alignItems="flex-start" justifyContent="space-between">
					<Box>
						<Typography className="terms-title" variant="h2">
							Terms and Condition
						</Typography>
						<Typography className="terms-date">Updated April 01, 2023</Typography>
					</Box>
					<Stack className="need-help" direction="row" alignItems="center">
						<InfoOutlinedIcon className="help-icon" />
						<Typography className="help-text">Need help?</Typography>
					</Stack>
				</Stack>

				<Stack className="terms-body" direction="row">
					<Box className="terms-sidebar">
						<ol className="sidebar-list">
							{termsData.map((section, index) => (
								<li
									key={index}
									className={`sidebar-item ${activeSection === index ? 'active' : ''}`}
									onClick={() => setActiveSection(index)}
								>
									{section.title}
								</li>
							))}
						</ol>
					</Box>

					<Box className="terms-detail">
						<Typography className="detail-title">
							{activeSection + 1}. {termsData[activeSection].title}
						</Typography>
						{termsData[activeSection].paragraphs.map((paragraph, index) => (
							<Typography className="detail-paragraph" key={index}>
								{paragraph}
							</Typography>
						))}
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TermsPage;
