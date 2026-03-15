import React from 'react';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		return (
			<Stack id="pc-wrap">
				<Top />
				<Stack id="main">
					<Component {...props} />
				</Stack>
				<Footer />
			</Stack>
		);
	};
};

export default withLayoutBasic;
