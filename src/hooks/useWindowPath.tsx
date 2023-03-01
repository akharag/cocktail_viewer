import { useState } from 'react';

let currentPath = window.location.pathname.slice(
	1,
	window.location.pathname.length
);

export const useWindowPath = (): [
	path: string,
	setPath: (newPath: string) => void
] => {
	const [path, setPath] = useState(currentPath);

	const setNewPath = (newPath: string) => {
		if (path !== newPath) {
			console.log('change', newPath);
			setPath(newPath);
			window.history.replaceState(null, '', '/' + newPath);
		}
	};

	return [path, setNewPath];
};
