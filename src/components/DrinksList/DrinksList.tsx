import Drink from "../Drinks/Drink";

type DrinkListProps = {
    drinks: Array<any>;
}

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = ({ drinks }: DrinkListProps) => {
    return <>{
        drinks.length > 0 ? drinks.map((drink, i) => <Drink key={'drink' + i} drink={drink} />) :
            <p>No Drink Found :(</p>
    }</>
}

export default DrinksList;