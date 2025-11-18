# 📋 TESTING STRATEGY FOR MARVEL API MIGRATION

**Date:** November 15, 2025
**Context:** Migration from Marvel API to mocked data
**Decision:** Option B - Service tests + Directed monkey testing

---

## 🎯 IDENTIFIED PROBLEM

### Current test coverage status:

| Component | Existing Tests | Modification | Risk |
|------------|----------------|--------------|---------|
| **Services** | ❌ **NONE** | ✅ **100%** | 🔴 **VERY HIGH** |
| Hooks | ⚠️ Only mocks | ⚠️ Indirect | 🟡 MEDIUM |
| UI Components | ✅ Yes | ❌ No | 🟢 LOW |
| Pagination logic | ❌ No | ✅ Yes | 🔴 HIGH |
| Search/filtering | ❌ No | ✅ Yes | 🔴 HIGH |

### ⚠️ **CONCLUSION: Coverage is NOT sufficient**

Without service tests, you would be modifying 100% of the code without a safety net.

---

## 🔍 OPTIONS ANALYSIS

### Option A: Monkey Testing Only (2-3 hours)

**Process:**
- Exhaustive manual testing
- Happy paths + edge cases
- Minimum 3 browsers
- No future safety net

**Pros:**
- ✅ No need to write test code
- ✅ Validates directly in browser

**Cons:**
- ❌ 2-3 hours of manual work
- ❌ Confidence ~60%
- ❌ No tests remain in repo
- ❌ Next modification: same manual process
- ❌ Difficult to detect regressions

**Time:** 2-3 hours

---

### Option B: Service Tests + Directed Monkey Testing ✅ **SELECTED**

**Process:**
1. Write service unit tests (1h)
2. Run automated tests
3. Directed monkey testing only in critical areas (1h)

**Pros:**
- ✅ Tests remain in repo (future value)
- ✅ Confidence ~80-85%
- ✅ Detects bugs BEFORE deploy
- ✅ Safety net for future modifications
- ✅ Visible professionalism for recruiters
- ✅ Following project guidelines (CLAUDE.md)

**Cons:**
- ⚠️ Requires 1h additional writing tests
- ⚠️ Needs knowledge of testing patterns

**Time:** 2 hours (1h tests + 1h directed manual testing)

---

## 📊 DETAILED COMPARISON

| Criteria | Option A (Manual Only) | **Option B (Tests + Manual)** |
|----------|------------------------|-------------------------------|
| **Initial time** | 2-3h | 2h |
| **Confidence** | 60% | 80-85% |
| **Bug detection** | ⚠️ At runtime | ✅ Pre-deploy |
| **Future value** | ❌ None | ✅ Reusable tests |
| **For recruiter** | ⚠️ Neutral | ✅ Positive |
| **Next modification** | 2-3h manual again | 10min run tests |
| **Regressions** | ❌ Hard to detect | ✅ Automatic |
| **Guidelines** | ⚠️ Doesn't follow CLAUDE.md | ✅ Follows CLAUDE.md |

---

## 🎓 APPLYING PROJECT GUIDELINES (CLAUDE.md)

### Project testing philosophy:

```
┌──────────────────────────────────────────────────────────────┐
│  LAYER 2: Unit Tests (Foundation of TDD)                    │
│  ────────────────────────────────────────────────────────────│
│  - Application Layer (services, use cases)                  │
│  - Test in isolation with mocks                             │
│  - Fast execution                                            │
│  - Focus: "Which specific logic broke?"                     │
└──────────────────────────────────────────────────────────────┘
```

### Why services need unit tests:

1. **They are Application Layer:** Pure business logic
2. **Independent of React:** Can be tested without rendering
3. **High complexity:** Pagination, filtering, sorting
4. **100% change:** All code is rewritten
5. **Fast feedback:** Tests run in <1 second

### Blackbox Principle (CLAUDE.md):

**✅ WHAT WE WILL TEST (Our code):**
- Pagination logic (cursor calculation)
- Filtering logic (case-insensitive search)
- Sorting logic (localeCompare)
- ID search (find + fallback)
- Offset calculation (manual pagination)

**❌ WHAT WE WON'T TEST (Blackboxes):**
- React Query hooks (external library)
- JSON.parse/JSON.stringify (browser API)
- Array.prototype.sort (native JavaScript)
- React component structure

---

## 📝 TESTS TO WRITE

### 1. getCharactersService.test.ts

**Coverage:**
- ✅ Pagination (pageParam → nextCursor)
- ✅ Filtering (searchString case-insensitive)
- ✅ Sorting (A-Z, Z-A)
- ✅ Edge cases (search with no results, last page)

**Lines of code:** ~150 lines
**Estimated time:** 25 minutes

---

### 2. getCharacterDetailsService.test.ts

**Coverage:**
- ✅ ID search (find in array)
- ✅ Fallback for non-existent ID
- ✅ Fallback for undefined
- ✅ Response structure

**Lines of code:** ~80 lines
**Estimated time:** 15 minutes

---

### 3. getCharacterComicsService.test.ts

**Coverage:**
- ✅ Manual pagination (offset calculation)
- ✅ Sorting (TITLE_AZ, TITLE_ZA)
- ✅ Response structure (apiData + offset)
- ✅ Edge cases (multiple pages)

**Lines of code:** ~120 lines
**Estimated time:** 20 minutes

---

## 🚀 EXECUTION PLAN

### Phase 1: Write tests (1 hour)

```bash
# Create structure
mkdir -p src/components/organisms/CharacterList/services/__tests__
mkdir -p src/components/pages/CharacterDetail/services/__tests__
mkdir -p src/components/organisms/CharacterComicList/services/__tests__

# Write tests following plan templates
# (See PHASE 5 of Rescue Plan v2.3)
```

**Deliverable:** 3 test files with ~350 total lines

---

### Phase 2: Implement services with tests as guide (20 min)

```bash
# Implement mocked services
# Run tests in watch mode
npm test -- --watch

# Iterate until all pass (green)
```

**Deliverable:** Working services with tests passing

---

### Phase 3: Directed manual testing (1 hour)

With automated tests passing, only verify:

**Main happy paths (30 min):**
- [ ] Load page → 50 characters visible
- [ ] Infinite scroll → More characters (up to 100)
- [ ] Search "Spider" → Correct filtering
- [ ] Click character → Correct detail
- [ ] Comics: Next → Page 2
- [ ] Comics: Previous → Page 1

**Critical edge cases (30 min):**
- [ ] Search "zzzz" → No results
- [ ] Scroll to end → No more loading
- [ ] URL /character/999999 → Fallback
- [ ] Comics last page → Next disabled

**Browsers:** Chrome only (tests cover logic)

---

## 📈 CONFIDENCE METRICS

### With Option B (Tests + Manual):

**Service coverage:**
- getCharactersService: ~90%
- getCharacterDetailsService: ~95%
- getCharacterComicsService: ~90%

**Total confidence:**
- Automated tests: 80%
- Manual testing: +5%
- **Total: 85% confidence**

**Time vs Confidence:**
```
Option A:  ████████████░░░░░░░░  60% confidence | 3h
Option B:  ████████████████░░░░  85% confidence | 2h ✅
```

---

## 🎯 LONG-TERM VALUE

### Next code modification:

**Without tests (Option A):**
```
Small change → Did I break something? → 2h monkey testing
```

**With tests (Option B):**
```
Small change → npm test → ✅ Green in 5 seconds
```

### For the recruiter:

**Without tests:**
- ⚠️ "I migrated the API but there are no tests"
- ⚠️ May ask: "How do you guarantee it works?"

**With tests:**
- ✅ "I migrated the API with test coverage"
- ✅ Demonstrates professionalism and best practices
- ✅ Aligned with project guidelines

---

## 📋 DECISION CHECKLIST

**Why is Option B better?**

- [x] Less total time (2h vs 3h)
- [x] Higher confidence (85% vs 60%)
- [x] Future value (reusable tests)
- [x] Follows project guidelines (CLAUDE.md)
- [x] Early bug detection
- [x] Visible professionalism
- [x] Permanent safety net

**When to choose Option A?**

- [ ] Trivial change without logic
- [ ] Disposable project
- [ ] No time for tests
- [ ] No testing guidelines

**None apply in this case → Option B is clear winner**

---

## 🚀 CONCLUSION

**Final decision:** Option B - Service tests + Directed monkey testing

**Justification:**
1. **Cost-effectiveness:** 2h vs 3h with higher confidence
2. **Quality:** Bugs detected pre-deploy
3. **Professionalism:** Tests visible to recruiter
4. **Guidelines:** Follows project conventions
5. **Future:** Permanent safety net

**Next step:** Execute PHASE 5 of Rescue Plan v2.3

---

**Document created by:**
- Ricardo (Architecture and testing strategy)
- Julián (Frontend expertise and risk analysis)
- David (Final decision: Option B)

**Date:** November 15, 2025
**Plan version:** v2.3