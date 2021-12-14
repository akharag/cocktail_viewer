import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import "./styles/variables.css";

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
import DrinksList from './components/DrinksList/DrinksList';


function App() {
  const [loading, setLoading] = useState(true);
  const [drinksList, setDrinkList] = useState<Array<{ [key: string]: string | null }>>([]);
  const [filteredDrinkList, setFilteredDrinkList] = useState<Array<{ [key: string]: string | null }>>([]);
  const [filters, setFilters] = useState<{ [filter_type: string]: Array<string> }>({});
  const [glasses, setGlasses] = useState<Array<string>>([]);
  // const [searchHistory, setSearchHistory] = useState<Array<string>>([]);
  const [keepFilterOnSearch] = useState(true);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';

  // const SearchDrinks = async (search_str: string) => {
  //   //Check if string was previously searched for
  //   //if found filter drinks based on search string
  //   //else api call and set drinkList
  //   //Todo Add changing search based on select
  //   const response = await fetch(url + "search.php?s=" + search_str);
  //   const data = await response.json();
  //   if (data) {
  //     setDrinkList(data.drinks);
  //   }

  // }

  const FilterList = (filter_type: string, filter_str: string) => {
    UpdateFilters(filter_type, filter_str);
    UpdateDrinkList();
  }

  const UpdateFilters = (filter_type: string, filter_str: string) => {
    if (filter_type.length < 1 || filter_str.length < 1) { return; }
    let new_filters = filters;
    if (!new_filters[filter_type]) {
      new_filters[filter_type] = [];
    }
    //check if filter exists
    const index = new_filters[filter_type].indexOf(filter_str);
    if (index < 0) {
      new_filters[filter_type].push(filter_str);
    } else {
      new_filters[filter_type].splice(index, 1)
    }
    setFilters(new_filters);
  }

  const CheckDrinkForFilter = (drink: { [key: string]: string | null }, filter_type: string, filter: string) => {
    for (const [key, value] of Object.entries(drink)) {
      if (key.includes(filter_type)) {
        if (value && value.toLowerCase().includes(filter.toLowerCase())) {
          return true;
        }
      }

    }
    return false;
  }

  const UpdateDrinkList = () => {
    let buffer: Array<any> = [];
    let new_drink_list = drinksList;
    const fields = Object.keys(filters);
    fields.forEach(filter_type => {
      if (filters[filter_type].length > 0) {
        filters[filter_type].forEach(filter => {
          const b = new_drink_list.filter(drink => CheckDrinkForFilter(drink, filter_type, filter));
          buffer = [...b, ...buffer];
        })
        new_drink_list = buffer;
        buffer = [];
      }
    })
    setFilteredDrinkList(new_drink_list);
  }

  const DoFiltersExist = () => {
    if (Object.keys(filters).length < 1) { return false; }
    return Object.values(filters).some(filter_array => filter_array.length > 0);
  }

  useEffect(() => {
    if (!keepFilterOnSearch) setDrinkList([]);
  }, [drinksList, keepFilterOnSearch])

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

    const fetchGlasses = async () => {
      let g: Array<string> = [];
      const response = await fetch(url + 'list.php?g=list');
      const data: { drinks: [{ strGlass: string }] } = await response.json();
      data.drinks.forEach(entry => g.push(entry.strGlass.replace('glass', '').replace('Glass', '')));
      setGlasses([...g]);
    }

    const fetchDrinks = async () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const randomLetter = characters.charAt(Math.floor(Math.random() * characters.length))
      const response = await fetch(url + 'search.php?s=' + randomLetter);
      const data = await response.json();
      if (data) {
        let drinks = shuffle(data.drinks);
        setDrinkList(drinks);
      }
    }
    fetchDrinks();
    fetchGlasses();
    setLoading(false);
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
          <Outlet />
          {/*  <div id="search">
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
                <Filter id={'vodka'} src={vodka} SelectFilter={() => FilterList("strIngredient", "vodka")} />
                <Filter id={'rum'} src={light_rum} SelectFilter={() => FilterList("strIngredient", "rum")} />
                <Filter id={'dark rum'} src={dark_rum} SelectFilter={() => FilterList("strIngredient", "dark rum")} />
                <Filter id={'gin'} src={gin} SelectFilter={() => FilterList("strIngredient", "gin")} />
                <Filter id={'whiskey'} src={whiskey} SelectFilter={() => FilterList("strIngredient", "whiskey")} />
                <Filter id={'tequila'} src={tequila} SelectFilter={() => FilterList("strIngredient", "tequila")} />
                <Filter id={'wine'} src={wine} SelectFilter={() => FilterList("strIngredient", "red wine")} />
                <Filter id={'white wine'} src={white_wine} SelectFilter={() => FilterList("strIngredient", "white wine")} />
                <Filter id={'beer'} src={beer} SelectFilter={() => FilterList("strIngredient", "beer")} />
              </span>
            </div>
            <div id="glass">
              <h2>Glasses</h2>
              <span>
                {glasses.map(glass_type => (<Filter
                  key={glass_type}
                  id={glass_type.replace(' ', "_").toLowerCase()}
                  name={glass_type}
                  SelectFilter={() => FilterList("strGlass", glass_type)}
                />))}
              </span>
            </div>
            <div id="category"><h2>Category</h2></div>
            <div id="alcoholic"><h2>Alcoholic</h2></div>
          </div>
        </section>
        <section id="list">
          <div>
            {
              loading ? <p>Loading...</p> :
                <DrinksList
                  drinks={DoFiltersExist() ? filteredDrinkList : drinksList} />
            }
          </div>*/}
        </section>
      </main>
    </div >
  );
}

export default App;