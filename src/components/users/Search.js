import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showClear, searchUsers, clearUsers, sendAlert }) => {
    const [text, setText] = useState('');

    const onChange = (e) => setText(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            sendAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                    type='text'
                    name='text'
                    placeholder='Search here...'
                    value={text}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block'
                />
            </form>
            {showClear && (
                <button className='btn-light btn-block' onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    sendAlert: PropTypes.func.isRequired,
};

export default Search;
