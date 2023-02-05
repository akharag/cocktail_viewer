import { useContext, useEffect, useMemo } from 'react';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';
import Drink from '../Drink/Drink';
import './DrinkList.css';
import { DrinkType } from 'utils/types';
import { FilterListContext } from 'hooks/contexts/FiltersContext';
import { Map } from 'typescript';

//TODO Move CSS Styles from App.css to DrinkList.css

const DrinksList = () => {
	const { drinkList } = useContext(DrinkListContext);
	const { filters } = useContext(FilterListContext);
	// const showList = drinkList;
	const showList = useMemo(() => {
		let list = drinkList;
		for (const [filterType, filterArr] of filters) {
			filterArr.forEach((filterId) => {
				list.filter((drink) => {
					console.log(drink, filterType, drink[filterType], filterId);
					return drink[filterType] === filterId;
				});
			});
			console.log(list);
		}
		// for (const key of filters.keys()) {
		// 	console.log(key, filters.get(key));
		// 	for (const value in filters.get(key)) {
		// 		console.log(value);
		// 		list = list.filter((drink) => {
		// 			console.log(drink);
		// 			return drink[key] === value;
		// 		});
		// 	}
		// }
		// console.log(list);
		return [...list];
	}, [filters, drinkList]);

	// useEffect(() => console.log(showList), [showList]);

	// useEffect(() => {
	// 	for (const k in filters.keys()) console.log(k);
	// 	for (const v in filters.values()) console.log('value', v);
	// }, [filters, filters.keys, filters.values]);

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
