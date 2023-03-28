const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');

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
      console.error('Recipe not found in API');
    }
  
    try {
      const dbResponse = await Recipe.findByPk(idRecipe, {
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      })
      if (dbResponse) {
        const { id, name, image, summary, healthScore, instructions, Diets } = dbResponse;
        const diets = Diets.map((diet) => diet.name);

        const vegetarian = diets.includes('vegetarian');
        const vegan = diets.includes('vegan');
        const glutenFree = diets.includes('gluten free');

        const recipeDetail = { id, name, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets };
        return recipeDetail;
      }
    } catch (dbError) {
        console.error('Recipe not found in DB');
    }
  
    return {error: 'Recipe not found'}
  };

  module.exports = getRecipeDetail;