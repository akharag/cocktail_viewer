import React, { createContext, FC, ReactNode, useState, useMemo } from 'react';
import { DrinkType, useStateDispatch } from 'utils/types';
import { useReactPath } from 'hooks/useReactPath';

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

export const DrinkListProvider: FC<{
	children?: ReactNode;
}> = ({ children }) => {
	const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
	const memoizedCurrentDrink = useMemo(() => currentDrink, [currentDrink]);

	const value = { currentDrink: memoizedCurrentDrink, setCurrentDrink };

	return (
		<DrinkListContext.Provider value={value}>
			{children}
		</DrinkListContext.Provider>
	);
};
