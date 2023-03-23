const { Recipe } = require('../db');
const { Diet } = require('../db');

const postRecipe = async (inputRecipe) => {
    try {
        const { name, image, summary, healthScore, instructions, diets} = inputRecipe;
        
        if(!name || !image || !summary || !healthScore || !instructions || diets.length === 0) throw new Error('Faltan datos obligatorios');

        const dataRecipeForCreate = { name, image, summary, healthScore, instructions };

        //check

        // Create the new recipe in database
        const newRecipe = await Recipe.create(dataRecipeForCreate);

        // Find the diets in database to relate the created recipe
        for (let i = 0; i < diets.length; i++) {

            let relatedDiet = await Diet.findOne({ where: { name: diets[i] } });

            if (relatedDiet) {
                // Add the relation between the new recipe and diet in Recipe_Diet table
                await newRecipe.addDiet(relatedDiet);
            } else {
                // Create a new diet in the database and relate it to the new recipe
                relatedDiet = await Diet.create({ name: diets[i] });
                await newRecipe.addDiet(relatedDiet);
            }
        }
        const dataRecipe = {
            ...dataRecipeForCreate,
            diets: diets
        }
        console.info('Se ha agregado tu receta correctamente')
        return dataRecipe;

    } catch (error) {
        return {error: error.message} 
    }
};

module.exports = postRecipe;