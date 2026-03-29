import React from 'react';
import { Stack } from '@mui/material';

const specialties = [
	'Scandinavian Minimalism',
	'Sustainable Materials',
	'Ergonomic Design',
	'Custom Woodwork',
	'Space Optimization',
	'Luxury Interiors',
];

const achievements = [
	{ year: '2024', title: 'Designer of the Year — StyleCasa Awards' },
	{ year: '2023', title: 'Best Sustainable Collection — Green Furniture Expo' },
	{ year: '2022', title: 'Featured in Architectural Digest Top 40 Under 40' },
	{ year: '2020', title: 'Innovation Prize — Milan Furniture Fair' },
];

const DesignerAbout = () => {
	return (
		<Stack className="designer-about-section">
			<div className="designer-about-grid">
				{/* Left Column: Bio */}
				<div className="designer-about-bio">
					<h2 className="designer-section-title">About the Designer</h2>
					<p className="designer-about-text">
						Emily Nakamura is a furniture architect based in San Francisco, known for her
						distinctive blend of Japanese minimalism and Scandinavian functionality. With over
						8 years of experience in the furniture industry, she has established herself as a
						pioneer in sustainable luxury design.
					</p>
					<p className="designer-about-text">
						Her philosophy centers around the belief that furniture should tell a story — each
						piece she creates is a conversation between form, function, and the natural world.
						Emily sources materials from certified sustainable forests and collaborates with
						local artisans to bring her visions to life.
					</p>
					<p className="designer-about-text">
						When not designing, Emily teaches a masterclass on sustainable furniture design at
						the California College of the Arts and mentors emerging designers through her
						foundation, "Design for Tomorrow."
					</p>

					<div className="designer-about-quote">
						<span className="quote-mark">"</span>
						<p className="quote-text">
							Great furniture doesn't just fill a room — it transforms the way you live in it.
							Every curve, every joint, every grain of wood should serve a purpose.
						</p>
						<span className="quote-author">— Emily Nakamura</span>
					</div>
				</div>

				{/* Right Column: Specialties & Achievements */}
				<div className="designer-about-sidebar">
					<div className="designer-specialties">
						<h3 className="designer-sidebar-title">Specialties</h3>
						<div className="specialties-tags">
							{specialties.map((specialty) => (
								<span key={specialty} className="specialty-tag">
									{specialty}
								</span>
							))}
						</div>
					</div>

					<div className="designer-achievements">
						<h3 className="designer-sidebar-title">Achievements</h3>
						<div className="achievements-list">
							{achievements.map((item) => (
								<div key={item.year + item.title} className="achievement-item">
									<span className="achievement-year">{item.year}</span>
									<span className="achievement-title">{item.title}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Stack>
	);
};

export default DesignerAbout;
