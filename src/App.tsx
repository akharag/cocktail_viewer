import React, { useEffect, useState } from 'react';
import './App.css';
import styles from "./styles.module.css";
import "./styles/variables.css";
import Drink from './components/Drinks/Drink';



function App() {
  const [loading, setLoading] = useState(true);
  const [drinkList, setDrinkList] = useState<Array<any>>([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(url + 'i=vodka');
      const data = await response.json();
      if (data) setDrinkList(data.drinks);
      setLoading(false);
    }
    fetchDrinks();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </nav>
        <div>
          <h1>Bartender's Viewer</h1>
          <p>Looking to discover a new drink? See what options you have!</p>
        </div>
      </header>

      <main>
        <div>
          <section id="search">
            <select>
              <option value="drink">Drink</option>
              <option value="ingredient">Ingredient</option>
            </select>
            <label><input type="search" /></label>
          </section>
        </div>
        <section id="list">
          <div>
            {
              loading ? <p>Loading...</p> :
                (drinkList?.length > 0 ? drinkList.map((drink, i) => <Drink key={'drink' + i} name={drink.strDrink} />) : <p>No Drink Found :(</p>)
            }
          </div>
        </section>
      </main>
    </div >
  );
}

export default App;
