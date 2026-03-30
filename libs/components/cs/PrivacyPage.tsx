import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface PrivacySection {
	title: string;
	intro?: string;
	bullets?: { label: string; text: string }[];
	conclusion?: string;
}

const privacyData: PrivacySection[] = [
	{
		title: 'Introduction',
		intro:
			'The term "Acceptance of Terms" refers to the agreement and acknowledgment by users or customers of Style Casa Wooden Furniture that they accept and will comply with the terms and conditions outlined by the company. By accessing the Style Casa website or making a purchase, users are bound by these terms and conditions.',
		bullets: [
			{
				label: 'Purpose',
				text: 'The Introduction section clarifies the purpose of the Privacy Policy, which is to inform users about how Style Casa collects, uses, and protects their personal information when they interact with the website or make use of its services.',
			},
			{
				label: 'Compliance',
				text: 'It may state that Style Casa is committed to complying with relevant privacy laws and regulations, ensuring that user information is handled lawfully and ethically.',
			},
			{
				label: 'User Consent',
				text: 'The section may highlight that by accessing and using the Style Casa website or services, users are deemed to have consented to the collection, use, and processing of their personal information as outlined in the Privacy Policy.',
			},
			{
				label: 'Payment Methods',
				text: 'accepts various payment methods, including credit/debit cards, online banking, and other authorized payment gateways. Customers should ensure that they provide accurate payment details and have sufficient funds to complete the transaction.',
			},
			{
				label: 'Scope',
				text: 'It outlines the scope of the Privacy Policy, indicating that it applies to all users of the Style Casa website and services, regardless of whether they are registered users, customers, or simply visitors.',
			},
			{
				label: 'Acceptance of the Policy',
				text: "This section often mentions that by continuing to use the Style Casa website or services, users signify their acceptance and agreement with the Privacy Policy. It may encourage users to read the entire policy carefully to understand their rights and obligations.",
			},
		],
		conclusion:
			"The Introduction sets the tone for the Privacy Policy and helps users understand the purpose and importance of protecting their privacy when interacting with Style Casa Wooden Furniture. It's essential for users to review and understand the Privacy Policy to make informed decisions regarding their personal information and privacy rights.",
	},
	{
		title: 'Information Collection',
		intro:
			'Style Casa Wooden Furniture collects various types of information from users to provide and improve its services.',
		bullets: [
			{
				label: 'Personal Information',
				text: 'We may collect personal details such as name, email address, phone number, shipping address, and billing information when you create an account or make a purchase.',
			},
			{
				label: 'Usage Data',
				text: 'We automatically collect information about how you interact with our website, including pages visited, time spent, and browsing patterns.',
			},
			{
				label: 'Device Information',
				text: 'We may collect information about the device you use to access our website, including IP address, browser type, and operating system.',
			},
		],
	},
	{
		title: 'Use of Information',
		intro: 'The information collected is used for the following purposes:',
		bullets: [
			{
				label: 'Order Processing',
				text: 'To process and fulfill your orders, including shipping and delivery notifications.',
			},
			{
				label: 'Customer Service',
				text: 'To respond to your inquiries, provide support, and resolve any issues related to your purchases.',
			},
			{
				label: 'Personalization',
				text: 'To personalize your shopping experience and provide product recommendations based on your preferences and browsing history.',
			},
		],
	},
	{
		title: 'Information Sharing',
		intro:
			'Style Casa does not sell or rent personal information to third parties. However, we may share information in the following circumstances:',
		bullets: [
			{
				label: 'Service Providers',
				text: 'We may share information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders.',
			},
			{
				label: 'Legal Requirements',
				text: 'We may disclose personal information when required by law or in response to valid legal requests from authorities.',
			},
		],
	},
	{
		title: 'Data Security',
		intro:
			'Style Casa implements industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.',
		bullets: [
			{
				label: 'Encryption',
				text: 'All sensitive data is transmitted using SSL encryption to ensure secure communication between your browser and our servers.',
			},
			{
				label: 'Access Controls',
				text: 'Access to personal information is restricted to authorized personnel only, who are required to maintain confidentiality.',
			},
		],
	},
	{
		title: 'Data Retention',
		intro:
			'We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.',
		bullets: [
			{
				label: 'Account Data',
				text: 'Account information is retained for as long as your account remains active or as needed to provide you services.',
			},
			{
				label: 'Transaction Records',
				text: 'Transaction data may be retained for a period required by applicable tax and accounting regulations.',
			},
		],
	},
	{
		title: 'User Rights',
		intro: 'Users have the following rights regarding their personal information:',
		bullets: [
			{
				label: 'Access',
				text: 'You have the right to request access to the personal information we hold about you.',
			},
			{
				label: 'Correction',
				text: 'You may request that we correct any inaccurate or incomplete personal information.',
			},
			{
				label: 'Deletion',
				text: 'You may request the deletion of your personal information, subject to certain legal obligations.',
			},
		],
	},
	{
		title: 'Cookies and Tracking Technologies',
		intro:
			'Our website uses cookies and similar tracking technologies to enhance your browsing experience.',
		bullets: [
			{
				label: 'Essential Cookies',
				text: 'These cookies are necessary for the website to function properly and cannot be disabled.',
			},
			{
				label: 'Analytics Cookies',
				text: 'These help us understand how visitors interact with our website by collecting and reporting information anonymously.',
			},
			{
				label: 'Marketing Cookies',
				text: 'These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.',
			},
		],
	},
	{
		title: 'Marketing Communications',
		intro:
			'With your consent, we may send you promotional emails about new products, special offers, or other information we think you may find interesting.',
		bullets: [
			{
				label: 'Opt-Out',
				text: 'You can opt out of receiving marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.',
			},
		],
	},
	{
		title: "Children's Privacy",
		intro:
			'Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it promptly.',
	},
	{
		title: 'Changes to the Privacy Policy',
		intro:
			'Style Casa reserves the right to update or modify this Privacy Policy at any time. We will notify users of significant changes by posting a notice on our website. Continued use of the website after changes constitutes acceptance of the updated policy.',
	},
	{
		title: 'Contact Information',
		intro:
			'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at stylecasa@help.com or through the contact form on our website.',
	},
];

const PrivacyPage = () => {
	const [activeSection, setActiveSection] = useState<number>(0);
	const section = privacyData[activeSection];

	return (
		<Stack className="privacy-page">
			<Stack className="privacy-content">
				<Stack className="privacy-header" direction="row" alignItems="flex-start" justifyContent="space-between">
					<Box>
						<Typography className="privacy-title" variant="h2">
							Privacy Policy
						</Typography>
						<Typography className="privacy-date">Updated April 01, 2023</Typography>
					</Box>
					<Stack className="need-help" direction="row" alignItems="center">
						<InfoOutlinedIcon className="help-icon" />
						<Typography className="help-text">Need help?</Typography>
					</Stack>
				</Stack>

				<Stack className="privacy-body" direction="row">
					<Box className="privacy-sidebar">
						<ol className="sidebar-list">
							{privacyData.map((s, index) => (
								<li
									key={index}
									className={`sidebar-item ${activeSection === index ? 'active' : ''}`}
									onClick={() => setActiveSection(index)}
								>
									{s.title}
								</li>
							))}
						</ol>
					</Box>

					<Box className="privacy-detail">
						<Typography className="detail-title">
							{activeSection + 1}. {section.title}
						</Typography>

						{section.intro && <Typography className="detail-paragraph">{section.intro}</Typography>}

						{section.bullets && (
							<ul className="detail-bullets">
								{section.bullets.map((bullet, index) => (
									<li key={index}>
										<span className="bullet-label">{bullet.label} : </span>
										<span className="bullet-text">{bullet.text}</span>
									</li>
								))}
							</ul>
						)}

						{section.conclusion && <Typography className="detail-paragraph">{section.conclusion}</Typography>}
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PrivacyPage;
