/**
 * MOCK SERVICE - Marvel API was discontinued
 *
 * LIMITATION: All 100 characters share the same 30 generic comics
 * due to API discontinuation. This is acceptable for a Design System
 * showcase as it demonstrates component functionality.
 */
import { FetchingOrder } from '../interfaces/characterComics';
import mockComics from '../mocks/mockCharacterComics.json';

export interface getCharacterComicsServiceProps {
  page: number;
  characterId: string | undefined;
  maxComics: number;
  order: FetchingOrder;
}

const getCharacterComicsService = async ({
  page,
  maxComics,
  order,
}: getCharacterComicsServiceProps) => {
  // Simulate network delay to show DS loaders
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    let comics = [...mockComics];

    // Sort according to selected criteria
    if (order === FetchingOrder.TITLE_AZ) {
      comics = comics.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === FetchingOrder.TITLE_ZA) {
      comics = comics.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Calculate offset for manual pagination
    const offset = maxComics * page;

    // Paginate results (slice simulates SQL LIMIT and OFFSET)
    const paginatedComics = comics.slice(offset, offset + maxComics);

    // CRITICAL: useQuery expects this specific structure
    return {
      apiData: {
        results: paginatedComics,
        total: comics.length,
      },
      offset,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getCharacterComicsService;
