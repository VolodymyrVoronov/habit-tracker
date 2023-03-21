/**
 * @param initialValue - initial value of string
 * @type {string}
 *
 * @param target - target value to check
 * @type {number}
 *
 * @returns true of false
 * @type {boolean}
 */

const checkLimit = (initialValue: string, target: number): boolean => {
  if (initialValue.length >= target) {
    return true;
  }

  return false;
};

export default checkLimit;
