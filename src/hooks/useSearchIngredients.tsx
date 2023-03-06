import { fetchDrinksByIngredient } from 'controllers/fetchData';
import { useQuery } from 'react-query';

export const useSearchByIngredients = (
	query: string,
	options?: { [key: string]: any }
) => {
	return useQuery(query, () => fetchDrinksByIngredient(query), { ...options });
};
