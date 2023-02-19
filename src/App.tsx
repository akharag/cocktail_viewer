import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import './styles/variables.css';
import './styles/utils.css';
import Main from 'components/Main';
import { DrinkListProvider } from 'hooks/contexts/DrinkListContext';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<DrinkListProvider>
				<div className='App'>
					<header className='App-header'>
						<div>
							<h1>Bartender's Viewer</h1>
							<p>Looking to discover a new drink? See what options you have!</p>
						</div>
					</header>
					<Main />
				</div>
			</DrinkListProvider>
		</QueryClientProvider>
	);
};

export default App;
