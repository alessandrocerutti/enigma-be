const isArrayNullOrEmpty = (array) =>{
    if (Array.isArray(array) && array.length) {
        return false;
    }
    return true;
}

module.exports = {
    isArrayNullOrEmpty
}