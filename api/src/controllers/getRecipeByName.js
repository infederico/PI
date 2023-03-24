 const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db');
const { Op } = require('sequelize');

const getRecipeByName = async (name) => {
    try {
        if (name) {

            const dbResponse = await Recipe.findAll({
                where: {    
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
            });

            const dbResults = dbResponse;

            const apiResponse = { data: { results: [] } }//await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        
            const apiResults = apiResponse.data.results;

            const results = [...apiResults, ...dbResults];
            
            if (results.length === 0) throw new Error('There are no recipes that match the search'); 
        
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