import Drink from '../Drinks/Drink';
import './DrinkList.css';

type DrinkListProps = {
  drinks: Array<any>;
};

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = ({ drinks }: DrinkListProps) => {
  return (
    <section id="list">
      {drinks.length > 0 ? (
        drinks.map((drink, i) => <Drink key={'drink' + i} drink={drink} />)
      ) : (
        <p>No Drink Found :(</p>
      )}
    </section>
  );
};

export default DrinksList;
