import { useContext, useEffect } from 'react';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';
import Drink from '../Drink/Drink';
import './DrinkList.css';
import { DrinkType } from 'utils/types';
import {
	FilterListContext,
	FilterListProvider
} from 'hooks/contexts/FiltersContext';
import { Map } from 'typescript';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const { drinkList } = useContext(DrinkListContext);
	const { filters } = useContext(FilterListContext);
	const showList = drinkList;
	const removedList = new Map<string, DrinkType[]>();

	useEffect(() => {
		for (const entry in filters.entries) {
			console.log('entry', entry);
		}
	}, [filters]);

	return (
		<div id='list'>
			{showList && showList.length > 0 ? (
				showList.map((drink: DrinkType, i) => (
					<Drink key={'drink' + i} index={i} drink={drink} />
				))
			) : (
				<p>No Drink Found :(</p>
			)}
		</div>
	);
};

export default DrinksList;
