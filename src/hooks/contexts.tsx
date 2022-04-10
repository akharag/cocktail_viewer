import {
	createContext,
	Dispatch,
	FC,
	ReactChild,
	SetStateAction,
	useState
} from 'react';
import { OptionalType, DrinkType } from '../utils/types';

type useStateDispatch<T> = Dispatch<SetStateAction<T>>;
type useStateType<T> = [T, useStateDispatch<T>];

export const DrinkListContext = createContext<{
	drinkList: OptionalType<DrinkType[]>;
	setDrinkList: OptionalType<
		Dispatch<SetStateAction<OptionalType<DrinkType[]>>>
	>;
}>({ drinkList: undefined, setDrinkList: undefined });

export const DrinkListProvider: FC = ({ children }) => {
	const [drinkList, setDrinkList] =
		useState<OptionalType<DrinkType[]>>(undefined);

	return (
		<DrinkListContext.Provider
			value={{ drinkList: drinkList, setDrinkList: setDrinkList }}>
			{children}
		</DrinkListContext.Provider>
	);
};
