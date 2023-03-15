const { Router } = require('express');
const dietsRouter = Router();
const getAllDiets = require('../controllers/getAllDiets');

// importar controladores 

dietsRouter.get('/', async (req, res) => {
    try {
        const allDiets = await getAllDiets();

        if(allDiets.error) throw new Error(allDiets.error);

        return res.status(200).json(allDiets); 

    } catch (error) {
        return res.status(404).send(error.message);
    }

});

module.exports = dietsRouter;