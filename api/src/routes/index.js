const { Router } = require('express');

const recipesRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter');
const exploreRouter = require('./exploreRouter');
const usersRouter = require('./usersRouter');

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);
router.use('/explore', exploreRouter);
router.use('/users', usersRouter);

module.exports = router;