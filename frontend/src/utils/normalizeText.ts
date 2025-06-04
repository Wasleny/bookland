interface NormalizeOptions {
  replaceSpacesWith?: string | null;
  removeSpecialChars?: boolean;
}

export const normalizeText = (
  text: string,
  options: NormalizeOptions = {
    replaceSpacesWith: null,
    removeSpecialChars: true,
  }
) => {
  let normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (options.removeSpecialChars)
    normalizedText = normalizedText.replace(/[^a-zA-Z0-9\s]/g, "");

  normalizedText = normalizedText.trim();

  if (
    options.replaceSpacesWith !== null &&
    options.replaceSpacesWith !== undefined
  )
    normalizedText = normalizedText.replace(/\s+/g, options.replaceSpacesWith);

  return normalizedText.toLowerCase();
};
