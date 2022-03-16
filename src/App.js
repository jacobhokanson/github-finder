import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './components/pages/About';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';
import Alert from './components/layout/Alert';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar title='Github Finder' />
            <div className='container'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path={'/about'} element={<About />} />
                <Route path={'/user/:username'} element={<User />} />
                <Route path={'*'} element={<NotFound />} />
              </Routes>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
