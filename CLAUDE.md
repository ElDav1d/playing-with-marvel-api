# CLAUDE.md - AI Assistant Guide

> **Last Updated**: 2025-11-16
> **Project**: Playing With Marvel API
> **Status**: Under Maintenance (Marvel API sunset in Nov 2025)

This document provides comprehensive guidance for AI assistants working on this codebase. It explains the architecture, conventions, workflows, and best practices to follow when making changes.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Codebase Structure](#codebase-structure)
3. [Architecture Patterns](#architecture-patterns)
4. [Development Workflow](#development-workflow)
5. [Code Conventions](#code-conventions)
6. [Testing Practices](#testing-practices)
7. [Common Tasks](#common-tasks)
8. [Important Files & Locations](#important-files--locations)
9. [Gotchas & Known Issues](#gotchas--known-issues)
10. [Best Practices for AI Assistants](#best-practices-for-ai-assistants)

---

## Project Overview

### Purpose
A React TypeScript web application that mimics the Marvel Characters page, focusing on accessible UI development and design system patterns. The UI component library extracted from this project (`eldav1d-marvel-ui`) is the main showcase of the author's work as a Design System / UI Engineer.

### Tech Stack
- **Framework**: React 18.2.0
- **Language**: TypeScript 4.4.2
- **Build Tool**: Create React App + Craco 7.0.0
- **State Management**: Context API + useReducer + react-combine-reducers
- **Data Fetching**: TanStack React Query 5.25.0
- **Routing**: React Router v6.4.1
- **Styling**: Tailwind CSS 3.4.3
- **UI Library**: eldav1d-marvel-ui 1.1.4 (custom)
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Error Tracking**: Bugfender SDK 2.3.0

### Key Features
- Character search by name
- Filtering (by image/description presence)
- Ordering (by name/modification date)
- Infinite scroll pagination
- Responsive mobile-first design
- Full keyboard navigation
- Screen reader support (tested on VoiceOver)

---

## Codebase Structure

### Directory Overview

```
src/
├── components/
│   ├── atoms/           # Smallest UI units (Logo, SearchIcon, CloseIcon, Image)
│   ├── molecules/       # Atom combinations (SearchGroup, SelectGroup, ListItem)
│   ├── organisms/       # Complex components (CharacterList, Header, Footer)
│   └── pages/           # Route components (Characters, CharacterDetail)
│
├── hooks/               # Global custom hooks
│   ├── useFocusTrap.ts
│   ├── useMediaQuery.ts
│   ├── useOutsideClick.ts
│   └── useScrollY.ts
│
├── types/               # Global TypeScript types
│   └── globals.ts
│
├── utils/               # Utilities and constants
│   ├── constants.ts     # API URLs, UI strings, breakpoints
│   ├── helpers.ts       # Utility functions
│   └── testHelpers.ts   # Jest/Testing utilities
│
├── App.tsx             # Root component (routing + React Query setup)
├── index.tsx           # Entry point (Bugfender initialization)
├── setupTests.ts       # Jest configuration
└── index.css           # Global styles
```

### Component Organization (Atomic Design)

**Atoms** (`/components/atoms/`):
- Single-purpose, minimal UI elements
- Examples: Logo, SearchIcon, CloseIcon, Image
- No business logic, presentational only

**Molecules** (`/components/molecules/`):
- Combinations of atoms with simple behavior
- Examples: CharactersSearchGroup, CharactersSelectGroup, CharacterListItem
- May have local state but no context consumption

**Organisms** (`/components/organisms/`):
- Complex components with multiple molecules/atoms
- Examples: CharacterList, Header, Footer, SideDrawer
- May contain services, hooks, and mocks folders
- Often consume context or fetch data

**Pages** (`/components/pages/`):
- Full route components
- Examples: Characters, CharacterDetail
- May have context providers, reducers, hooks, interfaces
- Should coordinate organisms rather than implement UI

### Collocated Files Pattern

Components may have collocated folders:

```
CharacterList/
├── CharacterList.tsx
├── services/
│   └── getCharactersService.ts
├── hooks/
│   ├── useCharacters.ts
│   └── useFilteredCharacters.tsx
├── mocks/
│   └── characters.json
└── __tests__/
    ├── CharacterList.test.tsx
    └── __snapshots__/
```

**Rule**: Keep related code close to where it's used. Only promote to global locations when shared across multiple components.

---

## Architecture Patterns

### 1. State Management

#### Context + Reducer Pattern

**Location**: `/src/components/pages/Characters/`

**Structure**:
```
context/
├── CharactersContext.ts          # createContext + types
├── CharactersProvider.tsx        # Provider with sessionStorage sync
└── reducers/
    ├── FiltersReducer.ts         # Manages withImage, withDescription
    ├── SearchStringReducer.ts    # Manages search query
    └── OrderReducer.ts           # Manages sort order
```

**Combined Reducer**: Uses `react-combine-reducers` to merge three reducers into one state object:

```typescript
{
  searchString: string,
  filters: { withImage: boolean, withDescription: boolean },
  order: FetchingOrder
}
```

**Persistence**: State auto-syncs to `sessionStorage` under key `__characters__state__`

**Access Pattern**:
```typescript
import { useCharactersContext } from '@/components/pages/Characters/hooks';

const { charactersContextState, charactersContextDispatch } = useCharactersContext();
```

#### When to Use Context

- ✅ Page-level state shared by multiple organisms
- ✅ Form/filter state that should persist on refresh
- ✅ UI state (drawer open/close, selected items)
- ❌ Server data (use React Query instead)
- ❌ Component-local state (use useState)

### 2. Data Fetching

#### Service Layer

**Pattern**: Collocated with consuming component

```typescript
// Example: /components/organisms/CharacterList/services/getCharactersService.ts

export async function getCharactersService({
  pageParam = 0,
  maxCharacters = MAX_FETCHED_ITEMS,
  searchString = '',
  order = FetchingOrder.NAME_ASC,
}): Promise<{ characters: ICharacterItem[]; nextCursor: number | null }> {
  const url = buildApiUrl({ offset: pageParam, searchString, order });
  const response = await fetch(url);
  const data = await response.json();

  return {
    characters: data.data.results,
    nextCursor: /* calculate next page */,
  };
}
```

**API Integration**:
- Base URL: `https://gateway.marvel.com:443/v1/public/characters`
- Auth: `REACT_APP_MARVEL_API_KEY` from `.env`
- Query params: `nameStartsWith`, `orderBy`, `limit`, `offset`, `apikey`

#### React Query Integration

**Pattern**: Custom hook wrapping useQuery/useInfiniteQuery

```typescript
// Example: /components/organisms/CharacterList/hooks/useCharacters.ts

export const useCharacters = ({ searchString, order, filters }) => {
  return useInfiniteQuery({
    queryKey: ['characters', searchString, order, filters],
    queryFn: ({ pageParam = 0 }) =>
      getCharactersService({ pageParam, searchString, order }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
```

**Key Points**:
- Query keys include all dependencies for reactivity
- Use `useInfiniteQuery` for paginated lists
- Use `useQuery` for single resource fetches
- Let React Query handle caching, refetching, loading states

### 3. Custom Hooks Strategy

#### Global Hooks (`/src/hooks/`)

| Hook | Purpose | Returns |
|------|---------|---------|
| `useMediaQuery(query)` | Responsive breakpoint detection | `boolean` |
| `useFocusTrap(ref)` | Trap focus for modals/drawers | `void` |
| `useOutsideClick(ref, callback)` | Detect clicks outside element | `void` |
| `useScrollY()` | Track scroll position | `number` |

#### Page-Specific Hooks (`/pages/Characters/hooks/`)

| Hook | Purpose | Returns |
|------|---------|---------|
| `useCharactersContext()` | Access Characters context | `{ state, dispatch }` |
| `useDebounce(value, delay)` | Debounce rapid changes | `debouncedValue` |

#### Organism Hooks (`/organisms/CharacterList/hooks/`)

| Hook | Purpose | Returns |
|------|---------|---------|
| `useCharacters(params)` | Fetch characters | `UseInfiniteQueryResult` |
| `useFilteredCharacters(characters, filters)` | Filter characters client-side | `ICharacterItem[]` |

**Rule**: Create custom hooks for reusable logic. Keep hooks close to where they're used until needed elsewhere.

### 4. Routing

**Router**: React Router v6 BrowserRouter

**Routes**:
```typescript
/ → <Characters />                         // Main list page
/character/:id/:name → <CharacterDetail /> // Detail page
```

**Navigation**:
- Use `<Link>` from `eldav1d-marvel-ui` (wraps react-router-dom)
- Use `useParams()` to extract route parameters
- Use `useNavigate()` for programmatic navigation

**Route Parameters**:
- `id`: Character ID (number, for API calls)
- `name`: Character name (string, for display/SEO)

---

## Development Workflow

### Setup

```bash
# Install dependencies
npm install
# or
yarn

# Start dev server (http://localhost:3000)
npm start
# or
yarn start
```

**Environment Variables**:
Create `.env` file (not tracked in git):
```
REACT_APP_MARVEL_API_KEY=your_api_key_here
```

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server with hot reload |
| `npm test` | Run tests in watch mode |
| `npm run build` | Production build to `/build` |
| `npm run lint` | Check ESLint rules |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format with Prettier |

### Build Configuration

**Craco** overrides Create React App:
- Path alias: `@/` → `./src/`
- Jest configuration for TypeScript
- Custom webpack aliases

**Import Paths**:
```typescript
// ✅ Preferred (uses path alias)
import { Logo } from '@/components/atoms/Logo';

// ❌ Avoid (relative paths)
import { Logo } from '../../../atoms/Logo';
```

---

## Code Conventions

### TypeScript

**Strict Mode**: Enabled

**Interface Naming**:
- Prefix with `I`: `ICharacterItem`, `ICharacterDetails`
- Props interfaces: `ComponentNameProps`

**Type Definitions**:
- Global types: `/src/types/globals.ts`
- Component-specific: collocated `interfaces/` folder
- Prefer `interface` over `type` for object shapes

**Example**:
```typescript
// Good
interface ICharacter {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

interface CharacterListProps {
  characters: ICharacter[];
  onSelect?: (id: number) => void;
}

// Avoid
type Character = {
  id: number;
  name: string;
}
```

### ESLint Rules

**Key Rules** (from `.eslintrc.json`):
- `camelcase: error` - Enforce camelCase naming
- `quotes: ['error', 'single']` - Use single quotes
- `no-duplicate-imports: error` - No duplicate imports
- `spaced-comment: error` - Space after `//` in comments
- `react/react-in-jsx-scope: off` - React 18 auto-imports
- `react/display-name: off` - No need for display names

### Prettier Rules

**Key Settings** (from `.prettierrc`):
```json
{
  "semi": true,                // Semicolons required
  "tabWidth": 2,               // 2 spaces per indent
  "printWidth": 100,           // Max 100 chars per line
  "singleQuote": true,         // Use single quotes
  "trailingComma": "all",      // Trailing commas everywhere
  "jsxSingleQuote": true,      // Single quotes in JSX
  "bracketSpacing": true       // Space in { foo }
}
```

**Example**:
```typescript
// ✅ Correct
const example = {
  foo: 'bar',
  baz: 'qux',
};

// ❌ Incorrect
const example = {
  foo: "bar",
  baz: "qux"
}
```

### Component Conventions

**File Naming**:
- Component files: `ComponentName.tsx`
- Test files: `ComponentName.test.tsx`
- Hook files: `useHookName.ts`
- Service files: `getResourceService.ts`
- Reducer files: `FeatureReducer.ts`

**Component Structure**:
```typescript
// 1. Imports (React first, then 3rd party, then local)
import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'eldav1d-marvel-ui';

import { useCharactersContext } from '@/components/pages/Characters/hooks';
import { ICharacter } from './interfaces';

// 2. Interfaces
interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

// 3. Component
export const ComponentName: FC<ComponentNameProps> = ({ title, onAction }) => {
  // 3a. Hooks
  const [state, setState] = useState(false);
  const { data } = useQuery(/* ... */);

  // 3b. Event handlers
  const handleClick = () => {
    setState(true);
    onAction?.();
  };

  // 3c. Render helpers (if needed)
  const renderHeader = () => <h1>{title}</h1>;

  // 3d. Return JSX
  return (
    <div>
      {renderHeader()}
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
};
```

### Naming Conventions

**Variables & Functions**:
```typescript
// ✅ camelCase
const characterList = [];
const getCharacters = () => {};
const isLoading = false;

// ❌ snake_case, PascalCase (except components)
const character_list = [];
const GetCharacters = () => {};
```

**Components**:
```typescript
// ✅ PascalCase
const CharacterList = () => {};
export const SearchInput = () => {};

// ❌ camelCase
const characterList = () => {};
```

**Constants**:
```typescript
// ✅ SCREAMING_SNAKE_CASE for true constants
const MAX_FETCHED_ITEMS = 50;
const MARVEL_API_URL = 'https://...';

// ✅ camelCase for config objects
const breakpoints = {
  md: '768px',
  lg: '1024px',
};
```

**Boolean Prefixes**:
```typescript
// ✅ Use is/has/should prefixes
const isLoading = true;
const hasError = false;
const shouldRender = true;

// ❌ Avoid ambiguous names
const loading = true;
const error = false;
```

### CSS/Styling

**Tailwind First**: Use Tailwind utility classes

```tsx
// ✅ Preferred
<div className='flex items-center gap-4 p-4 bg-red-500'>

// ⚠️ Use sparingly (only for complex/dynamic styles)
<div style={{ transform: `translateY(${scrollY}px)` }}>
```

**Custom Tailwind Extensions** (from `tailwind.config.js`):
- Colors: `text-red` (MARVEL_RED from UI library)
- Animations: `animate-appearFromTop`
- Grid: `grid-cols-auto-min-max-120-auto`, `grid-cols-auto-min-max-185-auto`
- Spacing: `h-logoDefaultHeight`
- Z-index: `z-1`

**eldav1d-marvel-ui Components**:
Use the custom UI library for consistent Marvel styling:
- `<Logo />`, `<Image />`, `<Link />`, `<Button />`
- Import from `eldav1d-marvel-ui`
- Check library docs: https://github.com/ElDav1d/eldav1d-marvel-ui

---

## Testing Practices

### Testing Stack

- **Framework**: Jest (via Craco)
- **React Testing**: @testing-library/react 14.2.1
- **User Events**: @testing-library/user-event 14.5.2
- **Matchers**: @testing-library/jest-dom 6.4.2
- **TypeScript**: ts-jest 29.1.3

### Testing Philosophy

**Test Pyramid - LAYER 2: Unit Tests (Foundation of TDD)**

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

**Testing priorities:**

1. **Services/Business Logic** - Unit tests that validate core functionality
2. **Component Behavior** - Integration tests for user interactions
3. **Accessibility** - Ensure components work with assistive technologies

### Test File Location

```
Component/
├── Component.tsx
└── __tests__/
    ├── Component.test.tsx
    └── __snapshots__/
        └── Component.test.tsx.snap
```

### Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterList } from '../CharacterList';

describe('CharacterList', () => {
  it('renders character items', () => {
    const characters = [{ id: 1, name: 'Spider-Man' }];
    render(<CharacterList characters={characters} />);

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onSelect = jest.fn();
    render(<CharacterList characters={[]} onSelect={onSelect} />);

    const button = screen.getByRole('button', { name: /select/i });
    await userEvent.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<CharacterList characters={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
```

### Service Testing

**File Location for Service Tests:**

```
services/
├── getCharactersService.ts
└── __tests__/
    └── getCharactersService.test.ts
```

Service tests are **pure logic tests** that don't require React Testing Library. They test the Application Layer (business logic) in isolation.

**Key Differences from Component Tests:**

| Aspect | Component Tests | Service Tests |
|--------|----------------|---------------|
| **What to test** | UI rendering, user interactions | Business logic, data transformations |
| **Imports** | `render, screen` from @testing-library/react | Only the service and types |
| **Setup** | `render(<Component />)` | Direct function call `await service(params)` |
| **Queries** | `screen.getByRole()`, `screen.getByText()` | None (no DOM) |
| **Assertions** | `.toBeInTheDocument()` | `.toBeDefined()`, `.toHaveLength()`, `.toBe()` |
| **Pattern** | Given-When-Then (implicit) | **ARRANGE-ACT-ASSERT** (explicit) |
| **Async** | Optional | Always (services are async) |

**Service Test Structure (ARRANGE-ACT-ASSERT pattern):**

```typescript
import getCharactersService from "../getCharactersService";
import { FetchingOrder } from "@/components/pages/Characters/interfaces/characters";

/**
 * Tests for getCharactersService - Service with mocked characters
 *
 * These tests validate pagination, filtering, and sorting logic
 * without requiring React or DOM.
 */
describe("getCharactersService with mocked data", () => {
  describe("Pagination (infinite scroll)", () => {
    it("returns first page of 50 characters", async () => {
      // ARRANGE - Set up test data and parameters
      const params = {
        pageParam: 0,
        maxCharacters: 50,
        searchString: "",
        order: FetchingOrder.NAME_AZ,
      };

      // ACT - Execute the service function
      const result = await getCharactersService(params);

      // ASSERT - Verify the results
      expect(result).toBeDefined();
      expect(result!.characters).toHaveLength(50);
      expect(result!.nextCursor).toBe(1); // There's a second page
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
      expect(result!.nextCursor).toBeNull(); // Last page (100 total)
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
  });
});
```

**When to Write Service Tests:**

- ✅ **DO** write service tests for:
  - Data fetching and transformation logic
  - Pagination calculations
  - Sorting and filtering algorithms
  - Business rules and validations
  - API response parsing

- ❌ **DON'T** use service tests for:
  - UI rendering (use component tests)
  - User interactions (use component tests)
  - Accessibility (use component tests with Testing Library)

**Benefits of Service Tests:**

1. **Fast execution** - No React rendering overhead
2. **Isolated testing** - Pure logic, no dependencies
3. **Early bug detection** - Catch issues before UI integration
4. **Better debugging** - Pinpoint exact logic failures
5. **TDD-friendly** - Write tests before implementation

### Testing Utilities

**Setup File** (`src/setupTests.ts`):
- Mocks `IntersectionObserver` for infinite scroll components
- Mocks `react-lazy-load-image-component`
- Imports jest-dom matchers

**Test Helpers** (`src/utils/testHelpers.ts`):
- `setUpMatchMedia()` - Mock window.matchMedia for responsive tests
- Custom render functions with providers

### Mocking Patterns

**Mock Hooks**:
```typescript
jest.mock('@/components/organisms/CharacterList/hooks', () => ({
  useCharacters: jest.fn(),
  useFilteredCharacters: jest.fn(),
}));

// In test
const mockUseCharacters = useCharacters as jest.Mock;
mockUseCharacters.mockReturnValue({
  data: { pages: [{ characters: [] }] },
  isLoading: false,
});
```

**Mock Services**:
```typescript
jest.mock('../services/getCharactersService', () => ({
  getCharactersService: jest.fn(),
}));
```

**Mock Data**:
Store in `mocks/` folder:
```
hooks/
  useCharacters.ts
mocks/
  characters.json
__tests__/
  CharacterList.test.tsx
```

### Accessibility Testing

**Query Priority** (from Testing Library):
1. `getByRole` (preferred - tests accessibility)
2. `getByLabelText` (forms)
3. `getByPlaceholderText` (forms)
4. `getByText` (content)
5. `getByTestId` (last resort)

```typescript
// ✅ Preferred (accessible queries)
screen.getByRole('button', { name: /search/i })
screen.getByLabelText(/character name/i)

// ❌ Avoid (brittle, not accessible)
screen.getByTestId('search-button')
```

### Running Tests

```bash
# Watch mode (recommended for development)
npm test

# Run all tests once
npm test -- --watchAll=false

# Coverage
npm test -- --coverage

# Update snapshots
npm test -- -u
```

### Coverage Requirements

**Service Tests Coverage Target:**

- **Minimum requirement**: > 80% coverage on service files
- **Focus**: Business logic layer (pagination, filtering, sorting, data transformations)
- **Priority**: Services are the Application Layer and contain core functionality

**Coverage Focus Areas:**

1. **Happy paths** - Normal usage flows
   - First page, middle page, last page (pagination)
   - Valid search terms
   - Standard sorting orders

2. **Edge cases** - Boundary conditions
   - Empty results
   - Last page detection
   - Invalid or non-existent IDs
   - Empty search strings

3. **Business logic** - Core algorithms
   - Sorting algorithms (A-Z, Z-A)
   - Filtering logic (case insensitive search)
   - Pagination calculations (offset, cursor, nextPage)
   - Data transformations

**Running Coverage Reports:**

```bash
# Generate coverage report
npm test -- --coverage

# Check coverage for specific file
npm test -- --coverage --collectCoverageFrom="src/components/organisms/CharacterList/services/**/*.ts"
```

**Interpreting Results:**

- ✅ **Good**: > 80% coverage with happy paths + edge cases
- ⚠️ **Acceptable**: 70-80% coverage (identify gaps)
- ❌ **Insufficient**: < 70% coverage (add more tests)

**Why 80% for services:**

- Services contain business logic that's critical to application functionality
- Higher coverage = higher confidence in migrations and refactors
- Prevents bugs from reaching UI layer
- Faster debugging when issues occur

---

## Common Tasks

### Adding a New Page Component

1. Create page folder: `/src/components/pages/NewPage/`
2. Create component: `NewPage.tsx`
3. Add route in `/src/App.tsx`:
   ```typescript
   <Route path='/new-page' element={<NewPage />} />
   ```
4. Add tests: `__tests__/NewPage.test.tsx`
5. If needed, add context provider: `context/NewPageProvider.tsx`

### Adding a New Organism

1. Create folder: `/src/components/organisms/NewOrganism/`
2. Create component: `NewOrganism.tsx`
3. If fetching data:
   - Add service: `services/getNewDataService.ts`
   - Add hook: `hooks/useNewData.ts`
   - Add types: `interfaces/INewData.ts`
4. Add tests: `__tests__/NewOrganism.test.tsx`
5. Add mock data: `mocks/newData.json`

### Adding State to Characters Context

1. Create new reducer: `/src/components/pages/Characters/context/reducers/NewFeatureReducer.ts`
2. Define actions and state shape:
   ```typescript
   export interface NewFeatureState {
     value: string;
   }

   export type NewFeatureAction =
     | { type: 'SET_VALUE'; value: string }
     | { type: 'CLEAR_VALUE' };

   export const newFeatureReducer = (
     state: NewFeatureState,
     action: NewFeatureAction
   ): NewFeatureState => {
     switch (action.type) {
       case 'SET_VALUE':
         return { value: action.value };
       case 'CLEAR_VALUE':
         return { value: '' };
       default:
         return state;
     }
   };
   ```
3. Add to combined reducer in `CharactersContext.ts`:
   ```typescript
   import { newFeatureReducer } from './reducers/NewFeatureReducer';

   const [charactersContextReducer, initialState] = combineReducers({
     searchString: [searchStringReducer, searchStringInitialState],
     filters: [filtersReducer, filtersInitialState],
     order: [orderReducer, orderInitialState],
     newFeature: [newFeatureReducer, { value: '' }], // ADD THIS
   });
   ```
4. Update sessionStorage sync in `CharactersProvider.tsx`

### Adding a New API Endpoint

1. Create service function:
   ```typescript
   // services/getNewResourceService.ts
   export async function getNewResourceService(id: number) {
     const url = `${MARVEL_API_URL}/resource/${id}?apikey=${apiKey}`;
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error('Failed to fetch resource');
     }
     const data = await response.json();
     return data.data.results;
   }
   ```
2. Create custom hook:
   ```typescript
   // hooks/useNewResource.ts
   export const useNewResource = (id: number) => {
     return useQuery({
       queryKey: ['newResource', id],
       queryFn: () => getNewResourceService(id),
     });
   };
   ```
3. Use in component:
   ```typescript
   const { data, isLoading, error } = useNewResource(characterId);
   ```

### Adding a Global Custom Hook

1. Create hook file: `/src/hooks/useNewHook.ts`
2. Export hook function:
   ```typescript
   export const useNewHook = (param: string) => {
     const [value, setValue] = useState(param);
     // ... hook logic
     return { value, setValue };
   };
   ```
3. Import where needed:
   ```typescript
   import { useNewHook } from '@/hooks/useNewHook';
   ```

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update specific package
npm install package-name@latest

# Update all minor/patch versions
npm update

# After updates, test thoroughly
npm test
npm run build
```

---

## Important Files & Locations

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, metadata |
| `tsconfig.json` | TypeScript compiler options |
| `tsconfig.paths.json` | Path aliases (`@/*`) |
| `craco.config.js` | CRA overrides (webpack, jest) |
| `tailwind.config.js` | Tailwind customization |
| `.eslintrc.json` | ESLint rules |
| `.prettierrc` | Prettier formatting |
| `.env` | Environment variables (not tracked) |

### Key Source Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component, routing, React Query |
| `src/index.tsx` | Entry point, Bugfender init |
| `src/setupTests.ts` | Jest global setup |
| `src/utils/constants.ts` | API URLs, UI strings, breakpoints |
| `src/types/globals.ts` | Global TypeScript types |

### Character Context Files

| File | Purpose |
|------|---------|
| `pages/Characters/context/CharactersContext.ts` | Context definition |
| `pages/Characters/context/CharactersProvider.tsx` | Provider with storage sync |
| `pages/Characters/context/reducers/FiltersReducer.ts` | Filter state logic |
| `pages/Characters/context/reducers/SearchStringReducer.ts` | Search state logic |
| `pages/Characters/context/reducers/OrderReducer.ts` | Sort order logic |
| `pages/Characters/hooks/useCharactersContext.ts` | Context consumer hook |

### CharacterList Files

| File | Purpose |
|------|---------|
| `organisms/CharacterList/CharacterList.tsx` | Main list component |
| `organisms/CharacterList/services/getCharactersService.ts` | Fetch characters API |
| `organisms/CharacterList/hooks/useCharacters.ts` | React Query hook |
| `organisms/CharacterList/hooks/useFilteredCharacters.tsx` | Client-side filtering |
| `organisms/CharacterList/mocks/characters.json` | Test data |

---

## Gotchas & Known Issues

### 1. Marvel API Shutdown

**Issue**: The Marvel API was permanently shut down in November 2025. The application currently returns server errors.

**What This Means**:
- API calls to `https://gateway.marvel.com` will fail
- The application cannot fetch real data
- The project is in maintenance mode

**For Development**:
- Use mock data for testing
- Focus on UI library (`eldav1d-marvel-ui`) which is unaffected
- Consider migrating to a different API if needed

### 2. Path Aliases

**Issue**: TypeScript path alias `@/` requires configuration in multiple places.

**Files to Update** when adding new aliases:
- `tsconfig.paths.json` - TypeScript compiler
- `craco.config.js` - Webpack resolution
- `craco.config.js` - Jest module mapper

**Example**:
```json
// tsconfig.paths.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"] // NEW
    }
  }
}
```

### 3. IntersectionObserver Mock

**Issue**: IntersectionObserver is used for infinite scroll but not available in Jest.

**Solution**: Already mocked in `setupTests.ts`. Do NOT remove this mock or tests will fail.

### 4. SessionStorage vs LocalStorage

**Issue**: Characters state is persisted to `sessionStorage`, not `localStorage`.

**Implication**:
- State survives page refresh
- State does NOT survive:
  - Closing the browser tab
  - Opening in a new tab
  - Duplicate tab (Cmd+T / Ctrl+T)

**Why**: Intentional design to avoid cross-tab state pollution.

### 5. React Query Devtools

**Issue**: React Query Devtools appear in development mode.

**Location**: Bottom-right corner of screen.

**To Disable**: Remove from `App.tsx`:
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Remove this line
<ReactQueryDevtools initialIsOpen={false} />
```

### 6. Tailwind Custom Values

**Issue**: Custom Tailwind values are imported from `src/utils/constants.ts`.

**Implication**: Changes to constants affect Tailwind classes. Rebuild may be required.

**Example**:
```javascript
// tailwind.config.js
import { HERO_BACKGROUND_URL } from './src/utils/constants';

backgroundImage: {
  'hero-image': `url(${HERO_BACKGROUND_URL})`,
}
```

### 7. eldav1d-marvel-ui Dependency

**Issue**: Custom UI library provides themed components.

**Implication**:
- Updates to UI components require updating the npm package
- Local changes to UI components won't work (must be in the library)
- Some Tailwind classes come from the library

**Library Repo**: https://github.com/ElDav1d/eldav1d-marvel-ui

### 8. Strict Mode

**Issue**: TypeScript strict mode is enabled.

**Implication**:
- Nullable types must be handled explicitly
- `any` type should be avoided
- Function return types should be explicit

**Example**:
```typescript
// ✅ Handle nullability
const thumbnail = character?.thumbnail?.path ?? 'default.jpg';

// ❌ Will error
const thumbnail = character.thumbnail.path; // Object possibly undefined
```

### 9. React 18 Auto-Imports

**Issue**: React 18 doesn't require `import React from 'react'` in JSX files.

**Implication**: ESLint rule `react/react-in-jsx-scope` is disabled. Don't add manual imports.

```typescript
// ✅ Correct (React 18)
export const Component = () => <div>Hello</div>;

// ❌ Unnecessary
import React from 'react';
export const Component = () => <div>Hello</div>;
```

### 10. useDebounce Hook

**Issue**: Search input uses a 500ms debounce to avoid excessive API calls.

**Location**: `pages/Characters/hooks/useDebounce.ts`

**Implication**: Tests must account for delay or mock the hook.

```typescript
// In tests
jest.mock('@/components/pages/Characters/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value, // No delay in tests
}));
```

---

## Best Practices for AI Assistants

### ⚠️ CRITICAL: Git Operations Policy

**NEVER create commits or push to remote without explicit user permission.**

This is a strict requirement. The AI assistant must:
- ❌ **NEVER** run `git commit` without user explicitly requesting it
- ❌ **NEVER** run `git push` without user explicitly requesting it
- ❌ **NEVER** assume that completing a task means creating a commit
- ✅ **ALWAYS** ask the user if they want to commit changes
- ✅ **ALWAYS** ask the user if they want to push changes
- ✅ **ONLY** perform git operations when the user explicitly says "commit" or "push"

**Example of correct behavior:**
```
User: "Add a new feature X"
Assistant: [implements feature]
Assistant: "I've completed feature X. Would you like me to commit these changes?"
User: "Yes, commit and push"
Assistant: [creates commit and pushes]
```

**Example of incorrect behavior:**
```
User: "Add a new feature X"
Assistant: [implements feature and commits without asking]  ❌ WRONG
```

This policy ensures the user maintains full control over git history and remote repository state.

---

### Code Changes

1. **Read Before Writing**
   - Always read existing files before modifying
   - Understand the current pattern before adding new code
   - Check for similar implementations elsewhere

2. **Follow Existing Patterns**
   - Match the architectural patterns already in place
   - Use the same naming conventions
   - Keep the same file structure

3. **Maintain Consistency**
   - If using Context API in one place, don't introduce Redux elsewhere
   - If services are collocated with components, keep doing that
   - Follow the Atomic Design hierarchy

4. **Write Tests**
   - Add tests for new components
   - Update tests when modifying components
   - Use snapshot tests for UI regression
   - Use role-based queries for accessibility

5. **Type Safety**
   - Define interfaces for all props
   - Add return types to functions
   - Avoid `any` type
   - Use TypeScript strict mode features

### Common Mistakes to Avoid

1. **Breaking Path Aliases**
   ```typescript
   // ❌ Avoid relative paths
   import { Logo } from '../../../atoms/Logo';

   // ✅ Use path aliases
   import { Logo } from '@/components/atoms/Logo';
   ```

2. **Mixing State Management**
   ```typescript
   // ❌ Don't mix patterns in same feature
   const [local, setLocal] = useState(); // useState
   const { global } = useContext();      // Context
   const { data } = useQuery();          // React Query

   // ✅ Choose one pattern per concern
   // Local UI state → useState
   // Shared page state → Context
   // Server data → React Query
   ```

3. **Not Following Atomic Design**
   ```typescript
   // ❌ Don't put complex logic in atoms
   // atoms/SearchInput.tsx
   const SearchInput = () => {
     const { data } = useQuery(); // Too complex for an atom
     // ...
   };

   // ✅ Keep atoms simple, move logic to organisms
   // organisms/CharacterSearch/CharacterSearch.tsx
   const CharacterSearch = () => {
     const { data } = useQuery();
     return <SearchInput value={data?.query} />;
   };
   ```

4. **Forgetting Accessibility**
   ```tsx
   // ❌ Missing semantic HTML and ARIA
   <div onClick={handleClick}>Click me</div>

   // ✅ Use semantic elements
   <button onClick={handleClick}>Click me</button>

   // ✅ Add ARIA when needed
   <div role='button' tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
     Click me
   </div>
   ```

5. **Not Updating Tests**
   ```typescript
   // ❌ Don't just update the component
   const CharacterList = ({ characters, filter }) => {
     // Added filter prop but didn't update tests
   };

   // ✅ Update tests when changing API
   it('applies filter', () => {
     render(<CharacterList characters={[]} filter='withImage' />);
     // ... test filter behavior
   });
   ```

### When Adding Features

1. **Plan the Architecture**
   - Where does this fit in the atomic hierarchy?
   - Does it need state? Where should state live?
   - Does it need data? Service + hook or Context?

2. **Consider Existing Patterns**
   - How are similar features implemented?
   - Can I reuse existing hooks/services?
   - Should this be collocated or global?

3. **Think About Testing**
   - What user interactions need testing?
   - What edge cases should be covered?
   - What mocks are needed?

4. **Maintain Accessibility**
   - Can it be keyboard navigated?
   - Does it work with screen readers?
   - Are ARIA attributes needed?

5. **Document If Needed**
   - Add JSDoc comments for complex logic
   - Update this CLAUDE.md if adding new patterns
   - Add inline comments for non-obvious code

### Code Review Checklist

Before submitting changes, verify:

- [ ] Code follows existing patterns and conventions
- [ ] Path aliases are used (not relative paths)
- [ ] TypeScript types are defined (no `any`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Prettier formatted (`npm run format`)
- [ ] Tests added/updated
- [ ] Tests pass (`npm test`)
- [ ] Accessibility maintained (semantic HTML, keyboard nav)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] Responsive design works (mobile + desktop)
- [ ] State management pattern is appropriate
- [ ] Components are in the right atomic level
- [ ] Files are collocated correctly

### Getting Help

If stuck or unsure:

1. **Search Codebase**: Look for similar implementations
   - Use `Glob` to find files by pattern
   - Use `Grep` to search for code snippets
   - Read tests to understand usage

2. **Check Documentation**:
   - README.md for project overview
   - This CLAUDE.md for architecture
   - Component files for JSDoc comments

3. **Review Dependencies**:
   - React Query: https://tanstack.com/query/latest
   - React Router: https://reactrouter.com/
   - Tailwind: https://tailwindcss.com/
   - Testing Library: https://testing-library.com/
   - eldav1d-marvel-ui: https://github.com/ElDav1d/eldav1d-marvel-ui

4. **Ask Clarifying Questions**:
   - What's the expected behavior?
   - Should this follow pattern X or Y?
   - Where should this component live?

---

## Version History

- **2025-11-16**: Initial creation
  - Documented full architecture and patterns
  - Added development workflows
  - Included code conventions and testing practices
  - Listed gotchas and best practices

---

**For updates to this document**, edit `/CLAUDE.md` and commit with a descriptive message. This file should be kept in sync with major architectural changes.
