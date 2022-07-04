import { CSSProperties, useState } from 'react';
import './Search.css';

interface SearchProps {
	className?: string;
	style?: CSSProperties;
	select?: string[];
	onSearch?: () => any;
}

const Search = ({ className, style, select, onSearch }: SearchProps) => {
	const [input, setInput] = useState<string>('');

	return (
		<div className={`search ${className}`} style={style}>
			{select && (
				<select>
					{select.map((v) => (
						<option key={v.toLowerCase()} value={v.toLowerCase()}>
							{v}
						</option>
					))}
				</select>
			)}
			<label>
				<input
					type='search'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</label>
			<button onClick={onSearch}>Search</button>
		</div>
	);
};

export default Search;
