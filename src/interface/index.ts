import synonyms from './synonyms.json';

// This method can be mocked in unit-tests
export const getSynonyms = (): Record<string, string[]> => <Record<string, string[]>>synonyms;
export const getKeys = (): string[] => Object.keys(synonyms);

/**
 * Returns a list of synonyms of  the given word, if no synonyms were found, it will return an empty array.
 * @param word
 */
export const synonym = (word: string): string[] => {
  return getSynonyms()[word] || [];
};

/**
 * Search for a specific substring to see if it's in the synonym list.
 * @param substring
 */
export const search = (substring: string): string[] => {
  return getKeys().filter((entry) => entry.includes(substring));
};
