const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db');

const getRecipeDetail = async (idRecipe) => {

    try {
      const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
      if (apiResponse.data) {
        const { id, title, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets } = apiResponse.data;
        const name = title;
        const recipeDetail = { id, name, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets };
        return recipeDetail;
      }
    } catch (apiError) {
      console.error('Receta no encontrada en la API');
    }
  
    try {
        const dbResponse = await Recipe.findByPk(idRecipe);
        if (dbResponse) {
            const { id, name, image, summary, healthScore, instructions, diets } = dbResponse;

            const vegetarian = diets.includes('vegetarian')
            const vegan = diets.includes('vegan')
            const glutenFree = diets.includes('glutenFree');
            
            const recipeDetail = { id, name, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets };
            return recipeDetail;
        }
    } catch (dbError) {
        console.error('Receta no encontrada en la DB');
    }
  
    return {error: 'Receta no encontrada'}
  };

  module.exports = getRecipeDetail;