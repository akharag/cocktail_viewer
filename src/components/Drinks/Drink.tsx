import './Drinks.css';
import { updateUrl } from '../../hooks/url';

type DrinkProps = {
  drink: {
    idDrink: number;
    strDrink: string;
    strDrinkThumb: string;
  };
};

function Drink({ drink: { idDrink, strDrink, strDrinkThumb } }: DrinkProps) {
  return (
    <button key={idDrink} className="drink" onClick={() => updateUrl(strDrink)}>
      <h3>{strDrink}</h3>
      <img src={strDrinkThumb} alt={strDrink + 'thumbnail'} />
    </button>
  );
}

export default Drink;
