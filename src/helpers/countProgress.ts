/**
 * @param initialValue - initial value, the value has to be an array, otherwise it will return 0
 * @type {string[] | number | undefined}
 *
 * @param target - target value to check
 * @type {number}
 *
 * @returns value in percentage from 0 to 100
 * @type {number}
 */

const countProgress = (
  initialValue: string[] | number | undefined,
  target: number
): number => {
  if (typeof initialValue === "undefined") return 0;

  if (typeof initialValue === "number") return 0;

  let limit = 0;

  limit = Math.floor((initialValue.length * 100) / target);

  if (initialValue.length > target) {
    limit = 100;
  }

  return limit;
};

export default countProgress;
