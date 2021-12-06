import React, { useEffect, useState } from 'react';
import './App.css';
import "./styles/variables.css";
import Drink from './components/Drinks/Drink';

import vodka from "./assets/icons/alcohol/vodka.svg";
import light_rum from './assets/icons/alcohol/light_rum.svg';
import dark_rum from './assets/icons/alcohol/dark_rum.svg';
import gin from "./assets/icons/alcohol/gin.svg";
import whiskey from "./assets/icons/alcohol/whiskey.svg";
import tequila from './assets/icons/alcohol/tequila.svg';
import wine from "./assets/icons/alcohol/wine.svg";
import white_wine from './assets/icons/alcohol/white_wine.svg';
import beer from './assets/icons/alcohol/beer.svg';

const filterList = ['vodka', 'light_rum', 'dark_rum', 'gin', 'whiskey', 'tequila', 'wine', 'white_white', 'beer'];
const filterPath = './assets/icons/alcohol/';


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
        <div>
          <h1>Bartender's Viewer</h1>
          <p>Looking to discover a new drink? See what options you have!</p>
        </div>
      </header>

      <main>
        <section id="search">
          <div>
            <select>
              <option value="drink">Name</option>
              <option value="ingredient">Ingredient</option>
              <option value="Cup">Cup Type</option>
            </select>
            <label><input type="search" /></label>
            <div className="filters">
              <img src={vodka} alt="vodka filter" />
              <img src={light_rum} alt="light_rum filter" />
              <img src={dark_rum} alt="dark_rum filter" />
              <img src={gin} alt="gin filter" />
              <img src={tequila} alt="tequila filter" />
              <img src={wine} alt="wine filter" />
              <img src={white_wine} alt="white wine filter" />
              <img src={beer} alt="beer filter" />
            </div>
          </div>
        </section>
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