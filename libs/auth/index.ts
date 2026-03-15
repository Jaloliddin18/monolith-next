import { jwtDecode } from 'jwt-decode';
import { initializeApollo, getJwtToken } from '../../apollo/client';
import { userVar } from '../../apollo/store';
import { CustomJwtPayload } from '../types/customJwtPayload';
import { LOGIN } from '../../apollo/user/mutation';
import { sweetErrorAlert } from '../sweetAlert';

export function setJwtToken(token: string) {
	localStorage.setItem('accessToken', token);
}

export function updateStorage(data: { jwtToken: string }) {
	setJwtToken(data.jwtToken);
	localStorage.setItem('login', Date.now().toString());
}

export function deleteStorage() {
	localStorage.removeItem('accessToken');
	localStorage.setItem('logout', Date.now().toString());
}

export function updateUserInfo(jwtToken: any) {
	if (!jwtToken) return;
	try {
		const claims = jwtDecode<CustomJwtPayload>(jwtToken);
		userVar({
			_id: claims._id ?? '',
			memberType: claims.memberType ?? '',
			memberStatus: claims.memberStatus ?? '',
			memberAuthType: claims.memberAuthType ?? '',
			memberNick: claims.memberNick ?? '',
			memberImage: claims.memberImage ?? '/img/profile/defaultUser.svg',
			memberFurnitures: claims.memberFurnitures ?? 0,
			memberRank: claims.memberRank ?? 0,
		});
	} catch (err) {
		console.error('JWT decode error:', err);
	}
}

export function deleteUserInfo() {
	userVar({
		_id: '',
		memberType: '',
		memberStatus: '',
		memberAuthType: '',
		memberNick: '',
		memberImage: '/img/profile/defaultUser.svg',
		memberFurnitures: 0,
		memberRank: 0,
	});
}

export const logIn = async (nick: string, password: string): Promise<void> => {
	try {
		const client = initializeApollo();
		const result = await client.mutate({
			mutation: LOGIN,
			variables: { input: { memberNick: nick, memberPassword: password } },
			fetchPolicy: 'network-only',
		});
		const jwtToken = result?.data?.login?.accessToken;
		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken);
		}
	} catch (err: any) {
		sweetErrorAlert(err.message);
		logOut();
	}
};

export const logOut = () => {
	deleteStorage();
	deleteUserInfo();
	window.location.reload();
};

export { getJwtToken };
