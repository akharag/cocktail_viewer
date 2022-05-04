import { useContext, useEffect, useState } from 'react';
import './DrinkDetails.css';
import { fetchSingleDrink } from '../../controllers/fetchData';
import { updateUrl, useReactPath } from '../../hooks/url';
import { DrinkListContext } from '../../hooks/contexts';
import { DrinkType } from '../../utils/types';

function DrinkDetails() {
	const [hide, setHide] = useState(true);
	const [error, setError] = useState(false);
	const { currentDrink, setCurrentDrink } = useContext(DrinkListContext);
	const path = useReactPath().split('/')[useReactPath().split('/').length - 1];
	const icon = '\u2715';

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
		if (hide) {
			setCurrentDrink?.(null);
			updateUrl('/');
		}
	}, [hide, setCurrentDrink]);

	if (!currentDrink)
		return (
			<dialog
				style={{ display: 'none' }}
				className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
				<h1>Loading</h1>
				<button className='close' onClick={() => setHide(!hide)}>
					{icon}
				</button>
			</dialog>
		);

	if (error) {
		return (
			<dialog
				className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
				<h1>Error loading drink</h1>
				<button className='close' onClick={() => setHide(!hide)}>
					{icon}
				</button>
			</dialog>
		);
	}

	return (
		<div className={`drink-details ${hide ? 'animate-exit' : 'animate-enter'}`}>
			<h1>{currentDrink.strDrink || currentDrink.display_name}</h1>
			<img
				src={currentDrink.strDrinkThumb}
				alt={`${
					currentDrink.strDrink || currentDrink.display_name
				} detail thumbnail`}
			/>
			<ul id='tags'>
				{((currentDrink.tags as string[]) || getTags()).map((tag) => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
			<button className='close' onClick={() => setHide(true)}>
				{icon}
			</button>
		</div>
	);
}

export default DrinkDetails;
