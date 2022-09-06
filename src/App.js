import React from 'react';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

function App() {
  return (
    <div>
      <SearchBar/>
      <Routes>
        <Route path='/:category/:num' element={<Results />}/>
      </Routes>
    </div>
  );
}

export default App;
