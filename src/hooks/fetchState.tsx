import { useState, useEffect } from 'react';

export const useFetch = <T,>(
	url: string,
	opt?: RequestInit
): [T | undefined, unknown, boolean] => {
	const [data, setData] = useState<T | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<unknown>(false);

	useEffect(() => {
		const fetchState = async () => {
			try {
				const response = await fetch(url, opt);
				const data = await response.json();
				setData(data);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		};

		fetchState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [data, error, loading];
};
