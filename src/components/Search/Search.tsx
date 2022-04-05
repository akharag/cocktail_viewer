import { useState } from 'react';
import './Search.css';

interface SearchProps {
  select?: string[];
  onSearch?: () => any;
}

function Search({ select, onSearch }: SearchProps) {
  const [input, setInput] = useState<string>('');

  return (
    <div className="search">
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
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default Search;
