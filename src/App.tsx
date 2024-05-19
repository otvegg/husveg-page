import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Bris from './components/pages/Bris';
import H2O from './components/pages/H2O';
import Timian from './components/pages/Timian';

import StartPage from './components/Startpage';
import RecorderPage from './components/pages/Timian/RecorderPage';
import GithubDemos from './components/pages/Timian/GithubDemos';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar title='Husveg.net' />
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/h2o' element={<H2O />} />
          <Route path='/bris' element={<Bris />} />
          <Route path='/timian' element={<Timian />} />
          <Route path='/timian/recorderpage' element={<RecorderPage />} />
          <Route path='/timian/githubdemos' element={<GithubDemos />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
