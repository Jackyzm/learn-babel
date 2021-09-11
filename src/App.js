import logo from './logo.svg';
import { cloneDeep } from 'lodash';
import './App.css';

function App() {
  const a = { x: 11 };
  const b = cloneDeep(a);
  console.log(b);

  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
