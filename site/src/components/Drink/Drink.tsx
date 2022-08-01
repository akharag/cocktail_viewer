import './Drink.css';
import { DrinkType } from '../../utils/types';
import { useContext } from 'react';
import { DrinkListContext } from '../../hooks/contexts';

type DrinkProps = {
	drink: DrinkType;
};

function Drink({ drink }: DrinkProps) {
	const setCurrentDrink = useContext(DrinkListContext).currentDrink[1];
	const { strDrink, strDrinkThumb } = drink;
	return (
		<button className='drink' onClick={() => setCurrentDrink?.(drink)}>
			<h3>{strDrink || drink.display_name}</h3>
			<img
				src={strDrinkThumb}
				alt={strDrink || drink.display_name + ' thumbnail'}
			/>
		</button>
	);
}

export default Drink;
