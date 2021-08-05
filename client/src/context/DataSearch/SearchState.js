import React, { useReducer } from "react";
import { types } from "../../types";
import { SearchContext } from "./SearchContext";
import SearchReducer from "./SearchReducer";

export const SearchState = (props) => {

    const initialState = {
        author: {},
        categories: [],
        items: [],
        breadcrumb: [],
    }

    const [state, dispatch] = useReducer(SearchReducer, initialState);

    const getData = async (query) => {
        const response = await fetch(`http://localhost:3001/api/items?q=${query}`);
        const data = await response.json();
        
        dispatch({
            type: types.SET_ITEMS,
            payload: data
        });
    }

    const addCrumbs = (crumbs) => {
        dispatch({
            type: types.ADD_CRUMBS,
            payload: crumbs
        })
    }

    const previousBreadCrumb = (prevBC) => {
        dispatch({
            type: types.PREV_CRUMBS,
            payload: prevBC
        })
    }


    return (
        <SearchContext.Provider value={{ getData, addCrumbs, previousBreadCrumb, items: state.items, breadcrumb: state.breadcrumb }}>
            {props.children}
        </SearchContext.Provider>
    )

}