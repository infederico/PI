import axios from 'axios';
import { 
  TOGGLE_THEME,
  GET_RECIPE_DETAIL, ADD_RECIPE } from "./actions-types";

export const toggleTheme = () => {
  return { type: TOGGLE_THEME }
};

export const getRecipeDetail = (idRecipe) => async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:3001/recipes/${idRecipe}`);
      dispatch({
        type: GET_RECIPE_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
};

export const addRecipe = (newRecipe) => async (dispatch) => {
  try {
    let response = await axios.post('http://localhost:3001/recipes', newRecipe);
    dispatch({
      type: ADD_RECIPE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};