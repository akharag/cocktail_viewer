import React, { useEffect, useState } from 'react';
import './App.css';
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
        <h1>Bartender's Viewer</h1>
        <p>Looking to discover a new drink? Come see what options you have!</p>
      </header>
      <section>
        <div>
          {
            loading ? <p>Loading...</p> :
              (drinkList?.length > 0 ? drinkList.map((drink, i) => <Drink key={'drink' + i} name={drink.strDrink} />) : <p>No Drink Found :(</p>)
          }
        </div>
      </section>
    </div>
  );
}

export default App;
