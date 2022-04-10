import './Drinks.css';
import { updateUrl } from '../../hooks/url';
import { DrinkType } from '../../utils/types';

type DrinkProps = {
	drink: DrinkType;
};

function Drink({ drink: { idDrink, strDrink, strDrinkThumb } }: DrinkProps) {
	return (
		<button key={idDrink} className='drink' onClick={() => updateUrl(strDrink)}>
			<h3>{strDrink}</h3>
			<img src={strDrinkThumb} alt={strDrink + 'thumbnail'} />
		</button>
	);
}

export default Drink;
