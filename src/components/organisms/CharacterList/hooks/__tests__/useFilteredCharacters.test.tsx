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
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: true, withDescription: false }),
  );

  // ASSERT
  expect(result.current).toEqual([mockCharacters[0], mockCharacters[2]]);
});

it('should return characters with description when description filter is applied', () => {
  // ARRANGE
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: false, withDescription: true }),
  );

  // ASSERT
  expect(result.current).toEqual([mockCharacters[0], mockCharacters[1]]);
});

it('should return characters with image and description when both filters are applied', () => {
  // ARRANGE
  // ACT
  const { result } = renderHook(() =>
    useFilteredCharacters(mockCharacters, { withImage: true, withDescription: true }),
  );

  // ASSERT
  expect(result.current).toEqual([mockCharacters[0]]);
});
