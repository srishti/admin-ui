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

/**
 * Function to the edit/delete an element with given ID from an array of objects where each object contains the `id` property
 * @param {Array} objectArray - array of objects to be searched inside
 * @param {String} elementId - ID of element to be edited/deleted
 * @param {Object} newElementDataToMerge - new data to be merged with element's existing data to be edited
 * @returns updated array
 */
export const editOrDeleteElementFromArrayById = (
  [...objectArray],
  elementId,
  newElementDataToMerge = null
) => {
  if (newElementDataToMerge) {
    // EDIT element when newElementDataToMerge exists
    objectArray = objectArray.map((objectElement) => {
      if (objectElement.id === elementId) {
        return {
          ...objectElement,
          ...newElementDataToMerge,
        };
      } else {
        return objectElement;
      }
    });
  } else {
    // DELETE element when newElementDataToMerge does not exist
    objectArray = objectArray.filter(
      (objectElement) => objectElement.id !== elementId
    );
  }
  return objectArray;
};

/**
 * Function to the edit/delete an element with given value from an array of strings
 * @param {Array} array - array to be searched inside
 * @param {String} elementExistingValue - value of element to be edited/deleted
 * @param {String} elementNewValue - new value of element to be edited
 * @returns updated array
 */
export const editOrDeleteElementFromArray = (
  [...array],
  elementExistingValue,
  elementNewValue = null
) => {
  if (elementNewValue) {
    // EDIT element when elementNewValue exists
    array = array.filter((element) => element === elementExistingValue);
    for (let element of array) {
      element = elementNewValue;
    }
  } else {
    // DELETE element when elementNewValue does not exist
    array = array.filter((element) => element !== elementExistingValue);
  }
  return array;
};
