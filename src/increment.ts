export const increment = (original: number, inc: number) => {
  return original + inc;
};

export const incrementByPower = (original: number, exponent: number = 1.07) => {
  return Math.pow(original, exponent);
};
