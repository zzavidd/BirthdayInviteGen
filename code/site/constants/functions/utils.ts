import { DEFAULT_FILENAME_TEMPLATE } from 'constants/variables';

/**
 * Substitutes a specified name in the filename template.
 * @param fileNameTemplate A specified template. Could be an empty string.
 * @param selectedName The specified name.
 * @returns The filename.
 */
export function substituteName(
  fileNameTemplate: string,
  selectedName: string,
): string {
  const template = fileNameTemplate || DEFAULT_FILENAME_TEMPLATE;
  return template.replace('[name]', selectedName);
}

/**
 * Returns a value, the lower bound if beneath minimum or upper bound if beyond
 * maximum.
 * @param value The value.
 * @param min The lower bound.
 * @param max The upper bound.
 * @returns The resulting value.
 */
export function minmax(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, value), max);
}
