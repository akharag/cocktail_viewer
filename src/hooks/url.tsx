import { useEffect, useState } from 'react';

const popStateEvent = new PopStateEvent('popstate', { state: null });

export const updateUrl = (path: string, title?: string) => {
	window.history.pushState(null, title ?? "Bartender's View", path);
	dispatchEvent(popStateEvent);
};

export const useReactPath = () => {
	const [path, setPath] = useState(window.location.pathname);

	const listenToPopstate = () => {
		const winPath = window.location.pathname;
		setPath(winPath);
	};
	useEffect(() => {
		window.addEventListener('popstate', listenToPopstate);
		return () => {
			window.removeEventListener('popstate', listenToPopstate);
		};
	}, []);
	return path;
};
