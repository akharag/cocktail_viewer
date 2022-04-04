import './Search.css';

interface SearchProps {
  select?: string[];
  onSearch?: () => any;
}

function Search({ select, onSearch }: SearchProps) {
  return (
    <div className="search">
      {select && (
        <select>
          {select.map((v) => (
            <option value={v}>{v}</option>
          ))}
        </select>
      )}
      <label>
        <input type="search" />
      </label>
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default Search;
