import { 
    TOGGLE_THEME,
    GET_RECIPE_DETAIL } from "./actions-types";

const initialState = {

    theme: false,

    recipeDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                theme: !state.theme
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        default: 
            return {
                ...state
            }
    }
};

export default rootReducer;