import DrinksList from 'components/DrinksList';
import Filters from 'components/Filters/Filters';
import Search from 'components/Search/Search';
import DrinkDetails from 'components/DrinkDetails/DrinkDetails';
import './Main.css';
import {
	fetchDrinksByIngredient,
	fetchDrinksByName
} from 'controllers/fetchData';
// import { useSearchByCocktails } from 'hooks/useSearchCocktails';
// import { useSearchByIngredients } from 'hooks/useSearchIngredients';

function Main() {
	return (
		<main>
			<section id='search-filters'>
				<Search
					className='margin-inline-auto'
					select={['Name', 'Ingredient']}
					onSearch={[fetchDrinksByName, fetchDrinksByIngredient]}
				/>
				<Filters />
			</section>
			<section id='drink-list'>
				<DrinksList />
			</section>
			<aside id='selected-drink'>
				<DrinkDetails />
			</aside>
		</main>
	);
}

export default Main;
