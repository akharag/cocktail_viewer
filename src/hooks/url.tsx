import { useEffect, useState } from 'react';

const popStateEvent = new PopStateEvent('popstate', { state: null });

export const updateUrl = (path: string, title?: string) => {
	window.history.pushState(null, '', path);
	dispatchEvent(popStateEvent);
};

export const useAutoUpdateReactPath = () => {
	const [path, setPath] = useState(
		window.location.pathname.slice(1, window.location.pathname.length)
	);

	const listenToPopstate = () => {
		setPath(window.location.pathname.slice(1, window.location.pathname.length));
	};
	useEffect(() => {
		window.addEventListener('popstate', listenToPopstate);
		return () => {
			window.removeEventListener('popstate', listenToPopstate);
		};
	}, []);
	return path;
};

export const useReactPath = (): [
	path: string,
	setPath: React.Dispatch<React.SetStateAction<string>>
] => {
	const [path, setPath] = useState(window.location.pathname);

	useEffect(() => {
		window.history.pushState(path, '');
	}, [path]);

	return [path, setPath];
};
