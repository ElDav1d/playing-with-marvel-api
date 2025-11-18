import getCharacterComicsService from '../getCharacterComicsService';
import { FetchingOrder } from '../../interfaces/characterComics';

/**
 * MIGRATION SAFETY NET
 *
 * These tests were added as part of the Marvel API discontinuation migration.
 * They validate manual pagination and sorting logic for comics (shared by
 * all 100 characters due to API discontinuation).
 *
 * Without these tests, we would need extensive manual testing (monkey testing)
 * to ensure the migration didn't break functionality.
 *
 * Coverage focus:
 * - Happy paths: Normal pagination flows
 * - Edge cases: First page, last page, offset calculations
 * - Business logic: Sorting, manual pagination, data structure
 */
describe('getCharacterComicsService with manual pagination', () => {
  describe('Data structure', () => {
    it('returns correct API response structure', async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: '1000000',
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result).toHaveProperty('apiData');
      expect(result).toHaveProperty('offset');
      expect(result!.apiData).toHaveProperty('results');
      expect(result!.apiData).toHaveProperty('total');
    });
  });

  describe('Pagination', () => {
    it('returns first page of 10 comics', async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: '1000000',
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result!.apiData.results).toHaveLength(10);
      expect(result!.offset).toBe(0);
    });

    it('returns second page of 10 comics', async () => {
      // ARRANGE
      const params = {
        page: 1,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: '1000000',
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result!.apiData.results).toHaveLength(10);
      expect(result!.offset).toBe(10); // maxComics * page
    });

    it('calculates offset correctly', async () => {
      // ARRANGE
      const testCases = [
        { page: 0, maxComics: 10, expectedOffset: 0 },
        { page: 1, maxComics: 10, expectedOffset: 10 },
        { page: 2, maxComics: 10, expectedOffset: 20 },
      ];

      for (const testCase of testCases) {
        // ACT
        const result = await getCharacterComicsService({
          page: testCase.page,
          maxComics: testCase.maxComics,
          order: FetchingOrder.TITLE_AZ,
          characterId: '1000000',
        });

        // ASSERT
        expect(result!.offset).toBe(testCase.expectedOffset);
      }
    });
  });

  describe('Sorting', () => {
    it('sorts by title A-Z', async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 30, // All comics
        order: FetchingOrder.TITLE_AZ,
        characterId: '1000000',
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      const titles = result!.apiData.results.map((c) => c.title);
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sortedTitles);
    });

    it('sorts by title Z-A', async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 30,
        order: FetchingOrder.TITLE_ZA,
        characterId: '1000000',
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      const titles = result!.apiData.results.map((c) => c.title);
      const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
      expect(titles).toEqual(sortedTitles);
    });
  });
});
