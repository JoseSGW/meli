import React from 'react'
import { SearchForm } from './SearchForm'
import '../Styles/Nav.scss'
import { Link } from 'react-router-dom'

export const Nav = () => {
    return (
        <nav className="nav contenedor">
            <div className="contenedor">
                <Link to='/'></Link>
                <SearchForm className="searchForm"/>
            </div>
        </nav>
    )
}
