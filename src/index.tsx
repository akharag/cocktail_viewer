import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import App from './App';
import { DrinkListProvider } from 'hooks/contexts/DrinkListContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<StrictMode>
		<DrinkListProvider>
			<App />
		</DrinkListProvider>
	</StrictMode>
);
