import { GET_RECIPE_DETAIL } from "./actions-types";

const initialState = {
    recipeDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
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