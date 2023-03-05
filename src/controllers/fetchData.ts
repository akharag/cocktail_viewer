import { DrinkType } from '../utils/types';

export const DB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const url = process.env.REACT_APP_COCKTAIL_DB_URL ?? DB_URL;

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

export const fetchSearchDrinks = async (
	query: string,
	options?: { [key: string]: any }
) => {
	const response = await fetch(url + `search.php?s=${query}`, options);
	const data: { drinks: DrinkType[] } = await response.json();
	return data.drinks;
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
