import { useContext, useEffect } from 'react';
import { fetchDrinks } from '../../controllers/fetchData';
import { DrinkListContext } from '../../hooks/contexts';
import Drink from '../Drink/Drink';
import './DrinkList.css';
import data from '../../utils/data.json';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const { drinkList, setDrinkList } = useContext(DrinkListContext);
	const arr = Object.values(data);

	useEffect(() => {
		// fetchDrinks().then((drinks) =>
		// 	setDrinkList?.(drinks || Object.values(data))
		// );
		// console.log(drinkList);
		setDrinkList?.(arr as any);
	}, [setDrinkList]);

	return (
		<div id='list'>
			{drinkList && drinkList.length > 0 ? (
				Object.values(data).map((drink, i) => (
					<Drink key={'drink' + i} drink={drink as any} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</div>
	);
};

export default DrinksList;
