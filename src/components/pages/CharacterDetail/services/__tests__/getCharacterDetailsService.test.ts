import getCharacterDetailsService from '../getCharacterDetailsService';

/**
 * MIGRATION SAFETY NET
 *
 * These tests were added as part of the Marvel API discontinuation migration.
 * They validate dynamic character lookup by ID to maintain functional
 * navigation between character details.
 *
 * Without these tests, we would need extensive manual testing (monkey testing)
 * to ensure the migration didn't break functionality.
 *
 * Coverage focus:
 * - Happy paths: Valid ID lookup
 * - Edge cases: Invalid IDs, undefined IDs
 * - Business logic: Fallback to first character when ID not found
 */
describe('getCharacterDetailsService with dynamic lookup', () => {
  describe('Character lookup by ID', () => {
    it('finds character by valid ID', async () => {
      // ARRANGE
      const characterId = '1000000'; // Spider-Man from mockCharactersAZ.json

      // ACT
      const character = await getCharacterDetailsService(characterId);

      // ASSERT
      expect(character).toBeDefined();
      expect(character!.id).toBe(1000000);
    });

    it('returns character with correct structure', async () => {
      // ARRANGE
      const characterId = '1000000';

      // ACT
      const character = await getCharacterDetailsService(characterId);

      // ASSERT
      expect(character).toHaveProperty('id');
      expect(character).toHaveProperty('name');
      expect(character).toHaveProperty('description');
      expect(character).toHaveProperty('thumbnail');
      expect(character!.thumbnail).toHaveProperty('path');
      expect(character!.thumbnail).toHaveProperty('extension');
    });
  });

  describe('Fallback behavior', () => {
    it('returns fallback for non-existent ID', async () => {
      // ARRANGE
      const invalidId = '999999';

      // ACT
      const character = await getCharacterDetailsService(invalidId);

      // ASSERT
      expect(character).toBeDefined();
      expect(character).toHaveProperty('id');
      expect(character).toHaveProperty('name');
    });

    it('returns fallback for undefined ID', async () => {
      // ARRANGE
      const undefinedId = undefined;

      // ACT
      const character = await getCharacterDetailsService(undefinedId);

      // ASSERT
      expect(character).toBeDefined();
    });

    it('fallback returns first character from list', async () => {
      // ARRANGE
      const firstCharacter = await getCharacterDetailsService('1000000');
      const fallback = await getCharacterDetailsService('999999');

      // ACT & ASSERT
      expect(fallback!.id).toBe(firstCharacter!.id);
    });
  });
});
