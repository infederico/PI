const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');
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
                include: [{
                    model: Diet,
                    through: {
                      attributes: []
                    }
                }]
            });
            let dbResults = [];
            if (dbResponse) {
                dbResponse?.map((recipe) => {
                    let recipeData = {
                        id: recipe?.id,
                        name: recipe?.name,
                        image: recipe?.image,
                        summary: recipe?.summary,
                        healthScore: recipe?.healthScore,
                        instructions: recipe?.instructions,
                        diets: recipe.Diets?.map((diet) => diet.name),
                        vegetarian: recipe.Diets?.map((diet) => diet.name).includes('vegetarian'),
                        vegan: recipe.Diets?.map((diet) => diet.name).includes('vegan'),
                        glutenFree: recipe.Diets?.map((diet) => diet.name).includes('gluten free')
                    };
                    dbResults.push(recipeData);
                })
            }
            const apiResponse = /*{ data: { results: [] } }*/ await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        
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