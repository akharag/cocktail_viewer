import { DrinkType } from '../utils/types';

export const DB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const url = process.env.REACT_APP_COCKTAIL_DB_URL ?? DB_URL;
const searchUrl = url + 'search.php?';

export const fetchDrinksByName = async (query: string) => {
	const response = await fetch(searchUrl + `s=${query}`);
	const data: { drinks: DrinkType[] } = await response.json();
	return data.drinks;
};

export const fetchDrinksByIngredient = async (query: string) => {
	const response = await fetch(searchUrl + `i+=${query}`);
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
