export interface ValidNumberOptions {
  min?: number;
  max?: number;
}

export function isValidNumber(options?: ValidNumberOptions) {
  return (value: unknown): boolean => {
    if (typeof value === 'number' && !isNaN(value)) {
      if (options) {
        const {min, max} = options;
        if (min !== undefined && value < min) {
          return false;
        }
        if (max !== undefined && value > max) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
