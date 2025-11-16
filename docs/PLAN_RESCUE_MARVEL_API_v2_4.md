# 🚨 RESCUE PLAN: Playing With Marvel API v2.4 (TDD Approach)

**Update date:** November 16, 2025
**Situation:** Marvel API discontinued, project needs to work for Senior Design System Engineer application
**Objective:** Mock services while maintaining `eldav1d-marvel-ui` Design System functional
**Adopted solution:** Dynamic ID search + generic comics with honest disclaimer
**Dataset:** 100 characters + 30 comics
**Methodology:** **Test-Driven Development (TDD)** - RED-GREEN-REFACTOR cycles

---

## ⚠️ CRITICAL: TDD METHODOLOGY

**This plan follows strict TDD principles:**

```
┌─────────────────────────────────────────────────────────────┐
│                   TDD CYCLE (Repeat)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1️⃣ RED:    Write a failing test for ONE feature           │
│            ❌ Test fails (functionality doesn't exist)      │
│                                                             │
│  2️⃣ GREEN:  Write MINIMUM code to pass the test            │
│            ✅ Test passes (functionality works)             │
│                                                             │
│  3️⃣ REFACTOR: Clean up code while keeping tests green      │
│            ✅ Tests still pass (code is cleaner)            │
│                                                             │
│  ➰ REPEAT for next feature                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why TDD for this migration:**

- 🔴 **SAFETY FIRST:** Tests catch regressions before they reach production
- ✅ **CONFIDENCE:** Each feature is verified before moving to the next
- 🎯 **FOCUS:** One feature at a time, no overwhelm
- 📚 **DOCUMENTATION:** Tests serve as living documentation
- 🧹 **CLEAN CODE:** Refactor step ensures quality
- ⏱️ **FASTER DEBUGGING:** Know exactly what broke and when

**⚠️ IMPORTANT: TDD Iteration Process**

Each cycle is **iterative**. If a test fails unexpectedly during GREEN phase:

1. **Don't panic** - This is normal in TDD
2. **Read the error** - TypeScript/Jest will tell you what's wrong
3. **Check mock data** - Does it match the expected interface?
4. **Adjust if needed** - Fix mock structure or regenerate
5. **Re-run test** - Keep iterating until GREEN
6. **Only then** - Move to next cycle

**Common iteration scenarios:**
- Mock data structure doesn't match TypeScript interface → Adjust mock
- Import path is wrong → Fix import
- Expected value differs from actual → Adjust test expectation or implementation
- **Never skip a failing test** - Fix it before moving forward

**Time estimate:** 3-4 hours total
- Setup: 15 min
- Service 1 (getCharactersService): 90 min
- Service 2 (getCharacterDetailsService): 45 min
- Service 3 (getCharacterComicsService): 60 min
- Manual testing: 30 min
- Documentation: 10 min

---

## 📋 PHASE 0: PREPARATION (15 min)

### Task 0.1: Copy mock data files

**Mock files already exist** (from v2.3):
- `/mnt/project/mockCharacters100.json` (100 characters)
- `/mnt/project/mockComics30.json` (30 comics)

```bash
# Verify mocks exist (if needed, generate them first)
ls -la /mnt/project/mockCharacters100.json
ls -la /mnt/project/mockComics30.json

# Copy to project structure
cp /mnt/project/mockCharacters100.json \
   src/components/organisms/CharacterList/mocks/mockCharactersAZ.json

cp /mnt/project/mockComics30.json \
   src/components/organisms/CharacterComicList/mocks/mockCharacterComics.json
```

**Verify JSON imports work:**

```bash
# Quick TypeScript check to ensure imports are valid
npx tsc --noEmit

# Or check specific files
head -20 src/components/organisms/CharacterList/mocks/mockCharactersAZ.json
head -20 src/components/organisms/CharacterComicList/mocks/mockCharacterComics.json
```

**Checklist:**
- [ ] mockCharactersAZ.json in place
- [ ] mockCharacterComics.json in place
- [ ] JSON imports are valid (no syntax errors)
- [ ] Mock files committed to git

---

### Task 0.2: Create test directory structure

```bash
# Create test directories (following __tests__ convention)
mkdir -p src/components/organisms/CharacterList/services/__tests__
mkdir -p src/components/pages/CharacterDetail/services/__tests__
mkdir -p src/components/organisms/CharacterComicList/services/__tests__
```

**Checklist:**
- [ ] CharacterList test directory created
- [ ] CharacterDetail test directory created
- [ ] CharacterComicList test directory created

---

### Task 0.3: Verify current services work

```bash
# Start dev server to confirm current state
npm start

# In browser: http://localhost:3000
# Should see: API errors (Marvel API is down)
```

**Checklist:**
- [ ] Dev server starts
- [ ] Application loads (with errors)
- [ ] Confirmed services need migration

---

## 📋 PHASE 1: getCharactersService - TDD CYCLES (90 min)

**Service:** `src/components/organisms/CharacterList/services/getCharactersService.ts`
**Test file:** `src/components/organisms/CharacterList/services/__tests__/getCharactersService.test.ts`

**Features to implement (in order):**
1. Basic structure (return empty array)
2. Load first page (50 characters)
3. Pagination (infinite scroll with cursor)
4. Search/filtering (case insensitive)
5. Sorting (A-Z, Z-A)
6. Edge cases (empty results, last page)

---

### Cycle 1.1: RED - Test for basic structure

**⏱️ Time: 5 min**

Create test file:

```typescript
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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ❌ **Test FAILS** (service still calls Marvel API)

**Checklist:**
- [ ] Test file created
- [ ] Test runs and **fails** (RED state)
- [ ] Failure is clear: service doesn't return expected structure

---

### Cycle 1.2: GREEN - Implement basic structure

**⏱️ Time: 10 min**

Modify service to return mock data:

```typescript
// src/components/organisms/CharacterList/services/getCharactersService.ts

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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test PASSES** (basic structure works)

**Checklist:**
- [ ] Service modified
- [ ] Test passes (GREEN state)
- [ ] Commits ready: "RED: Add test for basic structure" + "GREEN: Implement basic structure"

---

### Cycle 1.3: REFACTOR - Clean up (if needed)

**⏱️ Time: 2 min**

No refactoring needed yet (code is minimal).

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test still PASSES**

**Checklist:**
- [ ] No refactoring needed
- [ ] Tests still green

---

### Cycle 1.4: RED - Test for first page (50 characters)

**⏱️ Time: 5 min**

Add test to existing file:

```typescript
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
});
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ❌ **Test FAILS** (returns empty array, not 50 items)

**Checklist:**
- [ ] Test added
- [ ] Test **fails** (RED state)

---

### Cycle 1.5: GREEN - Implement first page

**⏱️ Time: 10 min**

Update service:

```typescript
const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    let characters = mockCharacters as ICharacterItem[];

    // Paginate for infinite scroll
    const offset = maxCharacters * pageParam;
    const paginatedCharacters = characters.slice(
      offset,
      offset + maxCharacters
    );

    Bugfender.log(`Characters fetched: ${paginatedCharacters.length}`);

    return {
      characters: paginatedCharacters,
      nextCursor: null, // TODO: calculate next page
    };
  } catch (error) {
    Bugfender.error(error);
    console.log(error);
  }
};
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test PASSES** (returns 50 characters)

**Checklist:**
- [ ] Service modified
- [ ] Test passes (GREEN state)

---

### Cycle 1.6: REFACTOR - Extract pagination logic

**⏱️ Time: 5 min**

Clean up (optional, can be done later):

```typescript
const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    let characters = mockCharacters as ICharacterItem[];

    // Paginate
    const offset = maxCharacters * pageParam;
    const paginatedCharacters = characters.slice(offset, offset + maxCharacters);

    Bugfender.log(`Characters fetched: ${paginatedCharacters.length}`);

    return {
      characters: paginatedCharacters,
      nextCursor: null,
    };
  } catch (error) {
    Bugfender.error(error);
    console.log(error);
  }
};
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test still PASSES**

**Checklist:**
- [ ] Code cleaned (if needed)
- [ ] Tests still green

---

### Cycle 1.7: RED - Test for cursor calculation

**⏱️ Time: 5 min**

Add tests:

```typescript
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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ❌ **Test FAILS** (nextCursor is always null)

**Checklist:**
- [ ] Tests added
- [ ] Tests **fail** (RED state)

---

### Cycle 1.8: GREEN - Implement cursor calculation

**⏱️ Time: 10 min**

Update service:

```typescript
const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    let characters = mockCharacters as ICharacterItem[];

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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test PASSES** (cursor calculated correctly)

**Checklist:**
- [ ] Service modified
- [ ] Tests pass (GREEN state)

---

### Cycle 1.9: RED - Test for search/filtering

**⏱️ Time: 5 min**

Add tests:

```typescript
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
});
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ❌ **Test FAILS** (no filtering implemented)

**Checklist:**
- [ ] Tests added
- [ ] Tests **fail** (RED state)

---

### Cycle 1.10: GREEN - Implement filtering

**⏱️ Time: 10 min**

Update service:

```typescript
const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    let characters = mockCharacters as ICharacterItem[];

    // Filter by search
    if (searchString) {
      characters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchString.toLowerCase())
      );
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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test PASSES** (filtering works)

**Checklist:**
- [ ] Service modified
- [ ] Tests pass (GREEN state)

---

### Cycle 1.11: RED - Test for sorting

**⏱️ Time: 5 min**

Add tests:

```typescript
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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ❌ **Test FAILS** (no sorting implemented)

**Checklist:**
- [ ] Tests added
- [ ] Tests **fail** (RED state)

---

### Cycle 1.12: GREEN - Implement sorting

**⏱️ Time: 10 min**

Update service:

```typescript
const getCharactersService = async ({
  pageParam = 0,
  maxCharacters,
  searchString,
  order,
}: IGetCharactersServiceProps) => {
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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test PASSES** (sorting works)

**Checklist:**
- [ ] Service modified
- [ ] Tests pass (GREEN state)

---

### Cycle 1.13: REFACTOR - Final cleanup

**⏱️ Time: 5 min**

Review code for improvements (spacing, comments, etc.):

```typescript
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
    const paginatedCharacters = characters.slice(offset, offset + maxCharacters);

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
```

**Run test:**
```bash
npm test -- getCharactersService.test.ts
```

**Expected:** ✅ **Test still PASSES**

**Checklist:**
- [ ] Code cleaned
- [ ] Comments added
- [ ] Tests still green

---

### Cycle 1.14: Coverage check

**⏱️ Time: 5 min**

```bash
npm test -- --coverage --collectCoverageFrom="src/components/organisms/CharacterList/services/**/*.ts"
```

**Expected:** > 80% coverage

**Checklist:**
- [ ] Coverage > 80%
- [ ] All paths covered (happy + edge cases)

---

## 📋 PHASE 2: getCharacterDetailsService - TDD CYCLES (45 min)

**Service:** `src/components/pages/CharacterDetail/services/getCharacterDetailsService.ts`
**Test file:** `src/components/pages/CharacterDetail/services/__tests__/getCharacterDetailsService.test.ts`

**Features to implement:**
1. Find character by ID
2. Fallback to first character if ID not found
3. Handle undefined ID

---

### Cycle 2.1: RED - Test for ID lookup

**⏱️ Time: 5 min**

Create test file:

```typescript
// src/components/pages/CharacterDetail/services/__tests__/getCharacterDetailsService.test.ts

import getCharacterDetailsService from "../getCharacterDetailsService";

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
describe("getCharacterDetailsService with dynamic lookup", () => {
  describe("Character lookup by ID", () => {
    it("finds character by valid ID", async () => {
      // ARRANGE
      // NOTE: Use actual ID from mockCharactersAZ.json after inspection
      const characterId = "1011176"; // First character in mock (adjust as needed)

      // ACT
      const character = await getCharacterDetailsService(characterId);

      // ASSERT
      expect(character).toBeDefined();
      expect(character!.id).toBe(1011176);
    });

    it("returns character with correct structure", async () => {
      // ARRANGE
      const characterId = "1011176";

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
});
```

**Run test:**
```bash
npm test -- getCharacterDetailsService.test.ts
```

**Expected:** ❌ **Test FAILS** (service still calls Marvel API)

**Checklist:**
- [ ] Test file created
- [ ] Test **fails** (RED state)

---

### Cycle 2.2: GREEN - Implement ID lookup

**⏱️ Time: 15 min**

Update service:

```typescript
// src/components/pages/CharacterDetail/services/getCharacterDetailsService.ts

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

**Run test:**
```bash
npm test -- getCharacterDetailsService.test.ts
```

**Expected:** ✅ **Test PASSES** (finds character by ID)

**Checklist:**
- [ ] Service modified
- [ ] Test passes (GREEN state)

---

### Cycle 2.3: RED - Test for fallback behavior

**⏱️ Time: 5 min**

Add tests:

```typescript
describe("Fallback behavior", () => {
  it("returns fallback for non-existent ID", async () => {
    // ARRANGE
    const invalidId = "999999";

    // ACT
    const character = await getCharacterDetailsService(invalidId);

    // ASSERT
    expect(character).toBeDefined();
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
    const firstCharacter = await getCharacterDetailsService("1011176");
    const fallback = await getCharacterDetailsService("999999");

    // ACT & ASSERT
    expect(fallback!.id).toBe(firstCharacter!.id);
  });
});
```

**Run test:**
```bash
npm test -- getCharacterDetailsService.test.ts
```

**Expected:** ✅ **Test PASSES** (fallback already implemented)

**Checklist:**
- [ ] Tests added
- [ ] Tests pass (GREEN state)

---

### Cycle 2.4: Coverage check

**⏱️ Time: 5 min**

```bash
npm test -- --coverage --collectCoverageFrom="src/components/pages/CharacterDetail/services/**/*.ts"
```

**Expected:** > 80% coverage

**Checklist:**
- [ ] Coverage > 80%
- [ ] All paths covered

---

## 📋 PHASE 3: getCharacterComicsService - TDD CYCLES (60 min)

**Service:** `src/components/organisms/CharacterComicList/services/getCharacterComicsService.ts`
**Test file:** `src/components/organisms/CharacterComicList/services/__tests__/getCharacterComicsService.test.ts`

**Features to implement:**
1. Manual pagination (page-based, not cursor)
2. Offset calculation
3. Sorting (A-Z, Z-A)
4. Correct data structure (apiData + offset)

---

### Cycle 3.1: RED - Test for basic structure

**⏱️ Time: 5 min**

Create test file:

```typescript
// src/components/organisms/CharacterComicList/services/__tests__/getCharacterComicsService.test.ts

import getCharacterComicsService from "../getCharacterComicsService";
import { FetchingOrder } from "../../interfaces/characterComics";

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
describe("getCharacterComicsService with manual pagination", () => {
  describe("Data structure", () => {
    it("returns correct API response structure", async () => {
      // ARRANGE
      const params = {
        page: 0,
        maxComics: 10,
        order: FetchingOrder.TITLE_AZ,
        characterId: "1011176",
      };

      // ACT
      const result = await getCharacterComicsService(params);

      // ASSERT
      expect(result).toHaveProperty("apiData");
      expect(result).toHaveProperty("offset");
      expect(result!.apiData).toHaveProperty("results");
      expect(result!.apiData).toHaveProperty("total");
    });
  });
});
```

**Run test:**
```bash
npm test -- getCharacterComicsService.test.ts
```

**Expected:** ❌ **Test FAILS** (service still calls Marvel API)

**Checklist:**
- [ ] Test file created
- [ ] Test **fails** (RED state)

---

### Cycle 3.2: GREEN - Implement basic structure

**⏱️ Time: 15 min**

Update service:

```typescript
// src/components/organisms/CharacterComicList/services/getCharacterComicsService.ts

/**
 * MOCK SERVICE - Marvel API was discontinued
 *
 * LIMITATION: All 100 characters share the same 30 generic comics
 * due to API discontinuation. This is acceptable for a Design System
 * showcase as it demonstrates component functionality.
 */
import { FetchingOrder } from "../interfaces/characterComics";
import mockComics from "../mocks/mockCharacterComics.json";

export interface IGetCharacterComicsServiceProps {
  page: number;
  characterId: string | undefined;
  maxComics: number;
  order: FetchingOrder;
}

const getCharacterComicsService = async ({
  page,
  maxComics,
  order,
}: IGetCharacterComicsServiceProps) => {
  // Simulate network delay to show DS loaders
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    let comics = [...mockComics];

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

**Run test:**
```bash
npm test -- getCharacterComicsService.test.ts
```

**Expected:** ✅ **Test PASSES** (basic structure works)

**Checklist:**
- [ ] Service modified
- [ ] Test passes (GREEN state)

---

### Cycle 3.3: RED - Test for pagination

**⏱️ Time: 5 min**

Add tests:

```typescript
describe("Pagination", () => {
  it("returns first page of 10 comics", async () => {
    // ARRANGE
    const params = {
      page: 0,
      maxComics: 10,
      order: FetchingOrder.TITLE_AZ,
      characterId: "1011176",
    };

    // ACT
    const result = await getCharacterComicsService(params);

    // ASSERT
    expect(result!.apiData.results).toHaveLength(10);
    expect(result!.offset).toBe(0);
  });

  it("returns second page of 10 comics", async () => {
    // ARRANGE
    const params = {
      page: 1,
      maxComics: 10,
      order: FetchingOrder.TITLE_AZ,
      characterId: "1011176",
    };

    // ACT
    const result = await getCharacterComicsService(params);

    // ASSERT
    expect(result!.apiData.results).toHaveLength(10);
    expect(result!.offset).toBe(10); // maxComics * page
  });

  it("calculates offset correctly", async () => {
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
        characterId: "1011176",
      });

      // ASSERT
      expect(result!.offset).toBe(testCase.expectedOffset);
    }
  });
});
```

**Run test:**
```bash
npm test -- getCharacterComicsService.test.ts
```

**Expected:** ✅ **Test PASSES** (pagination already works from basic implementation)

**Checklist:**
- [ ] Tests added
- [ ] Tests pass (GREEN state)

---

### Cycle 3.4: RED - Test for sorting

**⏱️ Time: 5 min**

Add tests:

```typescript
describe("Sorting", () => {
  it("sorts by title A-Z", async () => {
    // ARRANGE
    const params = {
      page: 0,
      maxComics: 30, // All comics
      order: FetchingOrder.TITLE_AZ,
      characterId: "1011176",
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
      characterId: "1011176",
    };

    // ACT
    const result = await getCharacterComicsService(params);

    // ASSERT
    const titles = result!.apiData.results.map((c) => c.title);
    const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
    expect(titles).toEqual(sortedTitles);
  });
});
```

**Run test:**
```bash
npm test -- getCharacterComicsService.test.ts
```

**Expected:** ❌ **Test FAILS** (no sorting implemented)

**Checklist:**
- [ ] Tests added
- [ ] Tests **fail** (RED state)

---

### Cycle 3.5: GREEN - Implement sorting

**⏱️ Time: 10 min**

Update service:

```typescript
const getCharacterComicsService = async ({
  page,
  maxComics,
  order,
}: IGetCharacterComicsServiceProps) => {
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

    // Paginate results
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
```

**Run test:**
```bash
npm test -- getCharacterComicsService.test.ts
```

**Expected:** ✅ **Test PASSES** (sorting works)

**Checklist:**
- [ ] Service modified
- [ ] Tests pass (GREEN state)

---

### Cycle 3.6: Coverage check

**⏱️ Time: 5 min**

```bash
npm test -- --coverage --collectCoverageFrom="src/components/organisms/CharacterComicList/services/**/*.ts"
```

**Expected:** > 80% coverage

**Checklist:**
- [ ] Coverage > 80%
- [ ] All paths covered

---

## 📋 PHASE 4: MANUAL TESTING (30 min)

### Task 4.1: Run all tests

```bash
npm test
```

**Checklist:**
- [ ] All tests pass (green)
- [ ] No TypeScript errors
- [ ] No build errors
- [ ] JSON imports correct (TypeScript compiles)
- [ ] Coverage > 80% on all services
- [ ] No critical warnings

**⚠️ If tests fail:**
- Review the specific failing test
- Check if mock data structure matches expected interfaces
- Adjust mock data if needed (regenerate or manually fix)
- Re-run tests until green
- **Do NOT proceed to browser testing with failing tests**

---

### Task 4.2: Test in browser

```bash
npm start
```

**Visual checklist - Characters (infinite scroll with 100 items):**
- [ ] Characters page loads
- [ ] Cards show with CDN images
- [ ] Shows 100 characters (infinite scroll)
- [ ] Search works
- [ ] Sort filters work (A-Z, Z-A)
- [ ] **Infinite scroll loads more characters (clearly noticeable with 100)**
- [ ] DS loaders display correctly

**Visual checklist - Character detail (dynamic navigation among 100):**
- [ ] Click character → detail page loads
- [ ] **CRITICAL:** Each character shows THEIR unique data (name, description, image)
- [ ] **CRITICAL:** Navigating between different characters shows different data
- [ ] Navigate between different characters
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

## 📋 PHASE 5: DOCUMENTATION (10 min)

### Task 5.1: Add disclaimer to CharacterComicList

**File:** `src/components/organisms/CharacterComicList/CharacterComicList.tsx`

Add before "Displaying X to Y from Z":

```tsx
<p className="text-sm text-gray-500 italic mb-3 mt-2">
  Note: Comics shown are for demonstration purposes due to Marvel API
  discontinuation
</p>
```

**Checklist:**
- [ ] Disclaimer added
- [ ] Visually verified

---

### Task 5.2: Update README.md

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

**Checklist:**
- [ ] README updated with complete mock data documentation
- [ ] Explains mock data strategy clearly
- [ ] Documents technical implementation details
- [ ] Mentions TDD approach used for migration

---

## 🎯 SUCCESS METRICS

### ✅ Minimum requirements
- [ ] Project compiles without errors
- [ ] All tests pass (green)
- [ ] Application starts locally
- [ ] Characters: infinite scroll works with 100 items
- [ ] Comics: manual pagination works
- [ ] CDN images load correctly
- [ ] Coverage > 80% on all services

### ✅ Application works
- [ ] No TypeScript errors
- [ ] No build errors
- [ ] No console errors in browser
- [ ] Characters page functional
- [ ] Detail pages functional
- [ ] Comics pagination functional

### 🌟 Strategic objectives
- [ ] **Design System shines:** All components visible and functional
- [ ] **Infinite scroll visible:** With 100 characters functionality is clearly noticeable
- [ ] **DS states visible:** Loading, error, empty states work
- [ ] **Smooth navigation:** No broken links or console errors
- [ ] **Clear README:** Explains using mocks due to API discontinuation
- [ ] **Clean code:** Comments explain the change

### ✅ TDD process followed
- [ ] Each feature had RED-GREEN-REFACTOR cycle
- [ ] Tests written BEFORE implementation
- [ ] No implementation without tests
- [ ] Commits show TDD process
- [ ] Each cycle has clear RED → GREEN → REFACTOR commits

---

## 📝 GIT COMMIT STRATEGY

**Follow TDD commit pattern:**

For each cycle:
1. `RED: Add test for [feature]`
2. `GREEN: Implement [feature]`
3. `REFACTOR: Clean up [feature]` (if applicable)

Example:
```bash
git add .
git commit -m "RED: Add test for character search filtering"

git add .
git commit -m "GREEN: Implement character search filtering"

git add .
git commit -m "REFACTOR: Extract filtering logic to separate function"
```

**Final commits:**
```bash
git add .
git commit -m "Complete TDD migration of getCharactersService (100% coverage)"

git add .
git commit -m "Complete TDD migration of getCharacterDetailsService (100% coverage)"

git add .
git commit -m "Complete TDD migration of getCharacterComicsService (100% coverage)"

git add .
git commit -m "Add UI disclaimer for generic comics"

git add .
git commit -m "Update README with mock data documentation"
```

---

## 🚀 ESTIMATED TIME BREAKDOWN

| Phase | Task | Time |
|-------|------|------|
| **Phase 0** | Setup & preparation | 15 min |
| **Phase 1** | getCharactersService (14 cycles) | 90 min |
| **Phase 2** | getCharacterDetailsService (4 cycles) | 45 min |
| **Phase 3** | getCharacterComicsService (6 cycles) | 60 min |
| **Phase 4** | Manual testing | 30 min |
| **Phase 5** | Documentation | 10 min |
| **TOTAL** | | **3h 50min** |

**Why TDD takes longer than v2.3 (2h 35min):**
- ✅ More robust tests (written first)
- ✅ Better code quality (refactor step)
- ✅ Living documentation (tests explain behavior)
- ✅ Fewer bugs (caught immediately)
- ✅ Future confidence (easy to refactor later)

**Investment pays off:**
- Future changes are safer
- New developers understand code faster
- Refactoring is fearless
- Technical debt is minimized

---

**Document created:** November 16, 2025
**Methodology:** Test-Driven Development (TDD)
**Next version:** v2.5 (if needed for optimizations)
