import logo from './logo.svg';
import './App.css';
import FileList from './FileList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileList />
      </header>
    </div>
  );
}

export default App;
