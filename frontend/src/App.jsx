import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Portfolio from './Portfolio';
import FooterP from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header><Header /></header>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
        <footer><FooterP /></footer>
      </BrowserRouter>
    </>
  );
};

export default App;
