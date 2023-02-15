// check if to objects are equal or not
function isDeepEqual(obj1: any, obj2: any) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // if the length of the keys is different, then the objects are not equal
    if (keys1.length !== keys2.length) return false;
    // if either keys or values not equal, then the objects are not equal
    for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);
        // recursive call if there are any nested objects
        // (areObjects && !deepEqual(val1, val2)) indicates that
        // as soon as the compared properties are objects,
        // a recursive call starts to verify whether the nested objects are equal too.
        if (
            (areObjects && !isDeepEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)
        )
            return false;
    }
    return true;
}
// helper function for deepEqual
function isObject(object: any) {
    return object != null && typeof object === "object";
}

export { isDeepEqual };
