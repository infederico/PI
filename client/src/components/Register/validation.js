const validation = (userData) => {
    let { name, surname, username, email, password } = userData;
    let errors = {};

    //name
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
    
    //surname
    if (!surname) {
        errors.surname1 = 'This field is required';
    } // DB requirement - allowNull: false
    const regexSurname = /^[a-zA-Z\s]*$/;
    if (!regexSurname.test(surname)) {
        errors.surname2 = 'This field only accept alphabetical characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (surname.length > 255) {
        errors.surname3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    //username
    if (!username) {
        errors.userame1 = 'This field is required';
    } // DB requirement - allowNull: false
    const regexUsername = /^[a-z0-9]+$/;
    if (!regexUsername.test(username)) {
        errors.username2 = 'This field only accept alphanumerical characters';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (username.length > 255) {
        errors.username3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    //email
    if (!email) {
        errors.email1 = 'This field is required';
    } // DB requirement - allowNull: false
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        errors.email2 = 'This field must be an email';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (email.length > 255) {
        errors.email3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported
    
    //password
    if (!password) {
        errors.password1 = 'This field is required';
    } // DB requirement - allowNull: false
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[\w!@#$%^&*()_+]{8,}$/;
    if (!regexPassword.test(password)) {
        errors.password2 = 'This field must have at least one lowercase letter, at least one uppercase letter, at least one number, at least one special character and the password must be at least 8 characters long';
    } // developer decision - STRINGs can support any UTF-16 characters
    if (password.length > 255) {
        errors.password3 = 'This field support up to 255 characters'
    } // DB requirement - type: DataTpes.STRING, by default 255 characters supported

    return errors;
};

export default validation;
    