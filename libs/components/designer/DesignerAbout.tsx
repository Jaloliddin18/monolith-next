import React from 'react';
import { Stack } from '@mui/material';
import { Member } from '../../types/member/member';

const specialties = [
	'Scandinavian Minimalism',
	'Sustainable Materials',
	'Ergonomic Design',
	'Custom Woodwork',
	'Space Optimization',
	'Luxury Interiors',
];

const achievements = [
	{ year: '2024', title: 'Designer of the Year — MONOLITH Awards' },
	{ year: '2023', title: 'Best Sustainable Collection — Green Furniture Expo' },
	{ year: '2022', title: 'Featured in Architectural Digest Top 40 Under 40' },
	{ year: '2020', title: 'Innovation Prize — Milan Furniture Fair' },
];

interface DesignerAboutProps {
	member?: Member | null;
}

const DesignerAbout = ({ member }: DesignerAboutProps) => {
	const name = member?.memberFullName ?? member?.memberNick ?? 'This Designer';
	const desc = member?.memberDesc;

	return (
		<Stack className="designer-about-section">
			<div className="designer-about-grid">
				{/* Left Column: Bio */}
				<div className="designer-about-bio">
					<h2 className="designer-section-title">About the Designer</h2>
					{desc ? (
						<p className="designer-about-text">{desc}</p>
					) : (
						<p className="designer-about-text">
							{name} is a furniture designer on MONOLITH, crafting unique pieces that blend
							functionality with aesthetic excellence.
						</p>
					)}

					<div className="designer-about-quote">
						<span className="quote-mark">"</span>
						<p className="quote-text">
							Great furniture doesn't just fill a room — it transforms the way you live in it.
							Every curve, every joint, every grain of wood should serve a purpose.
						</p>
						<span className="quote-author">— {name}</span>
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
