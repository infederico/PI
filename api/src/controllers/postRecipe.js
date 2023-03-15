const { Recipe } = require('../db');

const postRecipe = async (newRecipe) => {
    try {
        const { name, image, summary, healthScore, instructions } = newRecipe;
        
        if(!name || !image || !summary || !healthScore || !instructions) throw new Error('Faltan datos obligatorios');

        const postedRecipe = { name, image, summary, healthScore, instructions };

        await Recipe.create(postedRecipe)

        console.info('Se ha agragado con éxito tu receta')

        return postedRecipe;
        
    } catch (error) {
        return {error: error.message} 
    }

};

module.exports = postRecipe;