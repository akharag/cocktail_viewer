import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState
} from 'react';
import { updateUrl } from '../hooks/url';
import { OptionalType, DrinkType } from '../utils/types';

type useStateDispatch<T> = Dispatch<SetStateAction<T>>;

export const DrinkListContext = createContext<{
	drinkList: OptionalType<DrinkType[]>;
	setDrinkList: OptionalType<
		Dispatch<SetStateAction<OptionalType<DrinkType[]>>>
	>;
	currentDrink: DrinkType | null;
	setCurrentDrink: OptionalType<Dispatch<SetStateAction<DrinkType | null>>>;
}>({
	drinkList: undefined,
	setDrinkList: undefined,
	currentDrink: null,
	setCurrentDrink: undefined
});

export const DrinkListProvider: FC = ({ children }) => {
	const [initialLoad, setIntialLoad] = useState(true);
	const [currentDrink, setCurrentDrink] = useState<DrinkType | null>(null);
	const [drinkList, setDrinkList] =
		useState<OptionalType<DrinkType[]>>(undefined);

	const value = {
		drinkList: drinkList,
		currentDrink: currentDrink,
		setDrinkList: setDrinkList,
		setCurrentDrink: setCurrentDrink
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
