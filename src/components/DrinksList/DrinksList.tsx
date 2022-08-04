import { useContext } from 'react';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';
import Drink from '../Drink/Drink';
import './DrinkList.css';
import { DrinkType } from 'utils/types';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const { drinkList } = useContext(DrinkListContext);

	return (
		<div id='list'>
			{drinkList && drinkList.length > 0 ? (
				drinkList.map((drink: DrinkType, i) => (
					<Drink key={'drink' + i} index={i} drink={drink} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</div>
	);
};

export default DrinksList;
