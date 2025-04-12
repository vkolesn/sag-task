export const minValidMemorySizeValue = 2048;
export const maxValidMemorySizeValue = 8388608;

export const validateMemorySizeValue = (value: string): [number, boolean] => {
  const validFormatWithCommas = /^(\d{1,3})(,\d{3})*$/; // e.g. 2,048
  const validFormatNoCommas = /^\d{4,7}$/;

  if (!validFormatWithCommas.test(value) && !validFormatNoCommas.test(value)) {
    return [0, false];
  }

  const numericValue = parseInt(value.replace(/,/g, ""), 10);

  if (
    numericValue < minValidMemorySizeValue ||
    numericValue > maxValidMemorySizeValue
  ) {
    return [numericValue, false];
  }

  // NOTE: this works because JS uses 32-bit signed integers
  // for bit-wise operations
  return [numericValue, (numericValue & (numericValue - 1)) === 0];
};

export const isPowerOf2 = (n: number): boolean => n > 0 && (n & (n - 1)) === 0;
export const nextPowerOf2 = (n: number) =>
  isPowerOf2(n) ? n << 1 : 1 << (32 - Math.clz32(n - 1));
