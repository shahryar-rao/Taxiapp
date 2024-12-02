export const validateFields = (email, password, setEmailError, setPassError) => {
    let isValid = true;

    if (!email) {
        setEmailError('Fill this field');
        isValid = false;
    } else if (!email.includes('@gmail.com')) {
        setEmailError('Email should contain "@gmail.com"');
        isValid = false;
    } else {
        setEmailError(''); // Clear error if valid
    }

    if (!password) {
        setPassError('Fill this field');
        isValid = false;
    } else if (password.length < 6) {
        setPassError('Password must be at least 6 characters');
        isValid = false;
    } else {
        setPassError(''); // Clear error if valid
    }

    return isValid;
};
