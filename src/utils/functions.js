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
