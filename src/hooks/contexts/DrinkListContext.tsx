import React, {
	createContext,
	FC,
	ReactNode,
	useEffect,
	useState,
	useMemo
} from 'react';
import { DrinkType, useStateDispatch } from 'utils/types';
import { useReactPath } from 'hooks/useReactPath';
import { useFetch } from 'hooks/fetchState';
import { DB_URL } from 'controllers/fetchData';
import { useLocalStorage } from 'hooks/useLocalStoage';

interface DrinkListContextInterface {
	drinkList: DrinkType[];
	drinkIndex: number;
	setDrinkIndex: useStateDispatch<number> | undefined;
	currentDrink?: DrinkType | null;
	error: unknown;
	loading: boolean;
}

export const DrinkListInitialContext: DrinkListContextInterface = {
	drinkList: [],
	drinkIndex: -1,
	setDrinkIndex: undefined,
	error: undefined,
	loading: false
};

export const DrinkListContext = createContext<DrinkListContextInterface>(
	DrinkListInitialContext
);

export const DrinkListProvider: FC<{
	children?: ReactNode;
}> = ({ children }) => {
	const [path, setPath] = useReactPath();
	const [drinkIndex, setDrinkIndex] = useState<number>(-1);
	const [data, error, loading] = useFetch<{ drinks: DrinkType[] }>(
		DB_URL + 'search.php?f=a'
	);
	const [drinkList, setDrinkList] = useLocalStorage<DrinkType[]>(
		'drinkList',
		[]
	);

	const currentDrink = useMemo(
		() => (drinkList && drinkIndex > -1 ? drinkList[drinkIndex] : null),
		[drinkList, drinkIndex]
	);

	const value: DrinkListContextInterface = {
		drinkList: drinkList,
		drinkIndex: drinkIndex,
		setDrinkIndex: setDrinkIndex,
		currentDrink: currentDrink,
		error: error,
		loading: loading
	};

	//set drink list when the data is finished loading
	useEffect(() => {
		setDrinkList(data?.drinks ?? []);
	}, [data, setDrinkList]);

	//On initial load, if there is a drink in the path set the index
	useEffect(() => {
		console.log(!loading, path, drinkList.length > 0);
		if (path && drinkList && drinkList.length > 0) {
			const index = drinkList.findIndex((drink) => drink.strDrink === path);
			console.log(index);
			setDrinkIndex(index);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drinkList]);

	//when the page is already loaded, if the current drink changes, update the url
	useEffect(() => {
		// check if data is loaded
		if (drinkList && drinkList.length > 0) {
			if (currentDrink) setPath(currentDrink?.strDrink);
			else setPath('');
		}
	}, [drinkList, currentDrink, setPath]);

	return (
		<DrinkListContext.Provider value={value}>
			{children}
		</DrinkListContext.Provider>
	);
};
