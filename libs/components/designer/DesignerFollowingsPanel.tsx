import React from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const DEFAULT_IMAGE = '/general_images/hello_guy.jpg';

const followingsData = [
	{ id: '1', image: DEFAULT_IMAGE, name: 'Marcus Johansson', followers: 890, followings: 42, likes: 35 },
	{ id: '2', image: DEFAULT_IMAGE, name: 'Sofia Petrov', followers: 2100, followings: 67, likes: 48 },
	{ id: '3', image: DEFAULT_IMAGE, name: 'Henrik Larsson', followers: 1920, followings: 31, likes: 27 },
	{ id: '4', image: DEFAULT_IMAGE, name: 'Isla Fernandez', followers: 1050, followings: 55, likes: 19 },
	{ id: '5', image: DEFAULT_IMAGE, name: 'Daniel Kim', followers: 740, followings: 28, likes: 12 },
	{ id: '6', image: DEFAULT_IMAGE, name: 'Amara Osei', followers: 1580, followings: 39, likes: 41 },
];

const DesignerFollowingsPanel = () => {
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`/member/detail?memberId=${id}`);
	};

	return (
		<Stack className="designer-followings-panel">
			<div className="member-list-header">
				<span className="member-list-col-name">Name</span>
				<span className="member-list-col-details">Details</span>
				<span className="member-list-col-action">Subscription</span>
			</div>
			<div className="member-list">
				{followingsData.map((person) => (
					<div key={person.id} className="member-list-row" onClick={() => handleClick(person.id)}>
						<div className="member-list-name">
							<div className="member-list-avatar">
								<img src={person.image} alt={person.name} />
							</div>
							<span className="member-list-nick">{person.name}</span>
						</div>
						<div className="member-list-details">
							<span className="member-detail-item">
								<strong>Followers</strong> ({person.followers})
							</span>
							<span className="member-detail-item">
								<strong>Followings</strong> ({person.followings})
							</span>
							<span className="member-detail-item">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
									<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
								</svg>
								({person.likes})
							</span>
						</div>
						<div className="member-list-action">
							<button
								className="member-follow-btn"
								type="button"
								onClick={(e) => e.stopPropagation()}
							>
								Follow
							</button>
						</div>
					</div>
				))}
			</div>
		</Stack>
	);
};

export default DesignerFollowingsPanel;
