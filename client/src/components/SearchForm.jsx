import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { SearchContext } from '../context/DataSearch/SearchContext';
import "../Styles/SearchForm.scss"

export const SearchForm = () => {

    const { getData } = useContext(SearchContext);
    const [query, setquery] = useState("");
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        //ejecutar busqueda
        getData(query);
        history.push(`/items?search=${query}`);
    }


    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <input placeholder="Buscar productos, marcas y más" onChange={e => setquery(e.target.value)} value={query} type="text" />
            <button></button>
        </form>
    )
}
