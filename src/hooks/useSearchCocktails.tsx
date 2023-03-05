import { fetchSearchDrinks } from 'controllers/fetchData';
import { useQuery } from 'react-query';

export const useSearchCocktails = (query: string) => {
	return useQuery({
		queryKey: 'data',
		queryFn: () => fetchSearchDrinks(query)
	});
};
