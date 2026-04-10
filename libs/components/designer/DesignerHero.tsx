import React from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';

const DesignerHero = () => {
	const { t } = useTranslation('common');

	return (
		<Stack className="designer-hero">
			<div className="designer-hero-content">
				<span className="designer-hero-label">{t('designersLabel')}</span>
				<h1 className="designer-hero-title">{t('designersTitle')}</h1>
				<p className="designer-hero-desc">{t('designersDesc')}</p>
			</div>
		</Stack>
	);
};

export default DesignerHero;
