const validation = (userData) => {
    let { username, password } = userData;
    let errors = {};

     //username
     if (!username) {
        errors.userame1 = 'This field is required';
    } // DB requirement - allowNull: false
    const regexUsername = /^[a-z0-9]+$/;
    if (!regexUsername.test(username)) {
        errors.username2 = 'This field only accept alphanumerical lowercase characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (username.length > 255) {
        errors.username3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported

    //password
    if (!password) {
        errors.password1 = 'This field is required';
    } // DB requirement - allowNull: false
    if (password.length > 255) {
        errors.password2 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported

    return errors;
};

export default validation;