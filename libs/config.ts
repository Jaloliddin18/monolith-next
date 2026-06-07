export const REACT_APP_API_URL = process.env.REACT_APP_API_URL as string;
export const REACT_APP_API_GRAPHQL_URL = process.env.REACT_APP_API_GRAPHQL_URL as string;
export const REACT_APP_API_WS = process.env.REACT_APP_API_WS as string;

const LOCAL_ASSET_PREFIXES = ['/img/', '/icons/', '/general_images/'];

export const resolveAssetUrl = (assetPath?: string | null, fallback = ''): string => {
	if (!assetPath) return fallback;
	if (
		LOCAL_ASSET_PREFIXES.some((prefix) => assetPath.startsWith(prefix)) ||
		assetPath.startsWith('http://') ||
		assetPath.startsWith('https://')
	) {
		return assetPath;
	}
	return `${REACT_APP_API_URL}/${assetPath}`;
};

export const Messages = {
	NOT_AUTHENTICATED: 'You are not authenticated. Please login first!',
	SOMETHING_WENT_WRONG: 'Something went wrong!',
	error4: 'Message is empty!',
};
