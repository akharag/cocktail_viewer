import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { DB_URL } from 'controllers/fetchData';
import DrinksList from 'components/DrinksList';
import Filters from 'components/Filters/Filters';
import Search from 'components/Search/Search';
import './Main.css';

function Main() {
	const { isLoading, error, data } = useQuery('data', () =>
		fetch(
			process.env.REACT_APP_COCKTAIL_DB_URL ?? DB_URL + `search.php?s=w`
		).then((res) => res.json())
	);

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
					{!isLoading && (
						<Suspense fallback={<p>Loading...</p>}>
							{error ? (
								<div>
									<>Error Loading Drinks {error}</>
								</div>
							) : (
								<DrinksList data={data.drinks} />
							)}
						</Suspense>
					)}
				</>
			</section>
			{/* <section id='selected-drink'>
        <DrinkDetails />
    </section> */}
		</main>
	);
}

export default Main;
