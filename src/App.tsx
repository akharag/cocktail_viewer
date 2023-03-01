import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import './styles/variables.css';
import './styles/utils.css';
import Main from 'components/Main';
import { DrinkProvider } from 'hooks/contexts/DrinkContext';
import Header from 'components/Header/Header';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<DrinkProvider>
				<div className='App'>
					<Header />
					<Main />
				</div>
			</DrinkProvider>
		</QueryClientProvider>
	);
};

export default App;
