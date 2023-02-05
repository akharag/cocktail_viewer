import Drink from '../Drink/Drink';
import './DrinkList.css';
import { DrinkType } from 'utils/types';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = ({ data }: { data: any[] }) => {
	return (
		<div id='list'>
			{data && data.length > 0 ? (
				data.map((drink: DrinkType, i) => (
					<Drink key={'drink' + i} index={i} drink={drink} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</div>
	);
};

export default DrinksList;
