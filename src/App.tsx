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
import Filter from './components/Filter/Filter';

// const filterList = ['vodka', 'light_rum', 'dark_rum', 'gin', 'whiskey', 'tequila', 'wine', 'white_white', 'beer'];
// const filterPath = './assets/icons/alcohol/';


function App() {
  const [loading, setLoading] = useState(true);
  const [drinkList, setDrinkList] = useState<Array<any>>([]);
  const [filters, setFilters] = useState<{ drink: Array<string> }>({ drink: [] });
  // const [searchHistory, setSearchHistory] = useState<Array<string>>([]);
  const [keepFilterOnSearch] = useState(true);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';

  // const SearchDrinks = async (search_str: string) => {
  //   //Check if string was previously searched for
  //   //if found filter drinks based on search string
  //   //else api call and set drinkList
  //   //! Only searches names for now
  //   //Todo Add changing search based on select
  //   const response = await fetch(url + "search.php?s=" + search_str);
  //   const data = await response.json();
  //   if (data) {
  //     setDrinkList(data.drinks);
  //   }

  // }

  const FilterList = (category: string, filter_str: string) => {
    const arr = filters['drink'];
    if (category.length < 1 || filter_str.length < 1) { return; }
    if (arr.includes(filter_str)) { arr.splice(arr.indexOf(filter_str), 1) }
    else { arr.push(filter_str); }
    setFilters({ drink: arr });

  }

  // useEffect(() => {
  //   let filterd_list = [];
  //   filterList.forEach((filter) => {
  //     let filterd_list = drinkList.filter();
  //   });
  // }, [fitlerList])

  useEffect(() => {
    if (!keepFilterOnSearch) setDrinkList([]);
  }, [drinkList, keepFilterOnSearch])

  //On Inital Render
  useEffect(() => {

    const shuffle = (arr: Array<any>) => {
      let currentIndex = arr.length, randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
          arr[randomIndex], arr[currentIndex]];
      }

      return arr;
    }

    const fetchDrinks = async () => {
      const response = await fetch(url + 'filter.php?a=Alcoholic');
      const data = await response.json();
      if (data) {
        let drinks = shuffle(data.drinks);
        setDrinkList(drinks);
        // setDrinkList(shuffle(data.drinks));
        setLoading(false);
      }
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
        <section id="search_filters">
          <div id="search">
            <select>
              <option value="drink">Name</option>
              <option value="ingredient">Ingredient</option>
            </select>
            <label><input type="search" /></label>
            <button>Search</button>
          </div>
          <div id="filters">
            <div id="drink">
              <h2>Drinks</h2>
              <span>
                <Filter
                  name={'vodka'}
                  src={vodka}
                  SelectFilter={() => FilterList("drink", "vodka")} />
                <Filter name={'light rum'} src={light_rum} SelectFilter={() => FilterList("drink", "light_rum")} />
                <Filter name={'dark rum'} src={dark_rum} SelectFilter={() => FilterList("drink", "dark_rum")} />
                <Filter name={'gin'} src={gin} SelectFilter={() => FilterList("drink", "gin")} />
                <Filter name={'whiskey'} src={whiskey} SelectFilter={() => FilterList("drink", "whiskey")} />
                <Filter name={'tequila'} src={tequila} SelectFilter={() => FilterList("drink", "tequila")} />
                <Filter name={'wine'} src={wine} SelectFilter={() => FilterList("drink", "wine")} />
                <Filter name={'white wine'} src={white_wine} SelectFilter={() => FilterList("drink", "white_wine")} />
                <Filter name={'beer'} src={beer} SelectFilter={() => FilterList("drink", "beer")} />
              </span>
            </div>
            <div id="glass"><h2>Glasses</h2></div>
            <div id="category"><h2>Category</h2></div>
            <div id="alcoholic"><h2>Alcoholic</h2></div>
          </div>
        </section>
        <section id="list">
          <div>
            {
              loading ? <p>Loading...</p> :
                (drinkList?.length > 0 ? drinkList.map((drink, i) => <Drink key={'drink' + i} drink={drink} />) : <p>No Drink Found :(</p>)
            }
          </div>
        </section>
      </main>
    </div >
  );
}

export default App;