import { Suspense } from 'react';
import './App.css';
import './styles/variables.css';
import './styles/utils.css';

import DrinksList from './components/DrinksList/DrinksList';
import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';
import DrinkDetails from './components/DrinkDetails/DrinkDetails';
import { DrinkListProvider } from './hooks/contexts';

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
							select={['Name', 'Alcohol', 'Ingredient']}
							onSearch={() => console.log('Search')}
						/>
						<Filters />
					</section>
					<section id='drinks'>
						<Suspense fallback={<p>Loading...</p>}>
							<DrinksList />
						</Suspense>
						<DrinkDetails />
					</section>
				</main>
			</div>
		</DrinkListProvider>
	);
}

export default App;
