import { FilterType } from './types';

const filters: Array<FilterType> = [
  {
    id: 'c',
    fieldName: 'strCategory',
    title: 'Category'
  },
  {
    id: 'g',
    fieldName: 'strGlass',
    title: 'Glasses'
  },
  {
    id: 'i',
    fieldName: 'strIngredient',
    title: 'Ingredients'
  }
];

export function GetFilters(): Array<FilterType> {
  return filters;
}
