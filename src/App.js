import './App.css';
import { useState, useEffect } from 'react';
import { InputManager } from './InputManager'

function App() {

  const [clicks, setClicks] = useState(0);

  function cookieClick() {
    setClicks(prev=>prev+1)
  }

  function cookieDown(event) {
    event.target.style.maxHeight = "80%";
  }
  
  function cookieUp(event) {
    let f = document.querySelector('img#f')
    f.style.maxHeight = "200%";
  }

  useEffect(() => {

    let f = document.querySelector('img#f')
    const inputManager = new InputManager()
    inputManager.addKeyHandler('f', (event) => {
      if (event.type === 'keyup') {
        cookieUp({});
        cookieClick()
      } 

      if (event.type === 'keydown') {
        cookieDown({target:f});
      }
    })

    document.addEventListener('keyup', inputManager.keyHandler);
    document.addEventListener('keydown', inputManager.keyHandler);
    return () => {
      document.removeEventListener('keyup', inputManager.keyHandler);
      document.removeEventListener('keydown', inputManager.keyHandler);
    }

  }, [])

  return (
    <div onMouseUp={cookieUp} className="app-wrapper">

      <div className='f-container'>
        <img 
          onDragStart={(e) => {
            e.preventDefault();
            return false;
          }}
          src="F_Key_Dark.png" 
          id="f"
          alt="f key"
          onMouseDown={cookieDown}
          onClick={cookieClick}
        />
      </div>
      
      <p id="clickcount">{clicks}</p>

    </div>
  );

}

export default App;
