import { renderHook } from '@testing-library/react';
import useFilteredCharacters from '../useFilteredCharacters';
import mockCharactersAZ from '../../mocks/mockCharactersAZ.json';

const mockCharacters = JSON.parse(JSON.stringify(mockCharactersAZ));

it('should return all characters when no filters are applied', () => {
  // ARRANGE
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: false, withDescription: false }),
  );

  // ASSERT
  expect(result.current).toEqual(mockCharacters);
});

it('should return characters with image when image filter is applied', () => {
  // ARRANGE
  // NOTE: 88 of 100 mock characters have valid images (12 have 'image_not_available')
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: true, withDescription: false }),
  );

  // ASSERT
  expect(result.current).toHaveLength(88);
  result.current.forEach((char) => {
    expect(char.thumbnail.path).not.toContain('image_not_available');
  });
});

it('should return characters with description when description filter is applied', () => {
  // ARRANGE
  // NOTE: All 100 mock characters have valid descriptions
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: false, withDescription: true }),
  );

  // ASSERT
  expect(result.current).toHaveLength(100);
  result.current.forEach((char) => {
    expect(char.description).toBeTruthy();
    expect(char.description).not.toBe(' ');
  });
});

it('should return characters with image and description when both filters are applied', () => {
  // ARRANGE
  // NOTE: 88 of 100 mock characters have both valid images AND descriptions
  // (12 have 'image_not_available' paths)
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: true, withDescription: true }),
  );

  // ASSERT
  expect(result.current).toHaveLength(88);
  result.current.forEach((char) => {
    expect(char.thumbnail.path).not.toContain('image_not_available');
    expect(char.description).toBeTruthy();
    expect(char.description).not.toBe(' ');
  });
});
