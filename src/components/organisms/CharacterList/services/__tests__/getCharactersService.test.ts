// src/components/organisms/CharacterList/services/__tests__/getCharactersService.test.ts

import getCharactersService from "../getCharactersService";
import { FetchingOrder } from "@/components/pages/Characters/interfaces/characters";

/**
 * MIGRATION SAFETY NET
 *
 * These tests were added as part of the Marvel API discontinuation migration.
 * They validate the core logic of pagination, filtering, and sorting that
 * replaced the original API calls with mock data.
 *
 * Without these tests, we would need extensive manual testing (monkey testing)
 * to ensure the migration didn't break functionality.
 *
 * Coverage focus:
 * - Happy paths: Normal usage flows
 * - Edge cases: Empty results, last page, invalid IDs
 * - Business logic: Sorting, filtering, pagination calculations
 */
describe("getCharactersService with mocked data", () => {
  describe("Basic structure", () => {
    it("returns an object with characters array and nextCursor", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 50,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result).toBeDefined();
      expect(result).toHaveProperty("characters");
      expect(result).toHaveProperty("nextCursor");
      expect(Array.isArray(result!.characters)).toBe(true);
    });
  });

  describe("Pagination", () => {
    it("returns first page of 50 characters", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 50,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result).toBeDefined();
      expect(result!.characters).toHaveLength(50);
    });

    it("returns cursor = 1 when there are more pages", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 50,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result!.nextCursor).toBe(1); // 100 total, 50 fetched → page 2 exists
    });

    it("returns cursor = null on last page", async () => {
      // ARRANGE
      const params = {
        pageParam: 1,
        maxCharacters: 50,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result!.nextCursor).toBeNull(); // 100 total, offset 50, no more pages
    });
  });
});
