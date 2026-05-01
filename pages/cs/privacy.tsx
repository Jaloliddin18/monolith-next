import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import PrivacyPage from '../../libs/components/cs/PrivacyPage';

const Privacy = () => <PrivacyPage />;

export const getServerSideProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(Privacy);
