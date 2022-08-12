import { useCallback, useEffect, useState } from 'react';

const useFetchState = <T,>(
	input: RequestInfo,
	init?: RequestInit | undefined,
	defaultValue?: T,
	//function used when the fetch fails to try to resolve setData
	catchErrorCallback?: (err: any) => T | undefined
) => {
	const [data, setData] = useState<Promise<T> | T | undefined>(defaultValue);

	const CatchError = (err: any) => {
		if (catchErrorCallback) {
			const res = catchErrorCallback(err);
			//won't gurantee that callback returns type of T at runtime
			if (res !== undefined || res !== null) {
				setData(res);
			}
		}
	};
	const CatchErrorCallback = useCallback(CatchError, [CatchError]);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetch(input, { ...init, signal })
			.then((res) => res.json)
			.then((data) => setData(data))
			.catch((err) => CatchErrorCallback(err));

		return () => {
			controller.abort();
		};
	}, [input, init, CatchErrorCallback]);

	return [data, setData];
};

export default useFetchState;
