const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getRandomRecipe = async () => {

    try {//////////////////////////////////////////////////// mockeado de api response para no agotar el credito diario 
      const apiResponse = require('../mock/random_res.json') //await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`);
      if (apiResponse.data) {
        // to simulate the only one result returned by the API with number setted in 1 in endpoint
        let random = Math.floor(Math.random() * 100);
        // cuando no se mockea la response de la api borrar el [random] si no va a romper
        const { id, title, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets } = apiResponse.data.recipes[random];
        const name = title;
        const randomRecipe = { id, name, image, summary, healthScore, instructions, vegetarian, vegan, glutenFree, diets };
        return randomRecipe;
      }
    } catch (error) {
      return {error: error.message};
    }
  };

  module.exports = getRandomRecipe;