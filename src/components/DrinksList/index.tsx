import Drink from '../Drink/Drink';
import './DrinkList.css';
import { DrinkType } from 'utils/types';
import { useSearchCocktails } from 'hooks/useSearchCocktails';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const { data, isLoading, error } = useSearchCocktails('l');

	if (isLoading) {
		<p>Loading...</p>;
	}

	if (error) {
		<p>Error Loading List</p>;
	}

	return (
		<div id='list'>
			{data && data.length > 0 ? (
				data.map((drink: DrinkType) => (
					<Drink key={drink.idDrink} drink={drink} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</div>
	);
};

export default DrinksList;
