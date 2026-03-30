import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import DesignerHero from '../../libs/components/designer/DesignerHero';
import FeaturedDesigners from '../../libs/components/designer/FeaturedDesigners';
import DesignerListSection from '../../libs/components/designer/DesignerListSection';
import DesignerCTA from '../../libs/components/designer/DesignerCTA';

const Designers = () => {
	return (
		<Stack className="designers-page">
			<DesignerHero />
			<FeaturedDesigners />
			<DesignerListSection />
			<DesignerCTA />
		</Stack>
	);
};

export default withLayoutBasic(Designers);
