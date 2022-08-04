import { DrinkType } from '../utils/types';

export const DB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchSingleDrink = async (
	name: string
): Promise<DrinkType | null> => {
	try {
		const response = await fetch(DB_URL + `search.php?s=${name}`);
		const data: { drinks: DrinkType[] } = await response.json();
		if (data?.drinks) {
			return data.drinks[0];
		}
		return null;
	} catch {
		return null;
	}
};

export const fetchDrinks = async (): Promise<DrinkType[]> => {
	try {
		const response = await fetch(DB_URL + 'search.php?s=w');
		const data = await response.json();
		if (data?.drinks) {
			return data.drinks;
		}
		return [];
	} catch (e) {
		return [];
	}
};

export const fetchGlasses = async () => {
	let g: Array<string> = [];
	const response = await fetch(DB_URL + 'list.php?g=list');
	const data: { drinks: [{ strGlass: string }] } = await response.json();
	data.drinks.forEach((entry) =>
		g.push(entry.strGlass.replace('glass', '').replace('Glass', ''))
	);
	return g;
};
