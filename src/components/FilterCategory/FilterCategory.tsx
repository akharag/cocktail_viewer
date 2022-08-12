import Filter, { FilterProps } from '../Filter/Filter';

type FilterCategoryProps = {
	type: string;
	id: string;
	name?: string;
	filters: Array<FilterProps>;
};

const FilterCategory = ({ type, id, name, filters }: FilterCategoryProps) => {
	return (
		<div id={id} className='filter-category'>
			<h2>{name || id}</h2>
			<span>
				{filters.map((filter) => {
					return (
						<Filter
							id={filter.id}
							type={type}
							name={filter.name}
							src={filter.src}
							alt={filter.alt}
						/>
					);
				})}
			</span>
		</div>
	);
};

export default FilterCategory;
