// utils/validatePassword.ts

/**
 * Validates if a password meets the criteria:
 * - At least 6 characters long
 * - Contains both letters (upper or lower case) and numbers
 * @param password - The password to validate
 * @returns True if valid, false otherwise
 */
export function validatePassword(password: string): boolean {
    // Regex to check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isValidLength = password.length >= 6;
    console.log("hasLetter: ", hasLetter);
    console.log("hasNumber: ", hasNumber);
    console.log("isValidLength: ", isValidLength);

    let ret = false;
    if(hasLetter && hasNumber && isValidLength){
        ret = true;
    }

    console.log("ret: ", ret);
    return ret;
}
