import { fetchDrinksByName } from 'controllers/fetchData';
import { useQuery } from 'react-query';

export const useSearchByCocktails = (
	query: string,
	queryName?: string,
	options?: { [key: string]: any }
) => {
	return useQuery(queryName ?? query, () => fetchDrinksByName(query), {
		...options
	});
};
