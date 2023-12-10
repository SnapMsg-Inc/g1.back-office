
export const validateEmail = (email) => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email)
}

export const ValidatePassword = (password) => {
    return password.length >= 6
}