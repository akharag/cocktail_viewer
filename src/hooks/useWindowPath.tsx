import { useEffect, useState, Dispatch, SetStateAction } from 'react';

let currentPath = window.location.pathname.slice(
	1,
	window.location.pathname.length
);

export const useWindowPath = (): [
	path: string,
	setPath: Dispatch<SetStateAction<string>>
] => {
	const [path, setPath] = useState(currentPath);
	useEffect(() => {
		if (path !== currentPath) {
			window.history.replaceState(null, '', '/' + path);
			currentPath = window.location.pathname.slice(
				1,
				window.location.pathname.length
			);
		}
	}, [path]);
	return [path, setPath];
};
