import React from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const DEFAULT_IMAGE = '/general_images/hello_guy.jpg';

const followersData = [
	{ id: '1', image: DEFAULT_IMAGE, name: 'James Mitchell', followers: 12, followings: 5, likes: 3 },
	{ id: '2', image: DEFAULT_IMAGE, name: 'Sarah Kim', followers: 45, followings: 18, likes: 8 },
	{ id: '3', image: DEFAULT_IMAGE, name: 'David Chen', followers: 120, followings: 34, likes: 15 },
	{ id: '4', image: DEFAULT_IMAGE, name: 'Anna Rodriguez', followers: 8, followings: 22, likes: 1 },
	{ id: '5', image: DEFAULT_IMAGE, name: 'Robert Taylor', followers: 67, followings: 11, likes: 5 },
	{ id: '6', image: DEFAULT_IMAGE, name: 'Mia Johnson', followers: 230, followings: 45, likes: 22 },
	{ id: '7', image: DEFAULT_IMAGE, name: 'Carlos Rivera', followers: 15, followings: 9, likes: 0 },
	{ id: '8', image: DEFAULT_IMAGE, name: 'Nina Patel', followers: 89, followings: 27, likes: 11 },
];

const DesignerFollowersPanel = () => {
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`/member/detail?memberId=${id}`);
	};

	return (
		<Stack className="designer-followers-panel">
			<div className="member-list-header">
				<span className="member-list-col-name">Name</span>
				<span className="member-list-col-details">Details</span>
				<span className="member-list-col-action">Subscription</span>
			</div>
			<div className="member-list">
				{followersData.map((person) => (
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

export default DesignerFollowersPanel;
