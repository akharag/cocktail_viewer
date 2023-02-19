import './DrinkDetails.css';
import Drawer from 'components/Drawer';
import { useReactPath } from 'hooks/useReactPath';
import { useDrinkListContext } from 'hooks/contexts/DrinkListContext';
import { ingredientsToArray, removeDuplicatesFromArray } from 'utils/functions';
import { useEffect } from 'react';
import { DrinkType } from 'utils/types';
import { DB_URL } from 'controllers/fetchData';

function DrinkDetails() {
	const { currentDrink, setCurrentDrink } = useDrinkListContext();
	const [path, setPath] = useReactPath();

	const transitionTiming = 150;

	useEffect(() => {
		if (path !== '' && currentDrink === null) {
			fetch(
				process.env.REACT_APP_COCKTAIL_DB_URL ?? DB_URL + `search.php?s=${path}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.drinks.length > 0) setCurrentDrink?.(data.drinks[0]);
				})
				.catch((err) => {
					console.log(err);
					setPath('');
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	const onClose = () => {
		setCurrentDrink?.(null);
		setPath('');
	};

	if (currentDrink === null) {
		return (
			<Drawer show={false} transitionTiming={transitionTiming}>
				<h1>Loading...</h1>
			</Drawer>
		);
	}

	return (
		<Drawer
			className='drink-details'
			show={true}
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
