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
    // MINIMUM implementation to pass test
    return {
      characters: [] as ICharacterItem[],
      nextCursor: null,
    };
  } catch (error) {
    Bugfender.error(error);
    console.log(error);
  }
};

export default getCharactersService;
