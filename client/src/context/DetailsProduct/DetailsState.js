import React, { useReducer } from "react";
import { types } from "../../types";
import { DetailsContext } from "./DetailsContext";
import DetailsReducer from "./DetailsReducer";


export const DetailsState = (props) => {

    const initialState = {
        author: {},
        item: {},
        breadcrumbItem: []
    }

    const [state, dispatch] = useReducer(DetailsReducer, initialState);

    const getData = async (id) => {
        const response = await fetch(`http://localhost:3001/api/items/${id}`);
        const data = await response.json();
        
        dispatch({
            type: types.SET_ITEMS,
            payload: data
        });
    }

    const clearBread = () => {
        dispatch({
            type: types.CLEAR_BREAD,
        });
    }


    return (
        <DetailsContext.Provider value={{ getData, clearBread, item: state.item, breadcrumbItem: state.breadcrumbItem }}>
            {props.children}
        </DetailsContext.Provider>
    )

}