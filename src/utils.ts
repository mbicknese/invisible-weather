export const isUSZip = (zip: string): boolean => /^\d{5}(-\d{4})?$/.test(zip)
