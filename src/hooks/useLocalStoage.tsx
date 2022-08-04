import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useLocalStorage = <T,>(
	key: string,
	defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
	const saved = window.localStorage.getItem(key);
	const [state, setState] = useState<T>(
		defaultValue ?? (saved && JSON.parse(saved))
	);

	useEffect(() => {
		window.localStorage.setItem(key, state ? JSON.stringify(state) : '');
	}, [key, state]);

	return [state, setState];
};
