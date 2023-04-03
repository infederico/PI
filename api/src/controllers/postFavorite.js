const { Favorite } = require('../db');
const { Diet } = require('../db');
const { User } = require('../db');

const postFavorite = async (userId, inputFavorite) => {
    try {
        const { name, image, summary, healthScore, instructions, diets } = inputFavorite;

        if(!userId || !name || !image || !summary || !healthScore || !instructions || diets.length === 0) throw new Error('Required fields missing');

        // Create the new recipe in database but in favorite model and table
        const newFavorite = await Favorite.create(inputFavorite);

        // Find the diets in database to relate the created favorite
        for (let i = 0; i < diets.length; i++) {

            let relatedDiet = await Diet.findOne({ where: { name: diets[i] } });

            if (relatedDiet) {
                // Add the relation between the new recipe and diet in Recipe_Diet table
                await newFavorite.addDiet(relatedDiet);
            } else {
                // Create a new diet in the database and relate it to the new recipe
                relatedDiet = await Diet.create({ name: diets[i] });
                await newFavorite.addDiet(relatedDiet);
            }
        }

        let user = await User.findOne({ where: { id: userId } });

        if (!user) throw new Error('Invalid user');
        if (user) user.addFavorite(newFavorite);
        
        console.info('Favorite created successfully')
        return newFavorite;

    } catch (error) {
        return {error: error.message} 
    }
};

module.exports = postFavorite;