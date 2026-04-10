import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { logIn, signUp } from '../../libs/auth';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Login from '../../libs/components/join/Login';
import Signup from '../../libs/components/join/Signup';

const Join: NextPage = () => {
	const router = useRouter();
	const [input, setInput] = useState({ nick: '', password: '', phone: '', type: 'USER' });
	const [loginView, setLoginView] = useState<boolean>(true);

	useEffect(() => {
		if (router.isReady && router.query.view === 'signup') {
			setLoginView(false);
		}
	}, [router.isReady]);

	const checkUserTypeHandler = (e: any) => {
		const checked = e.target.checked;
		if (checked) {
			handleInput('type', e.target.name);
		} else {
			handleInput('type', 'USER');
		}
	};

	const handleInput = useCallback((name: string, value: string) => {
		setInput((prev) => ({ ...prev, [name]: value }));
	}, []);

	const doLogin = useCallback(async () => {
		try {
			await logIn(input.nick, input.password);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	const doSignUp = useCallback(async () => {
		try {
			await signUp(input.nick, input.password, input.phone, input.type);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	return loginView ? (
		<Login
			input={input}
			handleInput={handleInput}
			doLogin={doLogin}
			setLoginView={setLoginView}
		/>
	) : (
		<Signup
			input={input}
			handleInput={handleInput}
			doSignUp={doSignUp}
			setLoginView={setLoginView}
			checkUserTypeHandler={checkUserTypeHandler}
		/>
	);
};

export const getServerSideProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

export default withLayoutBasic(Join);
