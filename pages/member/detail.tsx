import React from 'react';
import { Stack } from '@mui/material';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import DesignerProfileHero from '../../libs/components/designer/DesignerProfileHero';
import DesignerAbout from '../../libs/components/designer/DesignerAbout';
import DesignerPortfolio from '../../libs/components/designer/DesignerPortfolio';
import DesignerComments from '../../libs/components/designer/DesignerComments';

const DesignerDetail = () => {
	return (
		<Stack className="designer-detail-page">
			<DesignerProfileHero />
			<DesignerAbout />
			<DesignerPortfolio />
			<DesignerComments />
		</Stack>
	);
};

export default withLayoutBasic(DesignerDetail);
