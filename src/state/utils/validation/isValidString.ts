export interface ValidStringOptions {
  min?: number;
  max?: number;
  oneOf?: (string | RegExp)[];
}

export function isValidString(options?: ValidStringOptions) {
  return (value: unknown): boolean => {
    if (typeof value === 'string') {
      if (options) {
        const {min, max, oneOf} = options;
        if (min !== undefined && value.length < min) {
          return false;
        }
        if (max !== undefined && value.length > max) {
          return false;
        }
        if (oneOf !== undefined && !oneOf.some((validValue) => {
          if (typeof validValue === 'string') {
            return value === validValue;
          }
          return validValue.test(value);
        })) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
