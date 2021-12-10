import { useEffect, useState } from 'react';
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
  const [drinksList, setDrinkList] = useState<Array<any>>([]);
  const [filteredDrinkList, setFilteredDrinkList] = useState<Array<any>>([]);
  // const [filteredItems, setFilteredItems] = useState<{ [key: string]: { [key: string]: Array<any> } }>({});
  // const [filteredItems, setFilteredItems] = useState<{
  //   [category: string]: {
  //     [filter: string]: Array<any>
  //   }
  // }>({});
  const [filters, setFilters] = useState<{ [field: string]: Array<string> }>({});
  const [filtersArray, setFiltersArray] = useState<Array<string>>([]);
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

  //! Bug 
  const FilterList = (field_str: string, filter_str: string) => {
    UpdateFilters(field_str, filter_str);
    // UpdateDrinkList();
  }

  const UpdateFilters = (field_str: string, filter_str: string) => {
    if (field_str.length < 1 || filter_str.length < 1) { return; }
    let new_filters = filters;
    if (!new_filters[field_str]) {
      new_filters[field_str] = [];
    }
    //check if filter exists
    const index = new_filters[field_str].indexOf(filter_str);
    console.log(index);
    if (index < 0) {
      console.log("toggle on");
      new_filters[field_str].push(filter_str);
    } else {
      console.log("toggle off");
      new_filters[field_str].splice(index, 1)
    }
    console.log("new filters:", field_str, new_filters[field_str]);
    setFilters(new_filters);
    // console.log(filters);
  }

  const UpdateDrinkList = () => {
    let new_drink_list = drinksList;
    const fields = Object.keys(filters);
    console.log(fields);
    // categories.forEach(category => {
    //   const list = [];
    //   filters[category].forEach(filter => {
    //     const list = new_drink_list.filter(drink => {

    //     })
    //   })
    // })
  }

  // useEffect(() => {
  //   let dl = drinksList;
  //   Object.values(filters).forEach(category => {
  //     if (category.length > 0) {
  //       category.forEach(filter_str => {
  //         dl = dl.filter(drink => {
  //           for (let i = 1; i < 16; i++) {
  //             if (drink[`strIngredient${i}`] && drink[`strIngredient${i}`].toLowerCase().includes(filter_str.toLowerCase())) {
  //               return true;
  //             }
  //           }
  //           return false;
  //         })
  //       })
  //     }
  //     console.log(dl);
  //     setFilteredDrinkList(dl);
  //   })

  // }, [filters, drinksList])

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

    const fetchDrinks = async () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const randomLetter = characters.charAt(Math.floor(Math.random() * characters.length))
      const response = await fetch(url + 'search.php?s=' + randomLetter);
      const data = await response.json();
      if (data) {
        let drinks = shuffle(data.drinks);
        setDrinkList(drinks);
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
            <div id="glass"><h2>Glasses</h2></div>
            <div id="category"><h2>Category</h2></div>
            <div id="alcoholic"><h2>Alcoholic</h2></div>
          </div>
        </section>
        <section id="list">
          <div>
            {
              loading ? <p>Loading...</p> :
                <DrinksList drinks={filteredDrinkList.length > 0 ? filteredDrinkList : drinksList} />
            }
          </div>
        </section>
      </main>
    </div >
  );
}

export default App;