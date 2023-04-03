const { Router } = require('express');
const usersRouter = Router();

const registerUser = require('../controllers/registerUser');
const loginUser = require('../controllers/loginUser');
const getAllFavorites = require('../controllers/getAllFavorites');
const postFavorite = require('../controllers/postFavorite');

usersRouter.post('/register', async (req, res) => {
    try {

        const userData = req.body;
        const response = await registerUser(userData);

        if(response.error) throw new Error(response.error);

        return res.status(200).json(response); 

    } catch (error) {
        return res.status(403).send(error.message);
    }
});

usersRouter.post('/login', async (req, res) => {
    try {
        const userData = req.body;
        const response = await loginUser(userData);

        if(response.error) throw new Error(response.error);
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).send(error.message);
    }
});

usersRouter.get('/favorites/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getAllFavorites(id);

        if(response.error) throw new Error(response.error);
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).send(error.message);
    }
});

usersRouter.post('/favorites/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await postFavorite(id, req.body);

        if(response.error) throw new Error(response.error);
        
        return res.status(200).json(response)

    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = usersRouter;