const { Router } = require('express');

const recipesRouter = require('./recipesRouter');
const dietsRouter = require('./dietsRouter');

const router = Router();

router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);

module.exports = router;