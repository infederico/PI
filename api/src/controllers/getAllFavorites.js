const { Favorite } = require('../db');

const getAllFavorites = async (userId) => {
    try {
        const allFavorites = await Favorite.findAll({
            where: { userId: userId },
            include: [{
                model: Recipe,
                include: [{ 
                    model: Diet,
                    through: { attributes: [] } // to exclude the junction table attributes
                }]
            }]  
        });
        return allFavorites;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = getAllFavorites;
