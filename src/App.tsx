import { useEffect, useState, Suspense } from 'react';
import './App.css';
import './styles/variables.css';

import { fetchDrinks, fetchGlasses } from './controllers/fetchData';

import DrinksList from './components/DrinksList/DrinksList';
import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';

function App() {
  const [drinksList, setDrinkList] = useState<
    Array<{ [key: string]: string | null } | null>
  >([]);

  //On Inital Render
  useEffect(() => {
    fetchDrinks().then((drinks) => setDrinkList(drinks));
    fetchGlasses();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Bartender's Viewer</h1>
          <p>Looking to discover a new drink? See what options you have!</p>
        </div>
      </header>

      <main>
        <section id="search_filters">
          <Search
            select={['Name', 'Alcohol', 'Ingredient']}
            onSearch={() => console.log('Search')}
          />
          <Filters />
        </section>

        <Suspense fallback={<p>Loading...</p>}>
          <DrinksList drinks={drinksList} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
