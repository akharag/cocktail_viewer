import { fetchSearchDrinks } from 'controllers/fetchData';
import { useQuery } from 'react-query';

export const useSearchCocktails = (
	query: string,
	options?: { [key: string]: any }
) => {
	return useQuery(query, () => fetchSearchDrinks(query), { ...options });
};
