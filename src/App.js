import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './components/pages/About';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const searchUsers = async (text) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setLoading(false);
        setUsers(res.data.items);
    };

    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUser(res.data);
        setLoading(false);
    };

    const getUsersRepos = async (username) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setRepos(res.data);
        setLoading(false);
    };

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    const sendAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => setAlert(null), 5000);
    };

    return (
        <Router>
            <Fragment>
                <Navbar title='Github Finder' />
                <div className='container'>
                    <Alert alert={alert} />
                    <Routes>
                        <Route
                            exact
                            path='/'
                            element={
                                <Fragment>
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        sendAlert={sendAlert}
                                    />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            }
                        />
                        <Route exact path={'/about'} element={<About />} />
                        <Route
                            exact
                            path={'/user/:username'}
                            element={
                                <User
                                    getUser={getUser}
                                    getUsersRepos={getUsersRepos}
                                    repos={repos}
                                    user={user}
                                    loading={loading}
                                />
                            }
                        />
                    </Routes>
                </div>
            </Fragment>
        </Router>
    );
};

export default App;
