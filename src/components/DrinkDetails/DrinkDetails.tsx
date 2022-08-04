import { useState, useEffect, useContext } from 'react';
import './DrinkDetails.css';
import Drawer from 'components/Drawer';
import { useReactPath } from 'hooks/useReactPath';
import { DrinkListContext } from 'hooks/contexts/DrinkListContext';
import { ingredientsToArray, removeDuplicatesFromArray } from 'utils/functions';

function DrinkDetails() {
	const transitionTiming = 150;
	const [, setPath] = useReactPath();
	const [show, setShow] = useState(false);
	const [error] = useState(false);
	const { currentDrink, setDrinkIndex } = useContext(DrinkListContext);

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
		setShow(false);
		setPath('');

		setTimeout(() => {
			setDrinkIndex?.(-1);
		}, transitionTiming);
	};

	useEffect(() => {
		if (currentDrink) setShow(true);
	}, [currentDrink]);

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
