import { useState, useEffect } from 'react';

export const useFetchState = (url: string) => {
	const [state, setState] = useState<any>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | boolean>(false);

	useEffect(() => {
		const fetchState = async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setState(data);
			} catch (e) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchState();
	}, []);
};
