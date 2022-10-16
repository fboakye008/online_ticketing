const isValidObjField = (obj) => {
    return Object.values(obj).every((value) => value.trim());
};

const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater("");
    }, 2500);
};

const isValidPhone = (value) => {
    const regx =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    return regx.test(value);
};


export  { isValidObjField, updateError,isValidPhone };
