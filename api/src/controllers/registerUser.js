const { User } = require('../db');

const registerUser = async (userData) => {
    try {
        const { name, surname, email, username, password } = userData;

        if(!name || !surname || !username || !email || !password) throw new Error('All fields are required to register');

        //check if there is available username and email
        const existingEmail = await User.findOne({
            where: {    
                email: email, 
            }
        });
        const existingUsername = await User.findOne({
            where: {    
                username: username
            }
        });
     
        if (existingEmail) {
            throw new Error('email is not available')
        };
        if (existingUsername) {
            throw new Error('username is not available')
        };
        // Create the new user in database
        const newUser = await User.create(userData);

        console.info('User created successfully')
        return newUser;
    } catch (error) {
        return {error: error.message} 
    }
};

module.exports = registerUser;