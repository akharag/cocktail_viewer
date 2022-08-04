import './Drink.css';
import { DrinkType } from '../../utils/types';
import { useContext } from 'react';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';

type DrinkProps = {
	index: number;
	drink: DrinkType;
};

function Drink({ index, drink }: DrinkProps) {
	const { setDrinkIndex } = useContext(DrinkListContext);
	const { strDrink, strDrinkThumb } = drink;
	return (
		<button
			className='drink'
			onClick={() => {
				setDrinkIndex?.(index);
			}}>
			<h3>{strDrink || drink.display_name}</h3>
			<img
				src={strDrinkThumb}
				alt={strDrink || drink.display_name + ' thumbnail'}
			/>
		</button>
	);
}

export default Drink;
