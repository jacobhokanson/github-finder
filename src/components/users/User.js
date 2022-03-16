import React, { Fragment, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheck, FaTimesCircle } from 'react-icons/fa';

import GithubContext from '../../context/github/githubContext';

import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';

const User = () => {
  const { user, getUser, loading, getRepos, repos } = useContext(GithubContext);

  const { username } = useParams();

  const {
    name,
    avatar_url,
    location,
    company,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  useEffect(() => {
    getUser(username);
    getRepos(username);
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to={'/'} className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <FaCheck className='text-success' />
      ) : (
        <FaTimesCircle className='text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt='user avatar'
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          {location && (
            <Fragment>
              <p>Location: {location}</p>
            </Fragment>
          )}
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className='btn btn-dark my-1'
            target='_blank'
            rel='noreferrer'
          >
            Visit GitHub Profile
          </a>
          <ul>
            <li>
              <strong>Username: </strong>
              {login}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong>
                  {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
