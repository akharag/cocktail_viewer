import React, {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useEffect,
	useState
} from 'react';
import { updateUrl } from '../hooks/url';
import { OptionalType, DrinkType } from '../utils/types';

type useStateDispatch<T> = Dispatch<SetStateAction<T>>;
export type useStateInContext<T> = [T, OptionalType<useStateDispatch<T>>];

interface DrinkListContextInterface {
	drinkList: useStateInContext<DrinkType[]>;
	currentDrink: useStateInContext<DrinkType | null>;
}

export const DrinkListInitialContext: DrinkListContextInterface = {
	drinkList: [[], undefined],
	currentDrink: [null, undefined]
};

export const DrinkListContext = createContext<DrinkListContextInterface>(
	DrinkListInitialContext
);

export const DrinkListProvider: FC<{
	children?: ReactNode;
}> = ({ children }) => {
	const [initialLoad, setIntialLoad] = useState(true);
	const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
	const [drinkList, setDrinkList] = useState<DrinkType[]>([]);

	const value: DrinkListContextInterface = {
		drinkList: [drinkList, setDrinkList],
		currentDrink: [currentDrink, setCurrentDrink]
	};

	useEffect(() => {
		if (initialLoad) {
			setIntialLoad(false);
			setCurrentDrink(null);
			return;
		}
		if (currentDrink === null) updateUrl('');
		if (drinkList && currentDrink) updateUrl(currentDrink.strDrink);
	}, [currentDrink, drinkList, initialLoad]);

	return (
		<DrinkListContext.Provider value={value}>
			{children}
		</DrinkListContext.Provider>
	);
};
