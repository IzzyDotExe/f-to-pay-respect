import './App.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { InputManager } from './InputManager'
import { defaultGameData } from './GameConsts'

function App() {

  const gameData = useRef((() => {
    // Handle corrupted data, if we get an error just reset everything
    // Also serves to initialize the saved gameData on first play
    try {
      return JSON.parse(localStorage.getItem('gameData'));
    } catch (e) {
      console.log(e)
      localStorage.setItem('gameData', JSON.stringify(defaultGameData))
      return defaultGameData;
    }
  })());

  const [clicks, setClicks] = useState(gameData.current? gameData.current.clicks: 0);
  
  const cookieClick = useCallback(() => {
    setClicks(prev=>prev+1)
    localStorage.setItem('gameData', JSON.stringify({...gameData.current, clicks:gameData.current.clicks+1}));
  }, [])
 
  function cookieDown(event) {
    event.target.style.maxHeight = "80%";
  }
  
  function cookieUp(event) {
    let f = document.querySelector('img#f')
    f.style.maxHeight = "200%";
  }

  useEffect(() => {

    // Create the input manager and register the f keybind
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

    // Setup input using inputManager
    document.addEventListener('keyup', inputManager.keyHandler);
    document.addEventListener('keydown', inputManager.keyHandler);

    return () => {

      // Cleanup for input 
      document.removeEventListener('keyup', inputManager.keyHandler);
      document.removeEventListener('keydown', inputManager.keyHandler);
    }

  }, [cookieClick])

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
