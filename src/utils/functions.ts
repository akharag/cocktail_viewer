import { DrinkType } from './types';

export const ingredientsToArray = (drink: DrinkType) => {
	const arr: string[] = [];
	const entries: [key: string, value: any][] = Object.entries(drink);
	entries
		.filter(([key, _]) => key.includes('strIngredient'))
		.filter(([_, value]) => value !== null)
		.forEach(([_, value]) => arr.push(value));
	return arr;
};
