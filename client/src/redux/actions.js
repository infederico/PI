import axios from 'axios';
import { 
  TOGGLE_THEME,
  SEARCH,
  GET_RECIPE_DETAIL, CLEAN_RECIPE_DETAIL,
  ADD_RECIPE, ADD_BACKEND_ERRORS, CLEAN_RECIPE_JUST_CREATED, CLEAN_BACKEND_ERRORS } from "./actions-types";


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


export const cleanRecipeDetail = () => {
  return { type: CLEAN_RECIPE_DETAIL }
};


export const addRecipe = (newRecipe) => async (dispatch) => {
  try {
    let response = await axios.post('http://localhost:3001/recipes', newRecipe);
    dispatch({
      type: ADD_RECIPE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_BACKEND_ERRORS,
      payload: error.message,
    });
  }
};


export const cleanRecipeJustCreated = () => {
  return { type: CLEAN_RECIPE_JUST_CREATED };
};


export const cleanBackendErrors = () => {
  return { type: CLEAN_BACKEND_ERRORS };
};


export const search = (query) => async (dispatch) => {
  try {
    if (query) {
    let response = await axios.get(`http://localhost:3001/recipes?name=${query}`);
    dispatch({
      type: SEARCH,
      payload: response.data,
    });
    }
    let response = await axios.get(`http://localhost:3001/recipes`);
    dispatch({
      type: SEARCH,
      payload: response.data,
    });

  } catch (error) {
    console.log(error);
  }
};

