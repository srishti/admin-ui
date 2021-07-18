/*
===========
HELPER FUNCTIONS
===========
*/

/**
 * Function to check if a given string is a substring of the target string where case sensitivity is immaterial
 * @param {String} taregetString - string which needs to be searched inside
 * @param {String} subString - string to be looked for
 * @returns
 */
export const checkIfCaseInsensitiveSubstring = (taregetString, subString) => {
  return taregetString.toLowerCase().includes(subString.toLowerCase());
};

/**
 * Function to the index of an element with given ID from an array of objects where each object contains the `id` property
 * @param {Array} objectArray - array of objects to be searched inside
 * @param {String} elementId - ID of element to be searched
 * @returns id of the element in the array; returns -1 if element is not found in array
 */
export const getElementIndexById = ([...objectArray], elementId) => {
  return objectArray.findIndex((element) => element.id === elementId);
};
