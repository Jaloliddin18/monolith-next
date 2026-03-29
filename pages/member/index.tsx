import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import DesignerHero from '../../libs/components/designer/DesignerHero';
import DesignerListSection from '../../libs/components/designer/DesignerListSection';

const Designers = () => {
	return (
		<Stack className="designers-page">
			<DesignerHero />
			<DesignerListSection />
		</Stack>
	);
};

export default withLayoutBasic(Designers);
