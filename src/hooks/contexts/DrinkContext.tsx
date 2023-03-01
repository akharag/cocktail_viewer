import {
	createContext,
	FC,
	ReactNode,
	useState,
	useMemo,
	useContext
} from 'react';
import { DrinkType, useStateDispatch } from 'utils/types';

interface DrinkContextInterface {
	currentDrink: DrinkType | null;
	setCurrentDrink?: useStateDispatch<DrinkType | null>;
}

export const DrinkInitialContext: DrinkContextInterface = {
	currentDrink: null
};

export const DrinkContext =
	createContext<DrinkContextInterface>(DrinkInitialContext);

export const useDrinkContext = () => {
	return useContext(DrinkContext);
};

export const DrinkProvider: FC<{
	children?: ReactNode;
}> = ({ children }) => {
	const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
	const memoizedCurrentDrink = useMemo(() => currentDrink, [currentDrink]);

	const value = { currentDrink: memoizedCurrentDrink, setCurrentDrink };

	return (
		<DrinkContext.Provider value={value}>{children}</DrinkContext.Provider>
	);
};
