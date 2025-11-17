/**
 * MOCK SERVICE - Marvel API was discontinued
 * This service now returns statically mocked data to showcase
 * the eldav1d-marvel-ui Design System functionality.
 * Original API integration preserved in git history.
 */
import {
  FetchingOrder,
  ICharacterItem,
} from "@/components/pages/Characters/interfaces/characters";
import { Bugfender } from "@bugfender/sdk";
import mockCharacters from "../mocks/mockCharactersAZ.json";

export interface IGetCharactersServiceProps {
  pageParam?: number;
  maxCharacters: number;
  searchString: string;
  order: FetchingOrder;
}

const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
  // Simulate network delay to show DS loaders
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    let characters = mockCharacters as ICharacterItem[];

    // Filter by search
    if (searchString) {
      characters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    // Sort
    if (order === FetchingOrder.NAME_AZ) {
      characters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === FetchingOrder.NAME_ZA) {
      characters = [...characters].sort((a, b) => b.name.localeCompare(a.name));
    }

    // Paginate
    const offset = maxCharacters * pageParam;
    const paginatedCharacters = characters.slice(offset, offset + maxCharacters);

    // Calculate next cursor
    const getNextCursor = () => {
      const hasMoreResults = offset + maxCharacters < characters.length;
      return hasMoreResults ? pageParam + 1 : null;
    };

    Bugfender.log(`Characters fetched: ${paginatedCharacters.length}`);

    return {
      characters: paginatedCharacters,
      nextCursor: getNextCursor(),
    };
  } catch (error) {
    Bugfender.error(error);
    console.log(error);
  }
};

export default getCharactersService;
