import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import './styles/variables.css';
import './styles/utils.css';
import Main from 'components/Main';

const App = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<header className='App-header'>
					<div>
						<h1>Bartender's Viewer</h1>
						<p>Looking to discover a new drink? See what options you have!</p>
					</div>
				</header>
				<Main />
			</div>
		</QueryClientProvider>
	);
};

export default App;
