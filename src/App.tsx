import { Outlet } from 'react-router-dom';
import './App.css';
import "./styles/variables.css";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Bartender's Viewer</h1>
          <p>Looking to discover a new drink? See what options you have!</p>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div >
  );
}

export default App;