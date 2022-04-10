import React, { useContext, useEffect, useState } from 'react';
import './DrinkDetails.css';
import { fetchSingleDrink } from '../../controllers/fetchData';
import { useReactPath } from '../../hooks/url';
import { DrinkListContext } from '../../hooks/contexts';
import { DrinkType } from '../../utils/types';

function DrinkDetails() {
	const [hide, setHide] = useState(true);
	const [error, setError] = useState(false);
	const { currentDrink, setCurrentDrink } = useContext(DrinkListContext);
	const path = useReactPath().split('/')[useReactPath().split('/').length - 1];
	const icon = '\u2715';

	useEffect(() => {
		if (path !== '') {
			setHide(false);
		}
		if (currentDrink === null) {
			const fetchDrink = async () => {
				const drinkName = path;
				console.log(drinkName);
				const drink: DrinkType | null = await fetchSingleDrink(drinkName);
				if (drink) setCurrentDrink?.({ ...drink });
				else {
					setError(true);
					setTimeout(() => setCurrentDrink?.(null), 2000);
				}
			};
			fetchDrink();
		}
	}, [currentDrink, path, setCurrentDrink]);

	useEffect(() => {
		console.log(hide);
		// if (hide) {
		// 	setCurrentDrink?.(null);
		// } else {
		// 	setHide(false);
		// }
	}, [hide, setCurrentDrink]);

	if (!currentDrink)
		return (
			<div
				className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
				<h1>Loading</h1>
				<button className='close' onClick={() => setHide(!hide)}>
					{icon}
				</button>
			</div>
		);

	if (error) {
		return (
			<div
				className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
				<h1>Error loading drink</h1>
				<button className='close' onClick={() => setHide(!hide)}>
					{icon}
				</button>
			</div>
		);
	}

	return (
		<div className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
			<h1>{currentDrink.strDrink}</h1>
			<img
				src={currentDrink.strDrinkThumb}
				alt={`${currentDrink.strDrink} detail thumbnail`}
			/>
			<button className='close' onClick={() => setHide(true)}>
				{icon}
			</button>
		</div>
	);
}

export default DrinkDetails;
