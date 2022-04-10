import './Drinks.css';
import { DrinkType } from '../../utils/types';
import { useContext } from 'react';
import { DrinkListContext } from '../../hooks/contexts';

type DrinkProps = {
	index: number;
	drink: DrinkType;
};

function Drink({ index, drink }: DrinkProps) {
	const { setCurrentDrink } = useContext(DrinkListContext);
	const { idDrink, strDrink, strDrinkThumb } = drink;
	return (
		<button
			key={idDrink}
			className='drink'
			onClick={() => setCurrentDrink?.(drink)}>
			<h3>{strDrink}</h3>
			<img src={strDrinkThumb} alt={strDrink + 'thumbnail'} />
		</button>
	);
}

export default Drink;
