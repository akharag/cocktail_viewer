import DrinksList from 'components/DrinksList';
import Filters from 'components/Filters/Filters';
import Search from 'components/Search/Search';
import DrinkDetails from 'components/DrinkDetails/DrinkDetails';
import './Main.css';
import { useDrinkContext } from 'hooks/contexts/DrinkContext';
import { useSearchCocktails } from 'hooks/useSearchCocktails';

function Main() {
	const { data, isLoading, error } = useSearchCocktails('l');
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
				<>
					{isLoading ? (
						<p>Loading...</p>
					) : error ? (
						<p>Error Loading Drink List</p>
					) : (
						<DrinksList data={data!} />
					)}
				</>
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
