import { useEffect, useState } from 'react';

export const useReactPath = (): [
	path: string,
	setPath: React.Dispatch<React.SetStateAction<string>>
] => {
	const [path, setPath] = useState(
		window.location.pathname.slice(1, window.location.pathname.length)
	);

	useEffect(() => {
		window.history.pushState(null, '', '/' + path);
	}, [path]);

	return [path, setPath];
};
