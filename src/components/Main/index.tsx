import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { DB_URL } from 'controllers/fetchData';
import DrinksList from 'components/DrinksList';
import Filters from 'components/Filters/Filters';
import Search from 'components/Search/Search';
// import DrinkDetails from 'components/DrinkDetails/DrinkDetails';
import './Main.css';
import { useDrinkContext } from 'hooks/contexts/DrinkContext';

const useSearchCocktails = (query: string) => {
	return useQuery('data', () =>
		fetch(
			process.env.REACT_APP_COCKTAIL_DB_URL ?? DB_URL + `search.php?s=${query}`
		).then((res) => res.json())
	);
};

function Main() {
	const { data, isLoading, error } = useSearchCocktails('w');
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
						<>
							<h2>{currentDrink?.strDrink || 'None Selected'}</h2>
							<DrinksList data={data.drinks} />
						</>
					)}
				</>
			</section>
			{/* <aside id='selected-drink'>
				<DrinkDetails />
			</aside> */}
		</main>
	);
}

export default Main;
