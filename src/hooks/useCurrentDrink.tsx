import { useState } from 'react';

export const useCurrentDrink = (currentDrink?: string | null) => {
	const [drink, setCurrentDrink] = useState(currentDrink ?? null);

	return [drink, setCurrentDrink];
};
