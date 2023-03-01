import './Drink.css';
import { DrinkType } from '../../utils/types';
import { useDrinkContext } from 'hooks/contexts/DrinkContext';
import { useWindowPath } from 'hooks/useWindowPath';

type DrinkProps = {
	drink: DrinkType;
};

function Drink({ drink }: DrinkProps) {
	const { setCurrentDrink } = useDrinkContext();
	const [, setPath] = useWindowPath();
	const { strDrink, strDrinkThumb } = drink;

	const onClick = () => {
		setCurrentDrink?.(drink);
		setPath(drink.strDrink);
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
