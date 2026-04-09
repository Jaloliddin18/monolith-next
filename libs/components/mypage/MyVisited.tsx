import React, { ChangeEvent, useState } from 'react';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_VISITED } from '../../../apollo/user/query';
import { OrdinaryInquiry } from '../../types/furniture/furniture.input';
import { Furniture } from '../../types/furniture/furniture';
import { T } from '../../types/common';
import ProductCard from '../common/ProductCard';

const DEFAULT_INPUT: OrdinaryInquiry = { page: 1, limit: 9 };

const MyVisited = () => {
	const [inquiry, setInquiry] = useState<OrdinaryInquiry>(DEFAULT_INPUT);
	const [visited, setVisited] = useState<Furniture[]>([]);
	const [total, setTotal] = useState(0);

	const { refetch } = useQuery(GET_VISITED, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inquiry },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setVisited(data?.getVisited?.list ?? []);
			setTotal(data?.getVisited?.metaCounter?.[0]?.total ?? 0);
		},
	});

	const paginationHandler = (_e: ChangeEvent<unknown>, page: number) => {
		const updated = { ...inquiry, page };
		setInquiry(updated);
		refetch({ input: updated });
	};

	return (
		<Stack className="visited-content">
			<Typography className="content-title">Recently Visited</Typography>

			{visited.length === 0 ? (
				<Typography className="no-data-text">No recently visited items.</Typography>
			) : (
				<Box className="visited-grid">
					{visited.map((furniture: Furniture) => (
						<ProductCard key={furniture._id} furniture={furniture} />
					))}
				</Box>
			)}

			{total > 9 && (
				<Stack alignItems="center" mt="32px">
					<Pagination
						page={inquiry.page}
						count={Math.ceil(total / inquiry.limit)}
						onChange={paginationHandler}
						shape="rounded"
						color="primary"
					/>
				</Stack>
			)}
		</Stack>
	);
};

export default MyVisited;
