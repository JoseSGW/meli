import { types } from "../../types";


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {

    switch (action.type) {
        case types.SET_ITEMS:
            return {
                ...state,
                items: state.items.splice().concat(action.payload.items),
                author: { ...action.payload.author },
                categories: state.categories.splice().concat(action.payload.categories),
                breadcrumb: state.breadcrumb.splice().concat(action.payload.breadcrumb)
            }
        case types.ADD_CRUMBS:
            return {
                ...state,
                breadcrumb: state.breadcrumb.concat(action.payload)
            }
        case types.PREV_CRUMBS:
                return {
                    ...state,
                    breadcrumb: state.breadcrumb.splice().concat(action.payload)
                }
        default:
            return state;
    }

}

