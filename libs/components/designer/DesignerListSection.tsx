import React from 'react';
import { Stack, Pagination } from '@mui/material';
import DesignerCard from '../common/DesignerCard';
import { Member } from '../../types/member/member';
import { REACT_APP_API_URL } from '../../config';

const DEFAULT_IMAGE = '/general_images/default_profile.png';

interface DesignerListSectionProps {
	designers: Member[];
	total: number;
	page: number;
	limit: number;
	onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const DesignerListSection = ({ designers, total, page, limit, onPageChange }: DesignerListSectionProps) => {
	const pageCount = Math.ceil(total / limit);

	return (
		<Stack className="designer-list-section">
			<div className="designer-grid">
				{designers.map((designer) => (
					<DesignerCard
						key={designer._id}
						id={designer._id}
						image={
							designer.memberImage
								? `${REACT_APP_API_URL}/${designer.memberImage}`
								: DEFAULT_IMAGE
						}
						name={designer.memberFullName ?? designer.memberNick}
						role={designer.memberAddress ?? 'Designer'}
						designs={designer.memberDesigns}
						followers={designer.memberFollowers}
					/>
				))}
			</div>
			{pageCount > 1 && (
				<div className="designer-pagination">
					<Pagination
						count={pageCount}
						page={page}
						onChange={onPageChange}
						shape="rounded"
						siblingCount={1}
						boundaryCount={1}
					/>
				</div>
			)}
		</Stack>
	);
};

export default DesignerListSection;
