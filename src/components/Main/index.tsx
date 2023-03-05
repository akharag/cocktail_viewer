import DrinksList from 'components/DrinksList';
import Filters from 'components/Filters/Filters';
import Search from 'components/Search/Search';
import DrinkDetails from 'components/DrinkDetails/DrinkDetails';
import './Main.css';
import { useDrinkContext } from 'hooks/contexts/DrinkContext';
import { useSearchCocktails } from 'hooks/useSearchCocktails';

function Main() {
	const { currentDrink } = useDrinkContext();

	return (
		<main>
			<section id='search-filters'>
				<Search
					className='margin-inline-auto'
					select={['Name', 'Alcohol', 'Ingredient']}
					onSearch={() => console.log('Search')}
				/>
				<Filters />
			</section>
			<section id='drink-list'>
				<DrinksList />
			</section>
			{currentDrink !== null && (
				<aside id='selected-drink'>
					<DrinkDetails />
				</aside>
			)}
		</main>
	);
}

export default Main;
