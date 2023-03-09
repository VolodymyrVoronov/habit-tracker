const checkLimit = (initialValue: string, target: number): boolean => {
  if (initialValue.length >= target) {
    return true;
  }

  return false;
};

export default checkLimit;
