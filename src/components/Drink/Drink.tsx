import './Drink.css';
import { DrinkType } from '../../utils/types';
import { useDrinkContext } from 'hooks/contexts/DrinkContext';
import { ChangeWindowPath } from 'utils/functions/windowFunctions';

type DrinkProps = {
	drink: DrinkType;
};

function Drink({ drink }: DrinkProps) {
	const { setCurrentDrink } = useDrinkContext();
	const { strDrink, strDrinkThumb } = drink;

	const onClick = () => {
		setCurrentDrink?.(drink);
		ChangeWindowPath(drink.strDrink);
	};

	return (
		<button className='drink' onClick={onClick}>
			<h3>{strDrink || drink.display_name}</h3>
			<img
				src={strDrinkThumb}
				alt={strDrink || drink.display_name + ' thumbnail'}
			/>
		</button>
	);
}

export default Drink;
