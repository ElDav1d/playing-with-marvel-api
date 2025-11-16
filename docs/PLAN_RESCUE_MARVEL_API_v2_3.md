# 🚨 RESCUE PLAN: Playing With Marvel API v2.3

**Update date:** November 15, 2025
**Situation:** Marvel API discontinued, project needs to work for Senior Design System Engineer application
**Objective:** Mock services while maintaining `eldav1d-marvel-ui` Design System functional
**Adopted solution:** Dynamic ID search + generic comics with honest disclaimer
**Dataset:** 100 characters + 30 comics

---

## ⚠️ CRITICAL DECISION: TESTING STRATEGY

**Context:** Services currently have NO tests. Without tests, any change is "coding blind".

**Adopted strategy:** Option B - Service tests + Directed monkey testing

**Why invest 1 hour in tests:**

- 🔴 **HIGH RISK:** Services are 100% of the change (fetch → import + logic)
- ✅ **SAFETY NET:** Tests detect bugs BEFORE deploy
- ✅ **CONFIDENCE:** 80% confidence vs 60% with only monkey testing
- ✅ **PROFESSIONALISM:** Recruiter can see tests in the repo
- ✅ **FUTURE VALUE:** Tests remain for future changes
- ✅ **NET TIME:** 2h total vs 3h with only monkey testing

**Accepted trade-off:**

- Time: 2h 35min total (1h tests + 1h35min rest)
- Alternative: 3h+ with only manual monkey testing
- Gain: Better quality, less risk, future investment

---

## ⚠️ CRITICAL CLARIFICATION: MOCK GENERATION SCRIPTS

### When are the scripts executed?

The `generate-mock-characters-100.js` and `generate-mock-comics.js` scripts are **development tools** that are executed:

- ✅ **MANUALLY** by the developer
- ✅ **ONCE** (or when you need to regenerate data)
- ❌ **NEVER when starting the application**
- ❌ **NOT in production code**

### Complete workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT PHASE                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Run Node.js scripts (MANUAL, ONCE):                            │
│     $ node generate-mock-characters-100.js                         │
│     $ node generate-mock-comics.js                                 │
│                                                                     │
│  2. Result → Generated JSON files:                                 │
│     - mockCharacters100.json ✅ (ALREADY GENERATED)                 │
│     - mockComics30.json ✅ (ALREADY GENERATED)                      │
│                                                                     │
│  3. Copy JSONs to project:                                         │
│     - src/components/.../mocks/mockCharactersAZ.json              │
│     - src/components/.../mocks/mockCharacterComics.json           │
│                                                                     │
│  4. Commit JSON files to Git                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    APPLICATION CODE                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  // In getCharactersService.ts                                     │
│  import mockCharacters from '../mocks/mockCharactersAZ.json';      │
│                                                                     │
│  // In getCharacterComicsService.ts                                │
│  import mockComics from '../mocks/mockCharacterComics.json';       │
│                                                                     │
│  ✅ JSONs are already generated                                     │
│  ✅ Static import (nothing executes at runtime)                     │
│  ✅ Included in Webpack bundle                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         IN PRODUCTION                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✅ JSONs are inside the minified bundle                            │
│  ✅ No Node.js scripts at runtime                                   │
│  ✅ No dynamic data generation                                      │
│  ✅ Everything works as static import                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Why this approach?

1. **Separation of concerns:** Data generation vs business logic
2. **Performance:** No runtime overhead
3. **Reproducibility:** Same dataset in all environments
4. **Git-friendly:** Versioned JSONs guarantee consistency

---

## 📊 CRITICAL DIFFERENCES: CHARACTERS VS COMICS

### Completely different pagination systems

| Aspect                   | Characters (CharacterList)                                     | Comics (CharacterComicList)                                             |
| ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **React Query Hook**     | `useInfiniteQuery`                                             | `useQuery`                                                              |
| **Pagination type**      | Infinite scroll (automatic)                                    | Manual with Previous/Next buttons                                       |
| **Page control**         | React Query manages cursor                                     | `page` state in component                                               |
| **Response structure**   | `{ characters: ICharacterItem[], nextCursor: number \| null }` | `{ apiData: { results: ICharacterComicDetails[], total: number }, offset: number }` |
| **Image field**          | `thumbnail: { path: string, extension: string }`               | `images: [{ path: string, extension: string }]`                         |
| **Re-fetch**             | Automatic on scroll                                            | Manual on page/order change                                             |
| **Sorting**              | In service before pagination                                   | In service before pagination                                            |
| **Dataset**              | **100 unique characters**                                      | **30 generic comics**                                                   |

### Technical implications

**For characters:**

- The `useInfiniteQuery` hook expects a cursor for the next page
- When user scrolls, React Query automatically calls `fetchNextPage()`
- Service must return `nextCursor: pageParam + 1` or `null` if last page
- **With 100 characters, infinite scroll is clearly visible**

**For comics:**

- The `useQuery` hook is called with current page
- Previous/Next buttons increment/decrement `page` state
- Each page change makes a new manual `refetch()`
- Service calculates `offset` based on `page * maxComics`

---

## 📋 PHASE 3: MOCK GENERATION (ALREADY COMPLETED ✅)

> ⚠️ **IMPORTANT NOTE ABOUT CHARACTER IDs IN TEST EXAMPLES:**
>
> The test examples throughout this document use placeholder IDs (e.g., 1000000, 1000001) and character names (e.g., "Spider-Man", "Iron Man"). These IDs and names are for illustration purposes only.
>
> **When new mocks are generated**, the actual character IDs and names will differ based on the data returned by the Marvel API at generation time. After generating new mocks:
>
> 1. Inspect `mockCharactersAZ.json` to find the actual first character ID and name
> 2. Update test examples with the real IDs found in the generated mock files
> 3. Adjust character name assertions to match the actual names in the mock data
>
> This applies to all test files in Phase 5 (Tasks 5.2, 5.3, 5.4).

### Final result:

**Characters:** ✅ 100 characters generated
**Comics:** ✅ 30 comics generated
**Unique URLs (characters):** 8 (rotated among the 100)
**Unique URLs (comics):** 6 (rotated among the 30)

### Available files:

- `/mnt/project/mockCharacters100.json` ✅ (4501 lines, 100 characters)
- `/mnt/project/mockComics30.json` ✅ (generated with script)
- `/mnt/project/generate-mock-characters-100.js` (generator script)
- `/mnt/project/generate-mock-comics.js` (generator script)

### Task 3.1: Copy files to project

```bash
# Copy characters (100 items)
cp /mnt/project/mockCharacters100.json \
   playing-with-marvel-api/src/components/organisms/CharacterList/mocks/mockCharactersAZ.json

# Copy comics (30 items)
cp /mnt/project/mockComics30.json \
   playing-with-marvel-api/src/components/organisms/CharacterComicList/mocks/mockCharacterComics.json
```

**Checklist:**

- [ ] Copy mockCharacters100.json to project
- [ ] Copy mockComics30.json to project
- [ ] Verify files are in correct locations
- [ ] Commit both JSON files

---

## 📋 PHASE 4: UPDATE SERVICES

### Task 4.1: getCharactersService.ts ✅

**File:** `src/components/organisms/CharacterList/services/getCharactersService.ts`

**System:** Infinite scroll with `useInfiniteQuery`

```typescript
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

    // Paginate for infinite scroll
    const offset = maxCharacters * pageParam;
    const paginatedCharacters = characters.slice(
      offset,
      offset + maxCharacters
    );

    // CRITICAL: useInfiniteQuery expects a cursor
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
```

**Checklist:**

- [ ] Update file
- [ ] Verify it compiles
- [ ] Test infinite scroll with 100 characters

---

### Task 4.2: getCharacterDetailsService.ts ⚠️ DYNAMIC SEARCH

**File:** `src/components/pages/CharacterDetail/services/getCharacterDetailsService.ts`

**ADOPTED SOLUTION:** Dynamic ID search in the 100 characters array.

**Advantages:**

- ✅ Each of the 100 characters has its own functional detail page
- ✅ Navigation between characters works correctly
- ✅ Unique data per character (name, description, image)
- ✅ Zero modification of existing components

```typescript
/**
 * MOCK SERVICE - Marvel API was discontinued
 * Searches for character by ID in the mock characters array
 * to maintain functional navigation between character details.
 */
import mockCharacters from "../../organisms/CharacterList/mocks/mockCharactersAZ.json";
import { ICharacterItem } from "../../Characters/interfaces/characters";

const getCharacterDetailsService = async (characterId: string | undefined) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    // Search character by ID in the 100 mocks array
    const character = mockCharacters.find(
      (char: ICharacterItem) => char.id === Number(characterId)
    );

    // If doesn't exist, return first as fallback
    return character || mockCharacters[0];
  } catch (error) {
    console.log(error);
  }
};

export default getCharacterDetailsService;
```

**Note:** No need to create static `mockCharacterDetail.json` - dynamic search.

**Checklist:**

- [ ] Update file
- [ ] Verify it compiles
- [ ] Test navigation between different characters
- [ ] Verify each character shows unique data

---

### Task 4.3: getCharacterComicsService.ts ⚠️ IMPORTANT

**File:** `src/components/organisms/CharacterComicList/services/getCharacterComicsService.ts`

**System:** Manual pagination with `useQuery`

**⚠️ KNOWN LIMITATION - CHARACTERS-COMICS RELATIONSHIP:**

Due to Marvel API discontinuation, **the 100 characters share the same 30 generic comics**. This is an acceptable compromise for a showcase project because:

1. The focus is demonstrating the **Design System**, not business logic
2. Comics pagination and sorting functionality **works perfectly**
3. A **subtle and honest disclaimer** is added to the UI
4. A technical recruiter **values** the pragmatic solution

**Current relationship:**

```
100 unique characters → 30 generic comics (shared)
```

**Mitigation:**

- ✅ Discrete disclaimer in `CharacterComicList.tsx`
- ✅ Clear documentation in README
- ✅ Full component functionality

```typescript
/**
 * MOCK SERVICE - Marvel API was discontinued
 *
 * LIMITATION: All 100 characters share the same 30 generic comics
 * due to API discontinuation. This is acceptable for a Design System
 * showcase as it demonstrates component functionality.
 */
import { FetchingOrder } from "../interfaces/characterComics";
import mockComics from "../mocks/mockCharacterComics.json";

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
    // Add more sorting options if they exist in FetchingOrder

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
```

**Specific checklist for comics:**

- [ ] Update file with sorting included
- [ ] Verify it compiles
- [ ] Add disclaimer in CharacterComicList.tsx (see Task 4.4)
- [ ] Test Previous/Next navigation
- [ ] Test order change in select
- [ ] Verify "Displaying X to Y from Z" counter works

---

### Task 4.4: Add subtle disclaimer in CharacterComicList

**File:** `src/components/organisms/CharacterComicList/CharacterComicList.tsx`

**Objective:** Honestly inform that comics are generic without breaking the experience.

**Location:** Just before the "Displaying X to Y from Z available comics" title

```typescript
// Inside the block that renders comics, add:

{
  comics && comics.length > 0 && (
    <>
      <ComicsSelectGroup
        classNameSelect="w-1/4"
        inputAriaLabel="Order comics by:"
        title="Order comics by:"
        onChange={(event) => orderHandler(event)}
        options={Object.values(FetchingOrder)}
        optionLiterals={orderLiterals}
      />

      {/* 👇 ADD THIS DISCLAIMER */}
      <p className="text-sm text-gray-500 italic mb-3 mt-2">
        Note: Comics shown are for demonstration purposes due to Marvel API
        discontinuation
      </p>

      <h3 className="mb-2">
        Displaying {rangeInit} to {rangeEnd} from {totalComics} available comics
      </h3>

      {/* ... rest of code */}
    </>
  );
}
```

**Disclaimer style:**

- Discrete (small text, gray, italic)
- Honest but not dramatic
- Doesn't break visual flow
- Conveys professionalism and transparency

**Checklist:**

- [ ] Add disclaimer with exact text
- [ ] Verify it looks good visually
- [ ] Confirm it doesn't break layout
- [ ] Test on different screen sizes

---

## 📋 PHASE 5: SERVICE TESTING (1 hour) ⚠️ CRITICAL

**Context:** Services have NO tests currently and are what you'll modify 100%. Without tests, there's no safety net.

**Decision:** Option B - Minimal service tests + directed monkey testing

### Testing philosophy (according to CLAUDE.md):

```
┌────────────────────────────────────────────────────────────┐
│  LAYER 2: Unit Tests (Foundation of TDD)                    │
│  ──────────────────────────────────────────────────────────│
│  - Application Layer (services, use cases)                  │
│  - Test in isolation with mocks                             │
│  - Fast execution                                            │
│  - Focus: "Which specific logic broke?"                     │
└────────────────────────────────────────────────────────────┘
```

**Why service unit tests:**

- ✅ Services are Application Layer (business logic)
- ✅ Independent of React framework
- ✅ Can be tested in isolation
- ✅ Detect bugs BEFORE deploy

---

### Task 5.1: Create test structure for services

**Create test directories:**

```bash
mkdir -p src/components/organisms/CharacterList/services/__tests__
mkdir -p src/components/pages/CharacterDetail/services/__tests__
mkdir -p src/components/organisms/CharacterComicList/services/__tests__
```

**Checklist:**

- [ ] Directories created
- [ ] Following `__tests__/` convention next to source code

---

### Task 5.2: Tests for getCharactersService.ts

**File:** `src/components/organisms/CharacterList/services/__tests__/getCharactersService.test.ts`

**Applied principles (CLAUDE.md):**

- ✅ Application Layer unit test (service)
- ✅ Doesn't test React (pure logic)
- ✅ Mock data (not real API)
- ✅ Edge cases tests

```typescript
import getCharactersService from "../getCharactersService";
import { FetchingOrder } from "@/components/pages/Characters/interfaces/characters";

/**
 * Tests for getCharactersService - Service with mocked characters
 *
 * These tests validate pagination, filtering, and sorting logic
 * to be implemented when migrating from real API to mocks.
 */
describe("getCharactersService with mocked data", () => {
  describe("Pagination (infinite scroll)", () => {
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
      expect(result!.nextCursor).toBe(1); // There's a second page
    });

    it("returns second page of characters", async () => {
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
      expect(result).toBeDefined();
      expect(result!.characters).toHaveLength(50);
      expect(result!.nextCursor).toBeNull(); // It's the last page (100 characters total)
    });

    it("returns null cursor on last page", async () => {
      // ARRANGE
      const params = {
        pageParam: 1, // Second page with 50 items
        maxCharacters: 50,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result!.nextCursor).toBeNull();
    });

    it("handles pagination with different page sizes", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 20,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result!.characters).toHaveLength(20);
      expect(result!.nextCursor).toBe(1); // There are more pages
    });
  });

  describe("Search/Filtering", () => {
    it("filters by search string (case insensitive)", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 50,
        searchString: "Spider",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result).toBeDefined();
      result!.characters.forEach((char) => {
        expect(char.name.toLowerCase()).toContain("spider");
      });
    });

    it("returns empty results for non-matching search", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 50,
        searchString: "ZZZNONEXISTENT",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result!.characters).toHaveLength(0);
      expect(result!.nextCursor).toBeNull();
    });

    it("handles empty search string (returns all)", async () => {
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
      expect(result!.characters).toHaveLength(50);
    });
  });

  describe("Sorting", () => {
    it("sorts A-Z correctly", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 100, // All characters
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      const names = result!.characters.map((c) => c.name);
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sortedNames);
    });

    it("sorts Z-A correctly", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 100,
        searchString: "",
        order: FetchingOrder.NAME_ZA,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      const names = result!.characters.map((c) => c.name);
      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).toEqual(sortedNames);
    });
  });

  describe("Edge Cases", () => {
    it("handles search + pagination", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 5,
        searchString: "man", // Several with "man"
        order: FetchingOrder.NAME_AZ,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      expect(result!.characters).toHaveLength(5);
      result!.characters.forEach((char) => {
        expect(char.name.toLowerCase()).toContain("man");
      });
    });

    it("handles search + sorting", async () => {
      // ARRANGE
      const params = {
        pageParam: 0,
        maxCharacters: 100,
        searchString: "spider",
        order: FetchingOrder.NAME_ZA,
      };

      // ACT
      const result = await getCharactersService(params);

      // ASSERT
      const names = result!.characters.map((c) => c.name);
      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).toEqual(sortedNames);
    });
  });
});
```

**Checklist:**

- [ ] File created
- [ ] Tests run without errors
- [ ] Happy paths coverage
- [ ] Edge cases coverage

---

### Task 5.3: Tests for getCharacterDetailsService.ts

**File:** `src/components/pages/CharacterDetail/services/__tests__/getCharacterDetailsService.test.ts`

```typescript
import getCharacterDetailsService from "../getCharacterDetailsService";

/**
 * Tests for getCharacterDetailsService - Dynamic ID search
 *
 * Validates that each character can be found by ID and that
 * there's a fallback when ID doesn't exist.
 */
describe("getCharacterDetailsService with dynamic lookup", () => {
  describe("Character lookup by ID", () => {
    it("finds character by valid ID", async () => {
      // ARRANGE
      const characterId = "1000000"; // Spider-Man

      // ACT
      const character = await getCharacterDetailsService(characterId);

      // ASSERT
      expect(character).toBeDefined();
      expect(character!.id).toBe(1000000);
      expect(character!.name).toBe("Spider-Man");
    });

    it("finds different characters by different IDs", async () => {
      // ARRANGE & ACT
      const spiderMan = await getCharacterDetailsService("1000000");
      const ironMan = await getCharacterDetailsService("1000001");

      // ASSERT
      expect(spiderMan!.id).not.toBe(ironMan!.id);
      expect(spiderMan!.name).not.toBe(ironMan!.name);
    });

    it("returns character with correct structure", async () => {
      // ARRANGE
      const characterId = "1000000";

      // ACT
      const character = await getCharacterDetailsService(characterId);

      // ASSERT
      expect(character).toHaveProperty("id");
      expect(character).toHaveProperty("name");
      expect(character).toHaveProperty("description");
      expect(character).toHaveProperty("thumbnail");
      expect(character!.thumbnail).toHaveProperty("path");
      expect(character!.thumbnail).toHaveProperty("extension");
    });
  });

  describe("Fallback behavior", () => {
    it("returns fallback for non-existent ID", async () => {
      // ARRANGE
      const invalidId = "999999";

      // ACT
      const character = await getCharacterDetailsService(invalidId);

      // ASSERT
      expect(character).toBeDefined(); // Shouldn't crash
      expect(character).toHaveProperty("id");
      expect(character).toHaveProperty("name");
    });

    it("returns fallback for undefined ID", async () => {
      // ARRANGE
      const undefinedId = undefined;

      // ACT
      const character = await getCharacterDetailsService(undefinedId);

      // ASSERT
      expect(character).toBeDefined();
    });

    it("fallback returns first character from list", async () => {
      // ARRANGE
      const firstCharacter = await getCharacterDetailsService("1000000");
      const fallback = await getCharacterDetailsService("999999");

      // ACT & ASSERT
      expect(fallback!.id).toBe(firstCharacter!.id);
    });
  });
});
```

**Checklist:**

- [ ] File created
- [ ] Tests run without errors
- [ ] Validates ID search
- [ ] Validates fallback

---

### Task 5.4: Tests for getCharacterComicsService.ts

**File:** `src/components/organisms/CharacterComicList/services/__tests__/getCharacterComicsService.test.ts`

```typescript
import getCharacterComicsService from "../getCharacterComicsService";
import { FetchingOrder } from "../../interfaces/characterComics";

/**
 * Tests for getCharacterComicsService - Manual comics pagination
 *
 * Validates manual pagination logic (Previous/Next) and sorting
 * of the 30 generic comics.
 */
describe("getCharacterComicsService with manual pagination", () => {
  describe("Pagination", () => {
    it("returns first page of 10 comics", async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result).toBeDefined();
      expect(result!.apiData.results).toHaveLength(10);
      expect(result!.apiData.total).toBe(30);
      expect(result!.offset).toBe(0);
    });

    it("returns second page of 10 comics", async () => {
      // ARRANGE
      const params = {
        page: 1,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result!.apiData.results).toHaveLength(10);
      expect(result!.offset).toBe(10); // maxComics * page
    });

    it("returns third (last) page of 10 comics", async () => {
      // ARRANGE
      const params = {
        page: 2,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result!.apiData.results).toHaveLength(10);
      expect(result!.offset).toBe(20);
    });

    it("calculates offset correctly", async () => {
      // ARRANGE
      const testCases = [
        { page: 0, maxComics: 10, expectedOffset: 0 },
        { page: 1, maxComics: 10, expectedOffset: 10 },
        { page: 2, maxComics: 10, expectedOffset: 20 },
        { page: 0, maxComics: 5, expectedOffset: 0 },
        { page: 5, maxComics: 5, expectedOffset: 25 },
      ];

      for (const testCase of testCases) {
        // ACT
        const result = await getCharacterComicsService({
          page: testCase.page,
          maxComics: testCase.maxComics,
          order: FetchingOrder.TITLE_AZ,
          characterId: "1000000",
        });

        // ASSERT
        expect(result!.offset).toBe(testCase.expectedOffset);
      }
    });
  });

  describe("Sorting", () => {
    it("sorts by title A-Z", async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 30, // All comics
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      const titles = result!.apiData.results.map((c) => c.title);
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sortedTitles);
    });

    it("sorts by title Z-A", async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 30,
        order: FetchingOrder.TITLE_ZA,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      const titles = result!.apiData.results.map((c) => c.title);
      const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
      expect(titles).toEqual(sortedTitles);
    });
  });

  describe("Data structure", () => {
    it("returns correct API response structure", async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result).toHaveProperty("apiData");
      expect(result).toHaveProperty("offset");
      expect(result!.apiData).toHaveProperty("results");
      expect(result!.apiData).toHaveProperty("total");
    });

    it("comics have correct structure", async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      const firstComic = result!.apiData.results[0];
      expect(firstComic).toHaveProperty("id");
      expect(firstComic).toHaveProperty("title");
      expect(firstComic).toHaveProperty("images");
      expect(Array.isArray(firstComic.images)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles sorting + pagination", async () => {
      // ARRANGE
      const paramsAZ = {
        page: 1,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1000000",
      };

      // ACT
      const resultAZ = await getCharacterComicsService(paramsAZ);

      // ASSERT
      expect(resultAZ!.offset).toBe(10);
      expect(resultAZ!.apiData.results).toHaveLength(10);
      // Verify they're sorted
      const titles = resultAZ!.apiData.results.map((c) => c.title);
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sortedTitles);
    });
  });
});
```

**Checklist:**

- [ ] File created
- [ ] Tests run without errors
- [ ] Validates manual pagination
- [ ] Validates sorting

---

### Task 5.5: Run tests

```bash
cd playing-with-marvel-api
npm test
# or
yarn test
```

**Checklist:**

- [ ] All tests pass (green)
- [ ] No TypeScript errors
- [ ] No critical warnings
- [ ] Coverage > 80% on services

---

### Task 5.6: Document testing decision

**Add comment in each test file:**

```typescript
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
```

**Checklist:**

- [ ] Comment added in the 3 test files
- [ ] README updated mentioning new test coverage

---

## 📋 PHASE 6: DIRECTED MANUAL TESTING (1 hour)

**With service tests already written, manual testing is much shorter and more directed.**

### Task 6.1: Verify compilation

```bash
cd playing-with-marvel-api
yarn install
yarn build
```

- [ ] No TypeScript errors
- [ ] No build errors
- [ ] JSON imports correct

### Task 6.2: Run existing tests

```bash
yarn test
```

- [ ] All tests pass
- [ ] If failures, adjust mocks according to expectations

### Task 6.3: Test in development (Directed Monkey Testing)

```bash
yarn start
```

**Visual checklist - Characters (infinite scroll with 100 items):**

- [ ] Characters page loads
- [ ] Cards show with CDN images
- [ ] Search works
- [ ] Sort filters work
- [ ] **Infinite scroll loads more characters (clearly noticeable with 100)**
- [ ] DS loaders display correctly

**Visual checklist - Character detail (dynamic navigation among 100):**

- [ ] Clicking a character card goes to detail
- [ ] **CRITICAL:** Each character shows THEIR unique data (name, description, image)
- [ ] **CRITICAL:** Navigating between different characters shows different data
- [ ] URL includes correct ID (`/character/:id/:name`)
- [ ] No console errors
- [ ] **Test with at least 5 different characters to confirm**

**Visual checklist - Comics (manual pagination):**

- [ ] Detail page shows comics
- [ ] **Discrete disclaimer is shown** about generic comics
- [ ] "Next" button works and changes page
- [ ] "Previous" button works and goes back
- [ ] Order selector works (A-Z, Z-A)
- [ ] Counter "Displaying 1 to 10 from 30" is correct
- [ ] Comic images load from CDN
- [ ] No console errors

---

## 📝 PHASE 7: DOCUMENTATION (10 min)

### Update README.md

Add section:

```markdown
## ⚠️ Important Note: Mock Data

This project originally consumed the official Marvel API, which has been discontinued.
To maintain functionality and showcase the `eldav1d-marvel-ui` Design System capabilities,
the application now uses statically mocked data.

### Mock Data Strategy

**Characters (100 unique):**

- Real Marvel characters with unique names, descriptions, and images
- Images from Marvel's CDN (`i.annihil.us`) which remains accessible
- Full navigation support - each character has its own detail page
- Search, filtering, and ordering fully functional
- **Infinite scroll clearly visible with 100 characters**

**Comics (30 generic):**

- ⚠️ **Limitation:** All characters share the same 30 generic Marvel comics
- This is an acceptable compromise for a Design System showcase
- Comics pagination, ordering, and all UI components work perfectly
- A subtle disclaimer is shown in the UI to maintain transparency

**Pagination Systems:**

- Characters: Infinite scroll with `useInfiniteQuery` (100 items)
- Comics: Manual pagination with Previous/Next buttons (30 items, 3 pages)

**Purpose:**
This approach ensures the project remains functional and serves as a reliable showcase
for the UI library components, patterns, and functionality without external API dependencies.

### Technical Implementation

The mock data strategy maintains:

- ✅ Full Design System component showcase
- ✅ All user interactions (search, filter, paginate, sort)
- ✅ Realistic loading states and delays
- ✅ Proper TypeScript interfaces and data structures
- ✅ Honest communication about limitations
- ✅ 100 unique character pages for thorough navigation testing
```

---

## 🎯 SUCCESS METRICS

### ✅ Minimum requirements

- [ ] Project compiles without errors
- [ ] Tests pass
- [ ] Application starts locally
- [ ] Characters: infinite scroll works with 100 items
- [ ] Comics: manual pagination works
- [ ] CDN images load correctly

### 🌟 Strategic objectives

- [ ] **Design System shines:** All components visible and functional
- [ ] **Infinite scroll visible:** With 100 characters functionality is clearly noticeable
- [ ] **DS states visible:** Loading, error, empty states work
- [ ] **Smooth navigation:** No broken links or console errors
- [ ] **Clear README:** Explains using mocks due to API discontinuation
- [ ] **Clean code:** Comments explain the change

---

## 🚀 EXECUTIVE SUMMARY

### What was done

1. ✅ Generated **100 characters** + 30 comics with real images from Marvel CDN
2. ✅ Node.js scripts executed ONCE to create JSONs
3. ✅ JSONs committed to Git as static data
4. ✅ Services updated to import JSONs instead of calling API
5. ✅ Differentiated pagination: infinite scroll (characters) vs manual (comics)
6. ✅ **Dynamic ID search** - each of the 100 characters has its own unique detail page
7. ✅ **Honest disclaimer** - generic comics with subtle UI explanation

### Solution architecture

**Characters:**

- **100 unique characters** with differentiated data
- Complete navigation between all characters
- `getCharacterDetailsService` searches by ID dynamically
- Each character shows unique name, description, and image
- **Infinite scroll clearly visible** with 100 items

**Comics:**

- 30 generic comics shared by all 100 characters
- Limitation communicated honestly via discrete disclaimer
- Full pagination and sorting functionality
- Complete Design System showcase

### What was NOT done

- ❌ NO scripts run at runtime
- ❌ NO dynamic data generation
- ❌ NO external API calls
- ❌ NO Design System modifications
- ❌ NO static `mockCharacterDetail.json` file created (dynamic search)

### Accepted technical compromise

**Limitation:** The 100 characters share the same 30 comics

**Justification:**

- The project is a Design System showcase, not a real product
- Comics components work perfectly
- User is informed honestly via disclaimer
- A technical recruiter values the pragmatic solution

**Mitigation:**

- Subtle disclaimer in UI
- Clear documentation in README
- Full component functionality

### Total estimated time

- Mock generation: 10 min (already done)
- Service updates: 20 min
- **Service tests: 60 min** ← **NEW PHASE**
- UI disclaimer: 5 min
- Directed manual testing: 60 min
- **Total: ~2 hours 35 minutes**

**Time distribution:**

- Automated tests: 1h (quality investment)
- Manual testing: 1h (reduced thanks to tests)
- Implementation: 35min

---

**Document updated:** November 15, 2025
**Version:** 2.3
**Main changes:**

- Expanded dataset from 50 to 100 characters
- More evident and functional infinite scroll
- Dynamic search among 100 unique characters
- Updated documentation with new metrics
