import { makeVar } from '@apollo/client';
import { CustomJwtPayload } from '../libs/types/customJwtPayload';

export const userVar = makeVar<CustomJwtPayload>({
	_id: '',
	memberType: '',
	memberStatus: '',
	memberAuthType: '',
	memberNick: '',
	memberImage: '/img/profile/defaultUser.svg',
	memberFurnitures: 0,
	memberRank: 0,
});

export const socketVar = makeVar<WebSocket | null>(null);
