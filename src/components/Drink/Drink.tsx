import './Drink.css';
import { DrinkType } from '../../utils/types';
import { useContext } from 'react';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';
import { useReactPath } from 'hooks/useReactPath';

type DrinkProps = {
	index: number;
	drink: DrinkType;
};

function Drink({ index, drink }: DrinkProps) {
	const { setCurrentDrink } = useContext(DrinkListContext);
	const [, setPath] = useReactPath();
	const { strDrink, strDrinkThumb } = drink;
	return (
		<button
			className='drink'
			onClick={() => {
				setCurrentDrink?.(drink);
				setPath(drink.strDrink);
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
