import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useSessionStorage = <T,>(
	key: string,
	defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] => {
	const saved = window.sessionStorage.getItem(key);
	const [state, setState] = useState<T>(
		defaultValue ?? (saved && JSON.parse(saved))
	);

	useEffect(() => {
		window.sessionStorage.setItem(key, state ? JSON.stringify(state) : '');
	}, [key, state]);

	return [state, setState];
};
