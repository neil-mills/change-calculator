import React from 'react';
import 'bulma/css/bulma.css';
import Calculator from './components/Calculator';
import Results from './components/Results';
import { GlobalProvider } from './GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <div className="App section">
        <Calculator />
        <Results />
      </div>
    </GlobalProvider>
  );
}

export default App;
