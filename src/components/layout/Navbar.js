import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar ({title}) {
    return (
        <nav className="navbar bg-primary">
            <Link to='/'><FaGithub size="2em" /><h1 style={{ display: 'inline', padding: '10px' }}>{title}</h1></Link>
            <ul>
                <li><Link to='/about'>About</Link></li>
            </ul>
        </nav>
      )
}

Navbar.defaultProps = {
    title: 'default',
}

Navbar.propTypes = {
    title: PropTypes.string
}

export default Navbar