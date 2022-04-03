import { useEffect, useState } from 'react';
import { url } from '../../utils/GLOBAL_VARS';
import { GetFilters } from '../..//utils/filters';

import vodka from '../../assets/icons/alcohol/vodka.svg';
import light_rum from '../../assets/icons/alcohol/light_rum.svg';
import dark_rum from '../../assets/icons/alcohol/dark_rum.svg';
import gin from '../../assets/icons/alcohol/gin.svg';
import whiskey from '../../assets/icons/alcohol/whiskey.svg';
import tequila from '../../assets/icons/alcohol/tequila.svg';
import wine from '../../assets/icons/alcohol/wine.svg';
import white_wine from '../../assets/icons/alcohol/white_wine.svg';
import beer from '../../assets/icons/alcohol/beer.svg';
import Filter, { FilterProps } from '../Filter/Filter';
// import FilterCategory from "../FilterCategory/FilterCategory";

const filter_types = GetFilters();

const Filters = () => {
  const [filters, setFitlers] = useState<{
    [filterType: string]: {
      title: string;
      filterArr: Array<FilterProps> | Array<string>;
    };
  }>({});

  //TODO
  const FilterList = (field_name: string, filter_name: string) => {};

  const FetchFitlers = async (id: string): Promise<Array<string>> => {
    const response = await fetch(`${url}list.php?${id}=list`);
    const data: { drinks: any[] } = await response.json();
    const drinks: Array<{ [key: string]: string }> = data.drinks;
    let arr: Array<string> = [];
    drinks.forEach((drink) => arr.push(Object.values(drink)[0]));
    return arr;
  };

  // useEffect(() => {
  //     const FetchAllFilters = async () => {
  //         const obj: { [key: string]: { title: string; filterArr: Array<string> } } = {};
  //         filter_types.forEach(async (filter_type) => {
  //             if (!filter_type.id) throw Error("Filter FieldName not found");
  //             const f = await FetchFitlers(filter_type.id);
  //             obj[`${filter_type.id}`] = {
  //                 title: filter_type.title || filter_type.fieldName || filter_type.id,
  //                 filterArr: f,
  //             };
  //         });
  //         return obj;
  //     };
  //     FetchAllFilters().then((obj) => setFitlers(obj));
  //     console.log(filters);
  // }, []);

  return (
    <div id="filters">
      <div id="drink">
        <h2>Drinks</h2>
        <span>
          <Filter
            id={'vodka'}
            src={vodka}
            SelectFilter={() => FilterList('strIngredient', 'vodka')}
          />
          <Filter
            id={'rum'}
            src={light_rum}
            SelectFilter={() => FilterList('strIngredient', 'rum')}
          />
          <Filter
            id={'dark rum'}
            src={dark_rum}
            SelectFilter={() => FilterList('strIngredient', 'dark rum')}
          />
          <Filter
            id={'gin'}
            src={gin}
            SelectFilter={() => FilterList('strIngredient', 'gin')}
          />
          <Filter
            id={'whiskey'}
            src={whiskey}
            SelectFilter={() => FilterList('strIngredient', 'whiskey')}
          />
          <Filter
            id={'tequila'}
            src={tequila}
            SelectFilter={() => FilterList('strIngredient', 'tequila')}
          />
          <Filter
            id={'wine'}
            src={wine}
            SelectFilter={() => FilterList('strIngredient', 'red wine')}
          />
          <Filter
            id={'white wine'}
            src={white_wine}
            SelectFilter={() => FilterList('strIngredient', 'white wine')}
          />
          <Filter
            id={'beer'}
            src={beer}
            SelectFilter={() => FilterList('strIngredient', 'beer')}
          />
        </span>
      </div>
      {/* {Object.entries(filters).map(([key, value]) => {
                if (value.filterArr.length < 1) return;
                return <FilterCategory
                    id={key}
                    title={value.title}
                    filters={value.filterArr}
                />
            })} */}
    </div>
  );
};

export default Filters;
