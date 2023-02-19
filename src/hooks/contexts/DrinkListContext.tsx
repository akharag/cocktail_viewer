import { useReactPath } from 'hooks/useReactPath';
import React, {
	createContext,
	FC,
	ReactNode,
	useState,
	useMemo,
	useContext,
	useEffect
} from 'react';
import { DrinkType, useStateDispatch } from 'utils/types';

interface DrinkListContextInterface {
	currentDrink: DrinkType | null;
	setCurrentDrink?: useStateDispatch<DrinkType | null>;
}

export const DrinkListInitialContext: DrinkListContextInterface = {
	currentDrink: null
};

export const DrinkListContext = createContext<DrinkListContextInterface>(
	DrinkListInitialContext
);

export const useDrinkListContext = () => {
	return useContext(DrinkListContext);
};

export const DrinkListProvider: FC<{
	children?: ReactNode;
}> = ({ children }) => {
	const [path] = useReactPath();

	const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
	const memoizedCurrentDrink = useMemo(() => currentDrink, [currentDrink]);

	const value = { currentDrink: memoizedCurrentDrink, setCurrentDrink };

	return (
		<DrinkListContext.Provider value={value}>
			{children}
		</DrinkListContext.Provider>
	);
};
