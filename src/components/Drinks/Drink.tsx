import './Drinks.css';

type DrinkProps = {
  drink: {
    idDrink: number;
    strDrink: string;
    strDrinkThumb: string;
  };
};

function Drink({ drink: { idDrink, strDrink, strDrinkThumb } }: DrinkProps) {
  return (
    <button className="drink">
      <h3>{strDrink}</h3>
      <img src={strDrinkThumb} alt={strDrink + 'thumbnail'} />
    </button>
  );
}

export default Drink;
