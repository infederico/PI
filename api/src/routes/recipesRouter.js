const { Router } = require('express');

const recipesRouter = Router();

// importar controladores 
const getRecipeDetail = require('../controllers/getRecipeDetail');
const getRecipeByName = require('../controllers/getRecipeByName');
const postRecipe = require('../controllers/postRecipe');


recipesRouter.get('/:idRecipe', async (req, res) => {
    try {
        const { idRecipe } = req.params;
        const recipeDetail = await getRecipeDetail(idRecipe);

        if(recipeDetail.error) throw new Error(recipeDetail.error);

        return res.status(200).json(recipeDetail); 

    } catch (error) {
        return res.status(404).send(error.message);
    }

});


recipesRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const results = await getRecipeByName(name);
        
        if (results.error) throw new Error(results.error);

        return res.status(200).json(results);

    } catch (error) {
        return res.status(404).send(error.message);
    }
});


recipesRouter.post('/', async (req, res) => {
try {
    const newRecipe = await postRecipe(req.body);

    if(newRecipe.error) throw new Error(newRecipe.error);
    
    return res.status(200).json(newRecipe)

} catch (error) {
    return res.status(404).send(error.message);
}
});


module.exports = recipesRouter;