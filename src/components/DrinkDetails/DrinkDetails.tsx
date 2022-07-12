import { useCallback, useContext, useEffect, useState } from 'react';
import './DrinkDetails.css';
// import Modal from '../Modal';
import Drawer from '../Drawer';
import { fetchSingleDrink } from '../../controllers/fetchData';
import { updateUrl, useReactPath } from '../../hooks/url';
import { DrinkListContext, useStateInContext } from '../../hooks/contexts';
import { DrinkType } from '../../utils/types';
import {
	ingredientsToArray,
	removeDuplicatesFromArray
} from '../../utils/functions';

function DrinkDetails() {
	const [hide, setHide] = useState(true);
	const [error, setError] = useState(false);
	const [currentDrink, setCurrentDrink] = useContext(DrinkListContext)
		.currentDrink as useStateInContext<DrinkType | null>;
	const setCurrentDrinkCallback = useCallback(
		(currentDrink: DrinkType | null) => {
			setCurrentDrink?.(currentDrink);
		},
		[setCurrentDrink]
	);
	const path = useReactPath().split('/')[useReactPath().split('/').length - 1];

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
		if (path !== '') {
			setHide(false);
		}
		if (currentDrink === null && path !== '') {
			const fetchDrink = async () => {
				const drinkName = path;
				const drink: DrinkType | null = await fetchSingleDrink(drinkName);
				if (drink) setCurrentDrinkCallback?.({ ...drink });
				else {
					setError(true);
					setTimeout(() => setCurrentDrinkCallback?.(null), 2000);
				}
			};
			fetchDrink();
		}
	}, [currentDrink, path, setCurrentDrinkCallback]);

	useEffect(() => {
		if (hide) {
			setCurrentDrink?.(null);
			updateUrl('/');
		}
	}, [hide, setCurrentDrink]);

	if (!currentDrink) {
		return (
			<Drawer open={!hide} onCloseCallback={() => setHide(true)}>
				<h1>Loading...</h1>
			</Drawer>
		);
	}

	if (error) {
		return (
			<Drawer open={!hide} onCloseCallback={() => setHide(true)}>
				<h1>There was an error loading </h1>
			</Drawer>
		);
	}

	return (
		<Drawer open={!hide} onCloseCallback={() => setHide(true)}>
			<div className='drink-details'>
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
							(ingredient) =>
								ingredient && <li key={ingredient}>{ingredient}</li>
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
			</div>
		</Drawer>
	);
}

export default DrinkDetails;
