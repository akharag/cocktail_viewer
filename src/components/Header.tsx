import { useState, useRef } from "react";
import { api } from "~/utils/api";
import Spinner from "~/components/Spinner";
import useDebounce from "~/utils/hooks/useDebounce";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const debounceQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: found,
    isLoading,
    isError,
  } = api.drinksRouter.getByQuery.useQuery(debounceQuery);

  return (
    <header className="w-full text-center text-slate-200">
      <div className="mx-auto flex items-center md:w-3/4">
        <Link href="/">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <h1 className="mx-auto py-4 text-lg">Behind the Bar</h1>
      </div>
      <div className="ps-6.5 mx-auto inline-flex w-10/12 max-w-xl justify-between gap-2 rounded-full bg-slate-600 py-2 pe-2 ps-5 text-lg font-thin">
        <input
          type="text"
          placeholder="Search Drinks"
          className="flex-1 bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button className="aspect-square w-10 rounded-full bg-slate-400 p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
          </svg>
        </button>
      </div>
      {query !== "" && focused && (
        <div className="ps-6.5 absolute left-0 right-0 z-10 m-2 mx-auto max-w-xl rounded-3xl bg-slate-200 px-3 py-1 text-black shadow-sm">
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <p>Error while searching</p>
          ) : found && found.length > 0 ? (
            <ul>
              {found?.map((drink) => (
                <li key={drink.name}>{drink.name}</li>
              ))}
            </ul>
          ) : (
            <li>No Items Found</li>
          )}
        </div>
      )}
    </header>
  );
};
