import { CSSProperties, useState } from 'react';
import { useQuery } from 'react-query';
import { DrinkType } from 'utils/types';
import './Search.css';

interface SearchProps {
	className?: string;
	style?: CSSProperties;
	select?: string[];
	onSearch?: ((query: string) => Promise<DrinkType[]>)[];
}

const Search = ({ className, style, select, onSearch }: SearchProps) => {
	const [input, setInput] = useState<string>('');
	const [selectIndex, setSelectIndex] = useState<number>(0);
	const { refetch } = useQuery('drinks', () => onSearch?.[selectIndex](input), {
		enabled: false
	});

	const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setSelectIndex(+value);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setInput(value);
	};

	const onClick = async () => {
		refetch();
	};

	return (
		<div className={`search ${className}`} style={style}>
			{select && (
				<select onChange={(e) => onSelectChange(e)}>
					{select.map((v, i) => (
						<option key={v.toLowerCase()} value={i}>
							{v}
						</option>
					))}
				</select>
			)}
			<label>
				<input type='search' value={input} onChange={onInputChange} />
			</label>
			<button onClick={onClick}>Search</button>
		</div>
	);
};

export default Search;
