import { useState, useEffect } from 'react';

const useDeviceDetect = (): string | null => {
	const [device, setDevice] = useState<string | null>(null);

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
			window.innerWidth <= 768;
		setDevice(isMobile ? 'mobile' : 'desktop');
	}, []);

	return device;
};

export default useDeviceDetect;
