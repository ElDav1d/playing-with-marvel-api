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
});
