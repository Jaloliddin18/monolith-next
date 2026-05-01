import { useEffect } from 'react';
import { useRouter } from 'next/router';

const FaqRedirect = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace('/_admin/cs/notice');
	}, [router]);
	return null;
};

export default FaqRedirect;
