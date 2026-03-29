import React from 'react';
import { Stack } from '@mui/material';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

const tags = [
	'WoodenFurniture',
	'SolidWoodFurniture',
	'NaturalWood',
	'HandcraftedFurniture',
	'RusticWoodFurniture',
	'WoodenHomeDecor',
	'Furniture Accessories',
	'Furniture Tips',
	'EcoFriendlyWoodFurniture',
	'Handcrafted',
	'SustainableWood',
	'VintageWoodFurniture',
	'FurnitureForOffice',
];

const ArticleContent = () => {
	return (
		<Stack className="article-content-section">
			{/* Article Header */}
			<div className="article-header">
				<div className="article-meta">
					<span className="article-badge">Furniture Trends</span>
					<span className="article-date">
						Published on <strong>July 25, 2023</strong>
					</span>
					<span className="article-author">
						, By <strong>Jordan Carlson</strong>
					</span>
				</div>
				<div className="article-share">
					<img src="/icons/FacebookLogo.svg" alt="Facebook" width={24} height={24} />
					<img src="/icons/InstagramLogo.svg" alt="Instagram" width={24} height={24} />
					<img src="/icons/YoutubeLogo.svg" alt="Youtube" width={24} height={24} />
					<img src="/icons/TwitterLogo.svg" alt="Twitter" width={24} height={24} />
				</div>
			</div>

			{/* Article Title */}
			<h1 className="article-title">
				Crafting Comfort: Wood Sofa Bed Furniture Project A Step-by-Step Guide
			</h1>

			{/* Article Image */}
			<div className="article-hero-image">
				<img src={DEFAULT_IMAGE} alt="Article hero" />
			</div>

			{/* Introduction */}
			<div className="article-block">
				<h3 className="article-subtitle">Introduction</h3>
				<p className="article-text">
					Welcome to the world of DIY furniture projects! In this blog, we will take you through the
					exciting process of creating your own wood sofa bed. Imagine the satisfaction of crafting a
					versatile and functional piece of furniture that offers both comfort and style.
				</p>
				<p className="article-text">
					We will guide you through the exciting journey of creating your very own wood sofa bed. A
					wood sofa bed is a versatile and practical addition to any living space, offering both
					comfort and functionality. Join us as we delve into the features, steps, and reviews of
					this rewarding DIY furniture project.
				</p>
			</div>

			{/* Features */}
			<div className="article-block">
				<h3 className="article-subtitle">Features of the Wood Sofa Bed</h3>
				<ul className="article-list">
					<li>
						<strong>Space-saving Design:</strong> A wood sofa bed is an excellent solution for
						compact living areas or guest rooms. It seamlessly transitions from a comfortable sofa
						during the day to a cozy bed at night, maximizing the functionality of your space.
					</li>
					<li>
						<strong>Durability and Strength:</strong> By using high-quality wood and reliable joinery
						techniques, your DIY wood sofa bed will be sturdy and long-lasting. You can trust in the
						craftsmanship and enjoy years of comfortable use.
					</li>
					<li>
						<strong>Customisation Options:</strong> With a DIY project, you have the freedom to
						personalise your wood sofa bed. Choose the wood type, upholstery fabric, and finish that
						align with your unique style and interior design preferences.
					</li>
				</ul>
			</div>

			{/* Steps */}
			<div className="article-steps-row">
				<div className="article-block">
					<h3 className="article-subtitle">Steps to Build a Wood Sofa Bed</h3>
					<ol className="article-list-numbered">
						<li>
							<strong>Planning and Design</strong> - Sketch out your desired design, considering the
							size, style, and functionality of your wood sofa bed. Make a list of the materials and
							tools required for the project.
						</li>
						<li>
							<strong>Material Selection</strong> - Choose high-quality wood, such as oak or maple,
							that can withstand regular use. Select upholstery fabric that complements your decor
							and offers comfort.
						</li>
						<li>
							<strong>Cutting and Assembly</strong> - Follow precise measurements and use accurate
							cutting tools to create the frame and components. Assemble the pieces using appropriate
							joinery techniques, ensuring stability and strength.
						</li>
						<li>
							<strong>Finishing Touches</strong> - Sand the surfaces for a smooth finish and apply a
							protective coating to enhance the wood&apos;s beauty. Upholster the sofa bed, paying
							attention to detail and ensuring a snug fit.
						</li>
						<li>
							<strong>Quality Assurance</strong> - Test the folding mechanism, stability, and overall
							functionality of the wood sofa bed. Make any necessary adjustments or reinforcements to
							ensure a reliable and comfortable final product.
						</li>
					</ol>
				</div>
				<div className="article-side-images">
					<div className="side-image">
						<img src={DEFAULT_IMAGE} alt="Step illustration 1" />
					</div>
					<div className="side-image">
						<img src={DEFAULT_IMAGE} alt="Step illustration 2" />
					</div>
				</div>
			</div>

			{/* Conclusion */}
			<div className="article-block">
				<h3 className="article-subtitle">Conclusion</h3>
				<p className="article-text">
					Embarking on a wood sofa bed furniture project is a fulfilling and rewarding endeavor. By
					following the step-by-step guide, you can create a custom-made piece that offers comfort,
					functionality, and a touch of elegance to your living space. The wood sofa bed project
					allows you to showcase your creativity and craftsmanship while enjoying the benefits of a
					versatile furniture item. Get ready to relax, entertain guests, or accommodate overnight
					visitors with your handmade wood sofa bed.
				</p>
			</div>

			{/* Related Tags */}
			<div className="article-block">
				<h3 className="article-subtitle">Related tags</h3>
				<div className="article-tags">
					{tags.map((tag) => (
						<span key={tag} className="article-tag">
							{tag}
						</span>
					))}
				</div>
			</div>
		</Stack>
	);
};

export default ArticleContent;
