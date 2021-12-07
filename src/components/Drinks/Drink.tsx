import './Drinks.css';

type DrinkProps = {
    drink: {
        idDrink: number,
        strDrink: string,
        strDrinkThumb: string
    }
}

function Drink({ drink: { idDrink, strDrink, strDrinkThumb } }: DrinkProps) {
    return (
        <a className="drink" href={strDrink}>
            <h3>{strDrink}</h3>
            <img src={strDrinkThumb} alt={strDrink + 'thumbnail'} />
        </a>
    );
}

export default Drink;