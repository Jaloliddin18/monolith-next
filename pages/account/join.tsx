import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { logIn, signUp } from '../../libs/auth';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Login from '../../libs/components/join/Login';
import Signup from '../../libs/components/join/Signup';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

const Join: NextPage = () => {
	const device = useDeviceDetect();
	const router = useRouter();

	// ── Desktop state ─────────────────────────────────────────────
	const [input, setInput] = useState({ nick: '', password: '', phone: '', type: 'USER' });
	const [loginView, setLoginView] = useState<boolean>(true);

	// ── Mobile-only state ─────────────────────────────────────────
	const [isSignup, setIsSignup] = useState(false);
	const [loginNick, setLoginNick] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [signupNick, setSignupNick] = useState('');
	const [signupPhone, setSignupPhone] = useState('');
	const [signupPassword, setSignupPassword] = useState('');
	const [signupType, setSignupType] = useState('USER');

	useEffect(() => {
		if (router.isReady && router.query.view === 'signup') {
			setLoginView(false);
			setIsSignup(true);
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

	const handleLogin = useCallback(async () => {
		try {
			await logIn(loginNick, loginPassword);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [loginNick, loginPassword]);

	const handleSignup = useCallback(async () => {
		try {
			await signUp(signupNick, signupPassword, signupPhone, signupType);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [signupNick, signupPassword, signupPhone, signupType]);

	if (!device) return null;

	if (device === 'mobile') {
		return (
			<Stack className="mobile-auth-page">
				{/* Toggle tabs */}
				<Stack direction="row" className="mobile-auth-tabs">
					<button
						className={`mobile-auth-tab ${!isSignup ? 'active' : ''}`}
						onClick={() => setIsSignup(false)}
					>
						Login
					</button>
					<button
						className={`mobile-auth-tab ${isSignup ? 'active' : ''}`}
						onClick={() => setIsSignup(true)}
					>
						Sign Up
					</button>
				</Stack>

				{/* LOGIN FORM */}
				{!isSignup && (
					<Stack className="mobile-auth-form">
						<Typography className="mobile-auth-title">Welcome Back</Typography>
						<Typography className="mobile-auth-subtitle">Sign in to your account</Typography>

						<Stack gap={2} mt={3}>
							<Stack gap={0.5}>
								<Typography className="mobile-field-label">Username</Typography>
								<input
									type="text"
									className="mobile-auth-input"
									placeholder="Enter your username"
									value={loginNick}
									onChange={(e) => setLoginNick(e.target.value)}
								/>
							</Stack>

							<Stack gap={0.5}>
								<Typography className="mobile-field-label">Password</Typography>
								<input
									type="password"
									className="mobile-auth-input"
									placeholder="Enter your password"
									value={loginPassword}
									onChange={(e) => setLoginPassword(e.target.value)}
								/>
							</Stack>

							<button className="mobile-auth-btn" onClick={handleLogin}>
								LOGIN
							</button>

							<Typography className="mobile-auth-switch" onClick={() => setIsSignup(true)}>
								Don't have an account? Sign Up
							</Typography>
						</Stack>
					</Stack>
				)}

				{/* SIGNUP FORM */}
				{isSignup && (
					<Stack className="mobile-auth-form">
						<Typography className="mobile-auth-title">Create Account</Typography>
						<Typography className="mobile-auth-subtitle">Join Monolith today</Typography>

						<Stack gap={2} mt={3}>
							<Stack gap={0.5}>
								<Typography className="mobile-field-label">Username</Typography>
								<input
									type="text"
									className="mobile-auth-input"
									placeholder="Choose a username"
									value={signupNick}
									onChange={(e) => setSignupNick(e.target.value)}
								/>
							</Stack>

							<Stack gap={0.5}>
								<Typography className="mobile-field-label">Phone</Typography>
								<input
									type="tel"
									className="mobile-auth-input"
									placeholder="Enter your phone number"
									value={signupPhone}
									onChange={(e) => setSignupPhone(e.target.value)}
								/>
							</Stack>

							<Stack gap={0.5}>
								<Typography className="mobile-field-label">Password</Typography>
								<input
									type="password"
									className="mobile-auth-input"
									placeholder="Create a password"
									value={signupPassword}
									onChange={(e) => setSignupPassword(e.target.value)}
								/>
							</Stack>

							<Stack gap={0.5}>
								<Typography className="mobile-field-label">Account Type</Typography>
								<select
									className="mobile-auth-input"
									value={signupType}
									onChange={(e) => setSignupType(e.target.value)}
								>
									<option value="USER">User</option>
									<option value="DESIGNER">Designer</option>
								</select>
							</Stack>

							<button className="mobile-auth-btn" onClick={handleSignup}>
								SIGN UP
							</button>

							<Typography className="mobile-auth-switch" onClick={() => setIsSignup(false)}>
								Already have an account? Login
							</Typography>
						</Stack>
					</Stack>
				)}
			</Stack>
		);
	}

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
