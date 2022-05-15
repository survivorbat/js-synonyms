import fileSynonyms from './synonyms.json';
import * as main from './index';
import {synonym, getSynonyms, search, getKeys} from './index';

beforeEach(() => {
  jest.resetModules();
});

describe('getSynonyms', () => {
  it(`returns synonyms`, () => {
    // Act
    const result = getSynonyms();

    // Assert
    expect(result).toBe(fileSynonyms);
  });
});

describe('getKeys', () => {
  it(`returns keys`, () => {
    // Act
    const result = getKeys();

    // Assert
    expect(result).toEqual(Object.keys(fileSynonyms));
  });
});


describe('synonym', () => {
  const testData = [
    {
      word: 'sdjfkasdfaksfjaskldjf',
      synonyms: <Record<string, string[]>>{
        ruby: ['python', 'php', 'node'],
        haskell: ['scala'],
      },
      expectedSynonyms: [],
    },
    {
      word: 'node',
      synonyms: <Record<string, string[]>>{
        node: ['python', 'php'],
        haskell: ['scala'],
        baseball: ['football'],
      },
      expectedSynonyms: ['python', 'php'],
    },
    {
      word: 'c',
      synonyms: <Record<string, string[]>>{
        a: ['b', 'c', 'd', 'e'],
        b: ['f', 'g'],
        c: ['h'],
      },
      expectedSynonyms: ['h'],
    },
  ];

  testData.forEach(({ word, expectedSynonyms, synonyms }) => {
    it(`returns '${expectedSynonyms.join(', ')}' on input '${word}'`, () => {
      // Arrange
      jest.spyOn(main, 'getSynonyms').mockReturnValue(synonyms);

      // Act
      const result = synonym(word);

      // Assert
      expect(result).toEqual(expectedSynonyms);
    });
  });
});

describe('search', () => {
  const testData = [
    {
      substring: 'a',
      keys: ['ruby', 'python', 'php', 'node', 'haskell', 'scala'],
      expectedWords: ['haskell', 'scala'],
    },
    {
      substring: 'abc',
      keys: [
        'a', 'b', 'c', 'ab',
        'ca', 'abc',
        'cbaabc', 'aabbcc',
      ],
      expectedWords: ['abc', 'cbaabc'],
    },
    {
      substring: 'node',
      keys: [
        'b', 'c', 'd', 'e',
        'f', 'g',
        'a', 'h',
      ],
      expectedWords: [],
    },
  ];

  testData.forEach(({ substring, expectedWords, keys }) => {
    it(`returns '${expectedWords.join(', ')}' on input '${substring}'`, () => {
      // Arrange
      jest.spyOn(main, 'getKeys').mockReturnValue(keys);

      // Act
      const result = search(substring);

      // Assert
      expect(result).toEqual(expectedWords);
    });
  });
});
