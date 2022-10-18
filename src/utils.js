
const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim());
};

const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater("");
    }, 2500);
};
const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
};
export {isValidObjField, updateError, isValidEmail}