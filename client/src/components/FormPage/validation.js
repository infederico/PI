const validation = (recipeData) => {
    let { name, image, summary, healthScore, instructions, diets } = recipeData;
    let errors = {};
    
    
    // NAME
    if (!name) {
        errors.name1 = 'This field is required';
    } // DB requirement - allowNull: false

    const regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(name)) {
        errors.name2 = 'This field only accept alphabetical characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    
    if (name.length > 255) {
        errors.name3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    
    //IMAGE
    if (!image) {
        errors.image1 = 'This field is required';
    } // DB requirement - allowNull: false
    
    const regexImage = /\b(https?|ftp):\/\/\S+\.(jpg|jpeg|png|gif)\b/;
    if (!regexImage.test(image)) {
        errors.image2 = 'This field only accept a valid "http" or "ftp" url link to an image file (supported formats: jpg-jpeg-png-gif)';
    } // developer decision - must be a valid link and control if the format of the file is supported
    
    if (image.length > 255) {
        errors.image3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    

    //SUMMARY
    if (!summary) {
        errors.summary = 'This field is required';
    } // DB requirement - allowNull: false, type: DataTypes.TEXT - unlimited characters


    //HEALTH SCORE
    if (!healthScore) {
        errors.healthScore1 = 'This field is required';
    } // DB requirement - allowNull: false  

    if (!(Number.isInteger(Number(healthScore)))) {
        errors.healthScore2 = 'Health Score must be an integer number';
    } // DB requirement - type: DataTypes.INTEGER - must be an integer
    
    if (healthScore < 1 || healthScore > 100) {
        errors.healthScore3 = 'Health Score must be between 1 and 100';
    } // developer decision - must be a number between 1 and 100
    

    //SUMMARY
    if (!instructions) {
        errors.instructions = 'This field is required';
    } // DB requirement - allowNull: false, type: DataTypes.TEXT - unlimited characters


    //DIETS
    if (diets.length === 0) {
        errors.diets = 'Every new recipe must have at least 1 diet associated to it';
    } // requisito readme - every new recipe crated must have at least 1 diet associated to it


    return errors;
};

export default validation;