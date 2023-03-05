import './DrinkDetails.css';
import Drawer from 'components/Drawer';
import { useDrinkContext } from 'hooks/contexts/DrinkContext';
import { ingredientsToArray, removeDuplicatesFromArray } from 'utils/utils';
import {
	ChangeWindowPath,
	GetWindowPath as getWindowPath
} from 'utils/functions/windowFunctions';
import { useSearchCocktails } from 'hooks/useSearchCocktails';

const transitionTiming = 1000;

function DrinkDetails() {
	const path = getWindowPath();
	const { currentDrink, setCurrentDrink } = useDrinkContext();
	const { isLoading, error } = useSearchCocktails(path, {
		enabled: path !== '' && currentDrink === null
	});

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
		console.log('close drawer');
		ChangeWindowPath('');
		setTimeout(() => setCurrentDrink?.(null), transitionTiming + 20);
	};

	if (isLoading) {
		return (
			<Drawer
				className='drink-details'
				show={true}
				transitionTiming={transitionTiming}>
				<h1>Loading...</h1>
			</Drawer>
		);
	}

	if (error) {
		return (
			<Drawer
				className='drink-details'
				show={true}
				transitionTiming={transitionTiming}>
				<h1>Error while trying to fetch your drink</h1>
			</Drawer>
		);
	}

	if (currentDrink !== null) {
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
			</Drawer>
		);
	}
	return <></>;
}

export default DrinkDetails;
