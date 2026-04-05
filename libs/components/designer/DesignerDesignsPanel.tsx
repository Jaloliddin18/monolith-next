import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_FURNITURES } from '../../../apollo/user/query';
import { Furniture } from '../../types/furniture/furniture';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';
import DesignerAbout from './DesignerAbout';
import { Member } from '../../types/member/member';

const DEFAULT_IMAGE = '/img/furniture/luxury_chair.jpg';

interface DesignerDesignsPanelProps {
	memberId: string;
	member?: Member | null;
}

const DesignerDesignsPanel = ({ memberId, member }: DesignerDesignsPanelProps) => {
	const [furnitures, setFurnitures] = useState<Furniture[]>([]);

	const inquiry: FurnituresInquiry = {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		search: { memberId },
	};

	useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		skip: !memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFurnitures(data?.getFurnitures?.list ?? []);
		},
	});

	return (
		<Stack className="designer-designs-panel">
			<DesignerAbout member={member} />
			<div className="designs-panel-header">
				<h2 className="designs-panel-title">Furniture Collection</h2>
				<p className="designs-panel-subtitle">
					A curated selection of this designer's most celebrated furniture designs
				</p>
			</div>
			<div className="designs-panel-grid">
				{furnitures.map((item) => {
					const image = item.furnitureImages?.[0]
						? `${REACT_APP_API_URL}/${item.furnitureImages[0]}`
						: DEFAULT_IMAGE;
					const year = item.createdAt
						? new Date(item.createdAt).getFullYear().toString()
						: '';
					return (
						<div key={item._id} className="design-item-card">
							<div className="design-item-image">
								<img src={image} alt={item.furnitureTitle} />
								<div className="design-item-overlay">
									<span className="design-item-category">{item.furnitureCategory}</span>
								</div>
							</div>
							<div className="design-item-info">
								<div className="design-item-top">
									<h4 className="design-item-title">{item.furnitureTitle}</h4>
									<span className="design-item-year">{year}</span>
								</div>
								<span className="design-item-price">
									${item.furniturePrice?.toLocaleString()}
								</span>
							</div>
						</div>
					);
				})}
				{furnitures.length === 0 && (
					<p style={{ color: 'var(--color-text-muted)', gridColumn: '1/-1' }}>
						No designs published yet.
					</p>
				)}
			</div>
		</Stack>
	);
};

export default DesignerDesignsPanel;
