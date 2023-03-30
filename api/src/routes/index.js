const { Router } = require('express');

const recipesRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter');

const exploreRouter = require('./exploreRouter');

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);

router.use('/explore', exploreRouter);

module.exports = router;