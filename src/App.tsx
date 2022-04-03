import { useEffect, useState } from 'react';
import './App.css';
import './styles/variables.css';

import { fetchDrinks, fetchGlasses } from './controllers/fetchData';

import DrinksList from './components/DrinksList/DrinksList';
import Filters from './components/Filters/Filters';

function App() {
  const [loading, setLoading] = useState(true);
  const [drinksList, setDrinkList] = useState<
    Array<{ [key: string]: string | null }>
  >([]);

  //On Inital Render
  useEffect(() => {
    fetchDrinks()
      .then((drinks) => setDrinkList(drinks))
      .then(() => setLoading(false));
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
          <div id="search">
            <select>
              <option value="drink">Name</option>
              <option value="ingredient">Ingredient</option>
            </select>
            <label>
              <input type="search" />
            </label>
            <button>Search</button>
          </div>
          <Filters />
        </section>
        <section id="list">
          <div>
            {loading ? <p>Loading...</p> : <DrinksList drinks={drinksList} />}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
