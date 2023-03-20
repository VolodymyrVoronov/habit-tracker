/**
 * @param value - value/string to process
 * @type {string | undefined}
 * @param sliceStart  - start of slice
 * @type {number}
 * @param sliceEnd - end of slice
 * @type {number}
 * @param split - value to split on
 * @type {string}
 * @param reverse - reverse the order of the passed value/string
 * @type {boolean}
 * @param join - value to join with
 * @type {string}
 * @returns string or "" if value is undefined
 * @type {string}
 */
const processString = (
  value: string | undefined,
  sliceStart: number,
  sliceEnd: number,
  split: string,
  reverse: boolean,
  join: string
): string => {
  if (value === undefined) return "";

  const slicedString = value.slice(sliceStart, sliceEnd);
  const splitString = slicedString.split(split);
  const reversedString = reverse ? splitString.reverse() : splitString;
  const processedString = reversedString.join(join);

  return processedString;
};

export default processString;
