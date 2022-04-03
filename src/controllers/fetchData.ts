export const URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchDrinks = async (): Promise<
  {
    [key: string]: string | null;
  }[]
> => {
  const response = await fetch(URL + 'search.php?s=a');
  const data = await response.json();
  if (data) {
    return data.drinks;
  }
  return [];
};

export const fetchGlasses = async () => {
  let g: Array<string> = [];
  const response = await fetch(URL + 'list.php?g=list');
  const data: { drinks: [{ strGlass: string }] } = await response.json();
  data.drinks.forEach((entry) =>
    g.push(entry.strGlass.replace('glass', '').replace('Glass', ''))
  );
  return g;
};
