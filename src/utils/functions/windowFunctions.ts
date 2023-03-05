export const GetWindowPath = () => {
	return window.location.pathname.slice(1, window.location.pathname.length);
};

export const ChangeWindowPath = (
	newPath: string,
	options?: { reload?: boolean; historyKeep?: boolean }
) => {
	if (options?.historyKeep) {
		if (options.reload) {
			window.location.href = '/' + newPath;
		} else {
			window.history.pushState(null, '', '/' + newPath);
		}
	} else {
		window.history.replaceState(null, '', '/' + newPath);
	}
};
