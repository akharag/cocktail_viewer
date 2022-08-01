import { Suspense, lazy } from 'react';
import './App.css';
import './styles/variables.css';
import './styles/utils.css';

import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';
import DrinkDetails from './components/DrinkDetails/DrinkDetails';
import { DrinkListProvider } from './hooks/contexts';
const DrinksList = lazy(() => import('./components/DrinksList/DrinksList'));

function App() {
	return (
		<DrinkListProvider>
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
						<Suspense fallback={<p>Loading...</p>}>
							<DrinksList />
							<DrinkDetails />
						</Suspense>
					</section>
				</main>
			</div>
		</DrinkListProvider>
	);
}

export default App;
