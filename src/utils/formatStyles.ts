export const decimalDefault: Intl.NumberFormatOptions = {
  style: 'decimal'
};

const decimalDefaultNumberFormatCache: Record<string, Intl.NumberFormat> = {};

export function formatDecimalDefault(locale: string, value: number) {
  let numberFormat = decimalDefaultNumberFormatCache[locale];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locale, decimalDefault);
    decimalDefaultNumberFormatCache[locale] = numberFormat;
  }
  return numberFormat.format(value);
}

export const decimalLargeFixed: Intl.NumberFormatOptions = {
  style: 'decimal',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3
};

const decimalLargeFixedNumberFormatCache: Record<string, Intl.NumberFormat> = {};

export function formatDecimalLargeFixed(locale: string, value: number) {
  let numberFormat = decimalLargeFixedNumberFormatCache[locale];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locale, decimalLargeFixed);
    decimalLargeFixedNumberFormatCache[locale] = numberFormat;
  }
  return numberFormat.format(value);
}

export const percentMedium: Intl.NumberFormatOptions = {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
};

const percentMediumNumberFormatCache: Record<string, Intl.NumberFormat> = {};

export function formatPercentMedium(locale: string, value: number) {
  let numberFormat = percentMediumNumberFormatCache[locale];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locale, percentMedium);
    percentMediumNumberFormatCache[locale] = numberFormat;
  }
  return numberFormat.format(value);
}

export const percentMediumFixed: Intl.NumberFormatOptions = {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
};

const percentMediumFixedNumberFormatCache: Record<string, Intl.NumberFormat> = {};

export function formatPercentMediumFixed(locale: string, value: number) {
  let numberFormat = percentMediumFixedNumberFormatCache[locale];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locale, percentMediumFixed);
    percentMediumFixedNumberFormatCache[locale] = numberFormat;
  }
  return numberFormat.format(value);
}

export const filesizeCompact: Intl.NumberFormatOptions = {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
};

const filesizeCompactNumberFormatCache: Record<string, Intl.NumberFormat> = {};

export function formatFilesizeCompact(locale: string, value: number) {
  let numberFormat = filesizeCompactNumberFormatCache[locale];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locale, filesizeCompact);
    filesizeCompactNumberFormatCache[locale] = numberFormat;
  }
  return numberFormat.format(value);
}

export const filesizeLong: Intl.NumberFormatOptions = {
  notation: "standard",
  style: "unit",
  unit: "byte",
  unitDisplay: "long",
};

const filesizeLongNumberFormatCache: Record<string, Intl.NumberFormat> = {};

export function formatFilesizeLong(locale: string, value: number) {
  let numberFormat = filesizeLongNumberFormatCache[locale];
  if (!numberFormat) {
    numberFormat = new Intl.NumberFormat(locale, filesizeLong);
    filesizeLongNumberFormatCache[locale] = numberFormat;
  }
  return numberFormat.format(value);
}
