// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate User
 * @param userObj
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateUser(userObj) {
    // Check required fields
    let result = validateLib.checkRequired("username", userObj.username);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkRequired("email", userObj.email);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkRequired("phone", userObj.phone);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkRequired("password", userObj.password);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkRequired("passwordcontrol", userObj.passwordcontrol);
    if (result.isNotValid) {
        return result;
    }


    result = validateLib.checkLength("username", userObj.username, 3, 30);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkEmail("email", userObj.email);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkPasswordMatch("passwordcontrol", userObj.password, userObj.passwordcontrol);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkLength("password", userObj.password, 6, 20);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkPhone("phone", userObj.phone);
    if (result.isNotValid) {
        return result;
    }

    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateUser
}
