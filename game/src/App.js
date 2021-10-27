import './App.css';
import slots from './slots';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        {
          slots.map(el => <img style={{ width: '100px'}} src={el}/>)
        }
        </p>
      </header>
    </div>
  );
}

export default App;
