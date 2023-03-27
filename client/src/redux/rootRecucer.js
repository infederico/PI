import { 
    TOGGLE_THEME,
    SEARCH_SUCCESS, SEARCH_FAIL, CLEAN_SEARCH_ERROR, GET_RECIPES, GET_DIETS,
    FILTER_BY_ORIGIN_ALL, FILTER_BY_ORIGIN_API, FILTER_BY_ORIGIN_DB,
    FILTER_BY_DIET_ALL, FILTER_BY_DIET_VEGAN, FILTER_BY_DIET_VEGETARIAN, FILTER_BY_DIET_GLUTENFREE,
    GET_RECIPE_DETAIL,
    ADD_RECIPE, ADD_BACKEND_ERRORS, CLEAN_RECIPE_DETAIL, CLEAN_RECIPE_JUST_CREATED, CLEAN_BACKEND_ERRORS } from "./actions-types";

const initialState = {
    //general
    theme: true,
    //HomePage
    searchResult: [],
    searchError: '',
    //for filtering
    diets: [],
    filteredOneResult: [],
    filteredTwoResult: [],
    doubleFilteredResult: [],
    unsortedResult: [],
    sortedResult: [],
    paginatedResult: [], // this is the array that finally render the recipes to the users
    //DetailPage
    recipeDetail: {},
    //FormPage
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

        case FILTER_BY_DIET_ALL:
            return {
                ...state,
                filteredOneResult: state.searchResult
            }
        case FILTER_BY_DIET_VEGAN:
            return {
                ...state,
                filteredOneResult: state.searchResult?.filter((result) => result.vegan === true)
            }
        case FILTER_BY_DIET_VEGETARIAN:
            return {
                ...state,
                filteredOneResult: state.searchResult?.filter((result) => result.vegetarian === true)
            }
        case FILTER_BY_DIET_GLUTENFREE:
            return {
                ...state,
                filteredOneResult: state.searchResult?.filter((result) => result.glutenFree === true)
            }

        case FILTER_BY_ORIGIN_ALL:
            return {
                ...state,
                filteredTwoResult: state.searchResult
            }
        case FILTER_BY_ORIGIN_API:
            return {
                ...state,
                filteredTwoResult: state.searchResult?.filter((result) => typeof result.id === "number")
            }
        case FILTER_BY_ORIGIN_DB:
            return {
                ...state,
                filteredTwoResult: state.searchResult?.filter((result) => typeof result.id !== "number")
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