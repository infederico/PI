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
                        //summary: recipe?.summary,
                        healthScore: recipe?.healthScore,
                        //instructions: recipe?.instructions,
                        diets: recipe.Diets?.map((diet) => diet.name),
                        vegetarian: recipe.Diets?.map((diet) => diet.name).includes('vegetarian'),
                        vegan: recipe.Diets?.map((diet) => diet.name).includes('vegan'),
                        glutenFree: recipe.Diets?.map((diet) => diet.name).includes('gluten free')
                    };
                    dbResults.push(recipeData);
                })
            };
            ///////////////////////////////////////////////////////mockeo de api respnse para cuando se acaba el credito diario
            const apiResponse = require('../mock/api_res.json');//await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
            let apiResults = [];
            if (apiResponse) {
                apiResponse.data.results?.map((recipe) => {
                    let recipeData = {
                        id: recipe?.id,
                        name: recipe?.title || recipe?.name,
                        image: recipe?.image,
                        //summary: recipe?.summary,
                        healthScore: recipe?.healthScore,
                        //instructions: recipe?.instructions,
                        diets: recipe?.diets,
                        vegetarian: recipe?.vegetarian,
                        vegan: recipe?.vegan,
                        glutenFree: recipe?.glutenFree,
                    };
                    apiResults.push(recipeData);
                })
            };

            const results = [...apiResults, ...dbResults];
            
            if (results.length === 0) throw new Error('There are no recipes that match the search'); 
        
            return results;
        } else {
            ///////////////////////////////////////////////////////mockeo de api respnse para cuando se acaba el credito diario
            const apiResponse = require('../mock/api_res.json'); // await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
            let apiResults = [];
            if (apiResponse) {
                apiResponse.data.results?.map((recipe) => {
                    let recipeData = {
                        id: recipe?.id,
                        name: recipe?.title || recipe?.name,
                        image: recipe?.image,
                        //summary: recipe?.summary,
                        healthScore: recipe?.healthScore,
                        //instructions: recipe?.instructions,
                        diets: recipe?.diets,
                        vegetarian: recipe?.vegetarian,
                        vegan: recipe?.vegan,
                        glutenFree: recipe?.glutenFree,
                    };
                    apiResults.push(recipeData);
                })
            };

            return apiResults;
        }
    } catch (error) {
        return {error: error.message}
    }

};

module.exports = getRecipeByName;