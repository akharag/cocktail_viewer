import './DrinkDetails.css';
import Drawer from 'components/Drawer';
import { useWindowPath } from 'hooks/useWindowPath';
import { useDrinkListContext } from 'hooks/contexts/DrinkListContext';
import { ingredientsToArray, removeDuplicatesFromArray } from 'utils/functions';
import { DB_URL } from 'controllers/fetchData';
import { useQuery } from 'react-query';
import { DrinkType } from 'utils/types';

const transitionTiming = 1000;

function DrinkDetails() {
	const { currentDrink, setCurrentDrink } = useDrinkListContext();
	const [path, setPath] = useWindowPath();
	const { isLoading, error } = useQuery(
		'data',
		() =>
			fetch(
				process.env.REACT_APP_COCKTAIL_DB_URL ?? DB_URL + `search.php?s=${path}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.drinks.length > 0)
						setCurrentDrink?.(data.drinks[0] as DrinkType);
				}),
		{
			enabled: path !== '' && currentDrink === null
		}
	);

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
		setPath('');
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
