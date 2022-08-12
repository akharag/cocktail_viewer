import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	useEffect,
	useReducer
} from 'react';

type FitlerMap = Map<string, Set<string>>;

// ? try Set(string, string)
const initialState: FitlerMap = new Map<string, Set<string>>();

type ActionTypes =
	| { type: 'add'; payload: [key: string, value: string] }
	| { type: 'remove'; payload: [key: string, value: string] };

const filterReducer = (state: typeof initialState, action: ActionTypes) => {
	const [key, value] = action.payload;
	const set = state.get(key) ?? new Set();

	switch (action.type) {
		case 'add':
			set.add(value);
			state.set(key, new Set(set));
			return new Map(state);
		case 'remove':
			set.delete(value);
			state.set(key, new Set(set));
			return new Map(state);
		default:
			throw new Error('Bad Action');
	}
};

interface FilterListContextInterface {
	filters: typeof initialState;
	filtersDispatch?: Dispatch<ActionTypes>;
}

export const FilterListIntialContext: FilterListContextInterface = {
	filters: initialState
};

export const FilterListContext = createContext<FilterListContextInterface>(
	FilterListIntialContext
);

export const FilterListProvider: FC<{ children?: ReactNode }> = ({
	children
}) => {
	const [filters, filtersDispatch] = useReducer(filterReducer, initialState);

	// const [filters, setFitlers] = useSessionStorage<FitlerMap>('filters');
	const value: FilterListContextInterface = {
		filters: filters,
		filtersDispatch: filtersDispatch
	};
	return (
		<FilterListContext.Provider value={value}>
			{children}
		</FilterListContext.Provider>
	);
};
