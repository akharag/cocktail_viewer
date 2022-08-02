import { useCallback, useContext, useEffect, useState } from 'react';
import './DrinkDetails.css';
// import Modal from '../Modal';
import Drawer from 'components/Drawer';
import { fetchSingleDrink } from 'controllers/fetchData';
import { updateUrl, useAutoUpdateReactPath } from 'hooks/url';
import { DrinkListContext, useStateInContext } from 'hooks/contexts';
import { DrinkType } from 'utils/types';
import { ingredientsToArray, removeDuplicatesFromArray } from 'utils/functions';

function DrinkDetails() {
	const transitionTiming = 150;
	const [show, setShow] = useState(false);
	const [error, setError] = useState(false);
	const [currentDrink, setCurrentDrink] = useContext(DrinkListContext)
		.currentDrink as useStateInContext<DrinkType | null>;
	const setCurrentDrinkCallback = useCallback(
		(currentDrink: DrinkType | null) => {
			setCurrentDrink?.(currentDrink);
		},
		[setCurrentDrink]
	);
	const path = useAutoUpdateReactPath();

	const getTags = (): string[] => {
		const t: string[] = [];
		if (!currentDrink) return [];
		if (currentDrink.strAlcoholic) {
			t.push(currentDrink.strAlcoholic as string);
		}
		if (currentDrink.strGlass) {
			t.push(currentDrink.strGlass as string);
		}

		if (currentDrink.strTags) {
			(currentDrink.strTags as string).split(',').forEach((tag) => t.push(tag));
		}

		return t;
	};

	useEffect(() => {
		if (path !== '') setShow(true);
		// If loading from page with url/drink, need to fetch drink
		if (currentDrink === null && path !== '') {
			const fetchDrink = async () => {
				const drinkName = path;
				const drink: DrinkType | null = await fetchSingleDrink(drinkName);
				if (drink) setCurrentDrinkCallback?.({ ...drink });
				else {
					setError(true);
				}
				console.log(currentDrink);
			};
			fetchDrink();
		}
	}, [currentDrink, path, setCurrentDrinkCallback]);

	const onClose = () => {
		console.log('close');
		setShow(false);
		updateUrl('/');
		setTimeout(() => setCurrentDrinkCallback(null), transitionTiming);
	};

	if (!currentDrink) {
		return (
			<Drawer show={show} transitionTiming={transitionTiming} onClose={onClose}>
				<h1>Loading...</h1>
			</Drawer>
		);
	}

	if (error) {
		return (
			<Drawer show={show} transitionTiming={transitionTiming} onClose={onClose}>
				<h1>There was an error loading </h1>
			</Drawer>
		);
	}

	return (
		<Drawer
			className='drink-details'
			show={show}
			transitionTiming={transitionTiming}
			onClose={onClose}>
			<h1>{currentDrink.strDrink || currentDrink.display_name}</h1>
			<img
				src={currentDrink.strDrinkThumb}
				alt={`${
					currentDrink.strDrink || currentDrink.display_name
				} detail thumbnail`}
			/>
			<div id='ingredients'>
				<h2>Ingredients</h2>
				<ul>
					{removeDuplicatesFromArray(ingredientsToArray(currentDrink)).map(
						(ingredient) => ingredient && <li key={ingredient}>{ingredient}</li>
					)}
				</ul>
			</div>
			<p id='instructions'>{currentDrink.strInstructions || 'Instruction'}</p>
			<div id='tags' className='center'>
				<h6>Tags</h6>
				<ul>
					{removeDuplicatesFromArray(getTags()).map(
						(tag) => tag && <li key={tag}>{tag}</li>
					)}
				</ul>
			</div>
		</Drawer>
	);
}

export default DrinkDetails;
