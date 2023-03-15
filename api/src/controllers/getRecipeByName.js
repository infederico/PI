const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db');

const getRecipeByName = async (name) => {
    try {
        const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&apiKey=${API_KEY}`);
        
        const apiResults = apiResponse.data.results;

        const dbResponse = await Recipe.findAll({ where: { name: name } });

        const dbResults = dbResponse;

        const results = [...apiResults, ...dbResults];
            
        return results;

    } catch (error) {
        return {error: 'No hay recetas que coincidan con la búsqueda'}
    }

};

module.exports = getRecipeByName;