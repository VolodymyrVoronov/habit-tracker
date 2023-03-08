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
