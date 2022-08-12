import { FilterListContext } from 'hooks/contexts/FiltersContext';
import { useContext, useState } from 'react';
import './Filter.css';

export type FilterProps = {
	type: string; // the category for the filter
	id: string; // the specific filter
	name?: string;
	src?: string;
	alt?: string;
};

const Fitler = ({ id, type, name, src, alt }: FilterProps) => {
	const [selected, setSelected] = useState(false);
	const { filtersDispatch } = useContext(FilterListContext);

	const ClickHandler = () => {
		if (!selected) {
			filtersDispatch?.({
				type: 'add',
				payload: [type, id]
			});
		} else {
			filtersDispatch?.({
				type: 'remove',
				payload: [type, id]
			});
		}
		setSelected((prevState) => !prevState);
	};

	const CapitalFirstLetter = (str: string): string => {
		const arr = str.split(' ');

		for (var i = 0; i < arr.length; i++)
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

		const new_str = arr.join(' ');

		return new_str;
	};

	return (
		<button
			id={id}
			className={`filter${selected ? ' selected' : ''}`}
			onClick={ClickHandler}>
			{src && (
				<img src={src} alt={alt || `${(name || id).toLowerCase()} thumbnail`} />
			)}
			<h3>{CapitalFirstLetter(name || id)}</h3>
		</button>
	);
};

export default Fitler;
