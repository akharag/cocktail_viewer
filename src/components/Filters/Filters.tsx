// import { url } from '../../utils/GLOBAL_VARS';
// import { GetFilters } from '../..//utils/filters';

import vodka from '../../assets/icons/alcohol/vodka.svg';
import light_rum from '../../assets/icons/alcohol/light_rum.svg';
import dark_rum from '../../assets/icons/alcohol/dark_rum.svg';
import gin from '../../assets/icons/alcohol/gin.svg';
import whiskey from '../../assets/icons/alcohol/whiskey.svg';
import tequila from '../../assets/icons/alcohol/tequila.svg';
import wine from '../../assets/icons/alcohol/wine.svg';
import white_wine from '../../assets/icons/alcohol/white_wine.svg';
import beer from '../../assets/icons/alcohol/beer.svg';
import Filter from '../Filter/Filter';
// import FilterCategory from "../FilterCategory/FilterCategory";

import './Filters.css';
import { FilterListContext } from 'hooks/contexts/FiltersContext';

const Filters = () => {
	return (
		<div id='filters'>
			<div id='drink'>
				<h2>Drinks</h2>
				<span>
					<Filter id='vodka' type='strIngredient' src={vodka} />
					<Filter id={'rum'} type='strIngredient' src={light_rum} />
					<Filter id={'dark rum'} type='strIngredient' src={dark_rum} />
					<Filter id={'gin'} type='strIngredient' src={gin} />
					<Filter id={'whiskey'} type='strIngredient' src={whiskey} />
					<Filter id={'tequila'} type='strIngredient' src={tequila} />
					<Filter id={'wine'} type='strIngredient' src={wine} />
					<Filter id={'white wine'} type='strIngredient' src={white_wine} />
					<Filter id={'beer'} type='strIngredient' src={beer} />
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
