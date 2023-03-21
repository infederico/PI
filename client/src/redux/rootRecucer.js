import { 
    TOGGLE_THEME,
    SEARCH,
    GET_RECIPE_DETAIL, CLEAN_RECIPE_DETAIL } from "./actions-types";

const initialState = {

    theme: true,

    searchResult: [],

    recipeDetail: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                theme: !state.theme
            }
        case SEARCH:
            return {
                ...state,
                searchResult: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case CLEAN_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: {}
            }
        default: 
            return {
                ...state
            }
    }
};

export default rootReducer;