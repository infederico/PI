import { 
    TOGGLE_THEME,
    SEARCH_SUCCESS, SEARCH_FAIL, CLEAN_SEARCH_ERROR, GET_RECIPES, GET_DIETS, 
    SET_SELECTED_DIET, FILTER_BY_DIET_ALL, FILTER_BY_DIET_VEGAN, FILTER_BY_DIET_VEGETARIAN, FILTER_BY_DIET_GLUTENFREE, FILTER_BY_DIET_CUSTOM,
    SET_SELECTED_ORIGIN, FILTER_BY_ORIGIN_ALL, FILTER_BY_ORIGIN_API, FILTER_BY_ORIGIN_DB, SET_DOUBLE_FILTERED_RESULT,
    SET_SELECTED_SORT_OPTION, SET_CURRENT_PAGE, SET_FAV_CURRENT_PAGE,
    GET_RECIPE_DETAIL,
    ADD_RECIPE, ADD_BACKEND_ERRORS, CLEAN_RECIPE_DETAIL, CLEAN_RECIPE_JUST_CREATED, CLEAN_BACKEND_ERRORS } from "./actions-types";
import { GET_RANDOM_RECIPE, CLEAN_RANDOM_RECIPE } from "./actions-types";
import { GET_ALL_FAVORITES, SET_ACCESS, LOGIN_FAIL, LOGIN_SUCCESS } from "./actions-types";

const initialState = {
    //general
    theme: true,
    //login
    access: false,
    loginError: '',
    userId: '',
    username: '',
    //HomePage
    searchResult: [],
    searchError: '',
    //for filtering
    diets: [],
    selectedDiet: '',
    filteredOneResult: [],
    selectedOrigin: '',
    filteredTwoResult: [],
    doubleFilteredResult: [],
    //for sorting
    selectedSortOption: undefined,
    //for pagination
    currentPage: 1,

    //DetailPage
    recipeDetail: {},
    
    //FormPage
    recipeJustCreated: {},
    backendErrors: '', // used in user creation in Register.jsx too
    //ExplorePage
    randomRecipe: {},

    //FavPage
    favCurrentPage: 1,
    favorites: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                theme: !state.theme
            }

        case SET_ACCESS:
            return {
                ...state,
                access: !state.access,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                access: !state.access,
                userId: action.payload.id,
                username: action.payload.username
            }
        case LOGIN_FAIL:
            return {
                ...state,
               loginError: action.payload
            }

        case GET_ALL_FAVORITES:
            return {
                ...state,
                favorites: action.payload
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
        case SET_SELECTED_SORT_OPTION:
            return {
                ...state,
                selectedSortOption: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_FAV_CURRENT_PAGE:
            return {
                ...state,
                favCurrentPage: action.payload
            }

        case SET_SELECTED_DIET:
            return {
                ...state,
                selectedDiet: action.payload
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
        case FILTER_BY_DIET_CUSTOM:
            return {
                ...state,
                filteredOneResult: state.searchResult?.filter((result) => result.diets.includes(action.payload))
            }

        case SET_SELECTED_ORIGIN:
            return {
                ...state,
                selectedOrigin: action.payload
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
        case SET_DOUBLE_FILTERED_RESULT:
            return {
                ...state,
                doubleFilteredResult: action.payload
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

        case GET_RANDOM_RECIPE:
            return {
                ...state,
                randomRecipe: action.payload
            }
        case CLEAN_RANDOM_RECIPE:
            return {
                ...state,
                randomRecipe: {}
            }

        default: 
            return {
                ...state
            }
    }
};

export default rootReducer;