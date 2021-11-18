import './Drinks.css';

type DrinkProps = {
    id?: string,
    name: string,
    ingredients?: Array<string>
}



function Drink({ name, ingredients }: DrinkProps) {
    return (
        <div className="drink">
            <h3>{name}</h3>
            {/* <ul>
                {ingredients?.map((ingredient) => (<li>{ingredient}</li>))}
            </ul> */}
        </div>
    );
}

export default Drink;