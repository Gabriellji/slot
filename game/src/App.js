import { useContext, useState } from 'react';
import './App.css';
import slots from './slots';
import { GameContext } from "./context/GameContext";

function App() {

  const state = useContext(GameContext);

  const [value, setValue] = useState('');
  const [hide, setHide] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    state.submitForm(value);
    setHide('none')
  }


  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleClick = () => {
    state.startGame();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: `${hide}` }}>
          <section className="section">
            <form onSubmit={handleSubmit} className={hide}>
              <div className="div">
                <input
                  className="input"
                  onChange={handleChange}
                  type="text"
                  name="username"
                  placeholder="your username"
                />
              </div>
              <div className="div">
                <button type="submit">Register</button>
              </div>
            </form>
          </section>
        </div>
        {
          !state.state.isFinish &&  <button className={`btn ${hide}`} onClick={handleClick}>PLAY</button>
        }
       
        {
          !state.state.isFinish ? (
            <div>
              {
                state.state.indexes.length ? state.state.indexes.map((el, i)=> <img key={i} style={{ width: '100px' }} src={slots[el]} alt="slots"/>): ''
              }
            </div>
          ) : <h1> Game over</h1>
        }

      </header>
    </div>
  );
}

export default App;
