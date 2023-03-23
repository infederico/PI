import { 
    TOGGLE_THEME,
    SEARCH,
    GET_RECIPE_DETAIL,
    ADD_RECIPE, ADD_BACKEND_ERRORS, CLEAN_RECIPE_DETAIL, CLEAN_RECIPE_JUST_CREATED, CLEAN_BACKEND_ERRORS } from "./actions-types";

const initialState = {

    theme: true,

    searchResult: [],

    recipeDetail: {},

    recipeJustCreated: {},

    backendErrors: '',
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
        case ADD_RECIPE:
            return {
                ...state,
                recipeJustCreated: action.payload
            }
        case CLEAN_RECIPE_JUST_CREATED:
            return {
                ...state,
                recipeJustCreated: {}
            }
        case ADD_BACKEND_ERRORS:
            return {
                ...state,
                backendErrors: action.payload
            }
        case CLEAN_BACKEND_ERRORS:
            return {
                ...state,
                backendErrors: ''
            }
        default: 
            return {
                ...state
            }
    }
};

export default rootReducer;