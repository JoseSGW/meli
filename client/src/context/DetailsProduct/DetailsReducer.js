import { types } from "../../types";


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {

    switch (action.type) {
        case types.SET_ITEMS:
            return {
                ...state,
                item: {...action.payload.item },
                author: { ...action.payload.author },
            }
        default:
            return state;
    }

}