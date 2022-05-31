import { useCallback, useContext, useEffect } from 'react';
import { fetchDrinks } from '../../controllers/fetchData';
import { DrinkListContext, useStateInContext } from '../../hooks/contexts';
import Drink from '../Drink/Drink';
import './DrinkList.css';
import { DrinkType, OptionalType } from '../../utils/types';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const context = useContext(DrinkListContext);
	const [drinkList, setDrinkList] = context?.drinkList as useStateInContext<
		OptionalType<DrinkType[]>
	>;
	const setDrinkListCallback = useCallback(
		(drinkList: DrinkType[]) => {
			setDrinkList?.(drinkList);
		},
		[setDrinkList]
	);

	// const arr = Object.values(data);

	useEffect(() => {
		console.log('Render');
		fetchDrinks().then((drinks) => setDrinkListCallback?.(drinks));
		// setDrinkList?.(arr as any);
	}, [setDrinkListCallback]);

	if (context === null) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<div id='list'>
			{drinkList && drinkList.length > 0 ? (
				Object.values(drinkList).map((drink, i) => (
					<Drink key={'drink' + i} drink={drink as any} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</div>
	);
};

export default DrinksList;
