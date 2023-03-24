import { 
    TOGGLE_THEME,
    SEARCH_SUCCESS, SEARCH_FAIL, CLEAN_SEARCH_ERROR, GET_RECIPES, GET_DIETS,
    GET_RECIPE_DETAIL,
    ADD_RECIPE, ADD_BACKEND_ERRORS, CLEAN_RECIPE_DETAIL, CLEAN_RECIPE_JUST_CREATED, CLEAN_BACKEND_ERRORS } from "./actions-types";

const initialState = {

    theme: true,

    searchResult: [],
    searchError: '',
    diets: [],

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
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchResult: action.payload
            }
        case SEARCH_FAIL:
            return {
                ...state,
                searchError: action.payload
            }
        case CLEAN_SEARCH_ERROR:
            return {
                ...state,
                searchError: ''
            }
        case GET_RECIPES:
            return {
                ...state,
                searchResult: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
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