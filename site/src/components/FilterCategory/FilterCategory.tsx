import Filter, { FilterProps } from "../Filter/Filter";


type FilterCategoryProps = {
    id: string;
    name?: string;
    filters: Array<FilterProps>
}

const FilterCategory = ({ id, name, filters }: FilterCategoryProps) => {
    return (
        <div id={id} className="filter-category">
            <h2>{name || id}</h2>
            <span>
                {filters.map(filter => {
                    return <Filter
                        id={filter.id}
                        name={filter.name}
                        src={filter.src}
                        alt={filter.alt}
                        SelectFilter={filter.SelectFilter}
                    />
                })}
            </span>
        </div>
    );
}

export default FilterCategory;