const { Recipe } = require('../db');
const { Diet } = require('../db');

const postRecipe = async (inputRecipe) => {
    try {
        const { name, image, summary, healthScore, instructions, diet } = inputRecipe;
        
        if(!name || !image || !summary || !healthScore || !instructions || !diet ) throw new Error('Faltan datos obligatorios');

        const dataRecipe = { name, image, summary, healthScore, instructions, diet };

        // Create the new recipe in database
        const newRecipe = await Recipe.create(dataRecipe)

        // Find the diet in database
        for (let i = 0; i < diet.length; i++) {

            const relatedDiet = await Diet.findOne({ where: { name: diet[i] } });

            // Add the relation between the new recipe and diet in Recipe_Diet table
            await newRecipe.addDiet(relatedDiet);
        }

        console.info('Se ha agregado tu receta correctamente')
        return dataRecipe;

    } catch (error) {
        return {error: error.message} 
    }
};

module.exports = postRecipe;