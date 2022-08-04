import { Suspense, lazy } from 'react';
import './App.css';
import './styles/variables.css';
import './styles/utils.css';

// import DrinksList from './components/DrinksList/DrinksList';
import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';
// import DrinkDetails from './components/DrinkDetails/DrinkDetails';
import { useContext } from 'react';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';
const DrinksList = lazy(() => import('components/DrinksList/DrinksList'));
const DrinkDetails = lazy(() => import('components/DrinkDetails/DrinkDetails'));

const App = () => {
	const { loading } = useContext(DrinkListContext);
	return (
		<div className='App'>
			<header className='App-header'>
				<div>
					<h1>Bartender's Viewer</h1>
					<p>Looking to discover a new drink? See what options you have!</p>
				</div>
			</header>
			<main>
				<section id='search_filters'>
					<Search
						className='margin-inline-auto'
						select={['Name', 'Alcohol', 'Ingredient']}
						onSearch={() => console.log('Search')}
					/>
					<Filters />
				</section>
				<section id='drinks'>
					{!loading && (
						<Suspense fallback={<p>Loading...</p>}>
							<DrinksList />
							<DrinkDetails />
						</Suspense>
					)}
				</section>
			</main>
		</div>
	);
};

export default App;
