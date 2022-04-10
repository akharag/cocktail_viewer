import { useContext, useEffect } from 'react';
import { fetchDrinks } from '../../controllers/fetchData';
import { DrinkListContext } from '../../hooks/contexts';
import Drink from '../Drinks/Drink';
import './DrinkList.css';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const { drinkList, setDrinkList } = useContext(DrinkListContext);

	useEffect(() => {
		fetchDrinks().then((drinks) => setDrinkList?.(drinks));
	}, [setDrinkList]);

	return (
		<section id='list'>
			{drinkList && drinkList.length > 0 ? (
				drinkList.map((drink, i) => (
					<Drink index={i} key={'drink' + i} drink={drink} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</section>
	);
};

export default DrinksList;
