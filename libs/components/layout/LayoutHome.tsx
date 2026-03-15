import React from 'react';
import { Stack } from '@mui/material';
import Top from '../Top';
import Footer from '../Footer';

const withLayoutHome = (Component: any) => {
	return (props: any) => {
		return (
			<Stack id="pc-wrap">
				<Top />
				<Component {...props} />
				<Footer />
			</Stack>
		);
	};
};

export default withLayoutHome;
