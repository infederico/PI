import axios from 'axios';
import { 
  TOGGLE_THEME,
  SEARCH_SUCCESS, SEARCH_FAIL, CLEAN_SEARCH_ERROR, GET_RECIPES, GET_DIETS,
  FILTER_BY_ORIGIN_ALL, FILTER_BY_ORIGIN_API, FILTER_BY_ORIGIN_DB,
  FILTER_BY_DIET_ALL, FILTER_BY_DIET_VEGAN, FILTER_BY_DIET_VEGETARIAN, FILTER_BY_DIET_GLUTENFREE,
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
        payload: response.data
      });
    } catch (error) {
      console.log(error.message);
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
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_BACKEND_ERRORS,
      payload: error.message
    });
  }
};


export const cleanRecipeJustCreated = () => {
  return { type: CLEAN_RECIPE_JUST_CREATED };
};


export const cleanBackendErrors = () => {
  return { type: CLEAN_BACKEND_ERRORS };
};


export const searchRecipe = (query) => async (dispatch) => {
  try {
    let response = await axios.get(`http://localhost:3001/recipes?name=${query}`);
    dispatch({
      type: SEARCH_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCH_FAIL,
      payload: error.response.data
    });
  }
};


export const cleanSearchError = () => {
  return { type: CLEAN_SEARCH_ERROR };
};


export const getRecipes = () => async (dispatch) => {
  try {
    let response = await axios.get('http://localhost:3001/recipes');
    dispatch({
      type: GET_RECIPES,
      payload: response.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDiets = () => async (dispatch) => {
  try {
    let response = await axios.get('http://localhost:3001/diets');
    dispatch({
      type: GET_DIETS,
      payload: response.data
    });
  } catch (error) {
    console.log(error.message);
  }
};


export const filterByOriginAll = () => {
  return { type: FILTER_BY_ORIGIN_ALL };
};


export const filterByOriginApi = () => {
  return { type: FILTER_BY_ORIGIN_API };
};


export const filterByOriginDb = () => {
  return { type: FILTER_BY_ORIGIN_DB };
};


export const filterByDietAll = () => {
  return { type: FILTER_BY_DIET_ALL };
};


export const filterByDietVegan = () => {
  return { type: FILTER_BY_DIET_VEGAN };
};


export const filterByDietVegetarian = () => {
  return { type: FILTER_BY_DIET_VEGETARIAN };
};


export const filterByDietGlutenfree = () => {
  return { type: FILTER_BY_DIET_GLUTENFREE };
};



