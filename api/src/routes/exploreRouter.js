const { Router } = require('express');
const exploreRouter = Router();
 
const getRandomRecipe = require('../controllers/getRandomRecipe');

exploreRouter.get('/random', async (req, res) => {
    try {
        const randomRecipe = await getRandomRecipe();

        if(randomRecipe.error) throw new Error(randomRecipe.error);

        return res.status(200).json(randomRecipe); 

    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = exploreRouter;