import { Dispatch, SetStateAction } from 'react';

export type useStateDispatch<T> = Dispatch<SetStateAction<T>>;
export type useStateType<T> = [T, OptionalType<useStateDispatch<T>>];

export type OptionalType<T> = T | undefined;

export type DrinkType = {
	idDrink: number;
	strDrink: string;
	strDrinkThumb: string;
	[key: string]: number | string | string[] | null;
};

export type FilterType = {
	id: string;
	fieldName?: string;
	title?: string;
};
