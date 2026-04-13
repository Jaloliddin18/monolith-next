import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UNSUBSCRIBE_NEWSLETTER } from '../../apollo/user/mutation';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextPage } from 'next';

const UnsubscribePage: NextPage = () => {
	const router = useRouter();
	const { token } = router.query;
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [message, setMessage] = useState('');
	const [countdown, setCountdown] = useState(5);
	const [unsubscribe] = useMutation(UNSUBSCRIBE_NEWSLETTER);

	useEffect(() => {
		if (!token || typeof token !== 'string') return;
		setStatus('loading');
		unsubscribe({ variables: { input: { unsubscribeToken: token } } })
			.then(() => {
				setStatus('success');
				setMessage('You have been successfully unsubscribed.');
			})
			.catch((err: any) => {
				setStatus('error');
				setMessage(err.message || 'Invalid or expired unsubscribe link.');
			});
	}, [token]);

	useEffect(() => {
		if (status !== 'success') return;
		if (countdown === 0) {
			router.push('/');
			return;
		}
		const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
		return () => clearTimeout(timer);
	}, [status, countdown]);

	return (
		<Stack
			id="unsubscribe-page"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: '40vh', gap: '16px' }}
		>
			{status === 'idle' && <Typography>Processing your request…</Typography>}
			{status === 'loading' && <Typography>Unsubscribing…</Typography>}
			{status === 'success' && (
				<>
					<Typography variant="h5" color="success.main">
						{message}
					</Typography>
					<Typography>You will no longer receive newsletter emails from us.</Typography>
					<Typography sx={{ color: '#999', fontSize: '14px' }}>
						Redirecting in {countdown}…
					</Typography>
				</>
			)}
			{status === 'error' && (
				<Typography variant="h6" color="error">
					{message}
				</Typography>
			)}
		</Stack>
	);
};

export const getServerSideProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(UnsubscribePage);
