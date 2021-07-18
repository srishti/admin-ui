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
export const editOrDeleteElementFromArray = (
  [...objectArray],
  elementId,
  newElementDataToMerge = null
) => {
  const elementIndexInArray = getElementIndexById(objectArray, elementId);
  if (elementIndexInArray > -1) {
    if (newElementDataToMerge) {
      // EDIT element when newElementDataToMerge exists
      const existingElementData = objectArray[elementIndexInArray];
      objectArray[elementIndexInArray] = {
        ...existingElementData,
        ...newElementDataToMerge,
      };
    } else {
      // DELETE element when newElementDataToMerge does not exist
      objectArray.splice(elementIndexInArray, 1);
    }
  }
  return objectArray;
};
