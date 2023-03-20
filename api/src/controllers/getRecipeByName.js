const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db');

const getRecipeByName = async (name) => {
    try {
        if (name) {

            const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        
            const apiResults = apiResponse.data.results;

            const dbResponse = await Recipe.findAll({ where: { name: name } });

            const dbResults = dbResponse;

            const results = [...apiResults, ...dbResults];
            
            if (results.length === 0) throw new Error('No hay recetas que coincidan con la búsqueda'); 
        
            return results;
        } else {
            const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        
            const apiResults = apiResponse.data.results;

            return apiResults;
        }
    } catch (error) {
        return {error: error.message}
    }

};

module.exports = getRecipeByName;