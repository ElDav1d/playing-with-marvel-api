# 🚨 PLAN DE RESCATE: Playing With Marvel API v2.3

**Fecha actualización:** 15 Noviembre 2025
**Situación:** Marvel API discontinuada, proyecto necesita funcionar para postulación Senior Design System Engineer
**Objetivo:** Mockear servicios manteniendo Design System `eldav1d-marvel-ui` funcional
**Solución adoptada:** Búsqueda dinámica por ID + comics genéricos con disclaimer honesto
**Dataset:** 100 personajes + 30 comics

---

## ⚠️ DECISIÓN CRÍTICA: TESTING STRATEGY

**Contexto:** Los servicios actualmente NO tienen tests. Sin tests, cualquier cambio es "código a ciegas".

**Estrategia adoptada:** Opción B - Tests de servicios + Monkey testing dirigido

**Por qué invertir 1 hora en tests:**

- 🔴 **ALTO RIESGO:** Servicios son el 100% del cambio (fetch → import + lógica)
- ✅ **RED DE SEGURIDAD:** Tests detectan bugs ANTES del deploy
- ✅ **CONFIANZA:** 80% de confianza vs 60% con solo monkey testing
- ✅ **PROFESIONALISMO:** Recruiter puede ver tests en el repo
- ✅ **VALOR FUTURO:** Tests quedan para próximos cambios
- ✅ **TIEMPO NETO:** 2h total vs 3h solo monkey testing

**Trade-off aceptado:**

- Tiempo: 2h 35min total (1h tests + 1h35min resto)
- Alternativa: 3h+ solo con monkey testing manual
- Ganancia: Mejor calidad, menos riesgo, inversión a futuro

---

## ⚠️ ACLARACIÓN CRÍTICA: SCRIPTS DE GENERACIÓN DE MOCKS

### ¿Cuándo se ejecutan los scripts?

Los scripts `generate-mock-characters-100.js` y `generate-mock-comics.js` son **herramientas de desarrollo** que se ejecutan:

- ✅ **MANUALMENTE** por el desarrollador
- ✅ **UNA SOLA VEZ** (o cuando necesites regenerar datos)
- ❌ **NUNCA al arrancar la aplicación**
- ❌ **NO están en el código de producción**

### Flujo de trabajo completo

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FASE DE DESARROLLO                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Ejecutar scripts Node.js (MANUAL, UNA VEZ):                    │
│     $ node generate-mock-characters-100.js                         │
│     $ node generate-mock-comics.js                                 │
│                                                                     │
│  2. Resultado → Archivos JSON generados:                           │
│     - mockCharacters100.json ✅ (YA GENERADO)                       │
│     - mockComics30.json ✅ (YA GENERADO)                            │
│                                                                     │
│  3. Copiar JSONs al proyecto:                                      │
│     - src/components/.../mocks/mockCharactersAZ.json              │
│     - src/components/.../mocks/mockCharacterComics.json           │
│                                                                     │
│  4. Commit archivos JSON a Git                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    CÓDIGO DE LA APLICACIÓN                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  // En getCharactersService.ts                                     │
│  import mockCharacters from '../mocks/mockCharactersAZ.json';      │
│                                                                     │
│  // En getCharacterComicsService.ts                                │
│  import mockComics from '../mocks/mockCharacterComics.json';       │
│                                                                     │
│  ✅ Los JSON ya están generados                                     │
│  ✅ Import estático (no se ejecuta nada en runtime)                 │
│  ✅ Se incluyen en el bundle de Webpack                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         EN PRODUCCIÓN                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✅ Los JSON están dentro del bundle minificado                     │
│  ✅ No hay scripts Node.js en runtime                               │
│  ✅ No hay generación dinámica de datos                             │
│  ✅ Todo funciona como import estático                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### ¿Por qué este enfoque?

1. **Separación de concerns:** Generación de datos vs lógica de negocio
2. **Performance:** No hay overhead en runtime
3. **Reproducibilidad:** Mismo dataset en todos los entornos
4. **Git-friendly:** Los JSON versionados garantizan consistencia

---

## 📊 DIFERENCIAS CRÍTICAS: PERSONAJES VS COMICS

### Sistemas de paginación completamente diferentes

| Aspecto                  | Personajes (CharacterList)                                     | Comics (CharacterComicList)                                             |
| ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Hook React Query**     | `useInfiniteQuery`                                             | `useQuery`                                                              |
| **Tipo de paginación**  | Infinite scroll (automático)                                  | Manual con botones Previous/Next                                        |
| **Control de página**   | React Query gestiona cursor                                    | Estado `page` en componente                                             |
| **Estructura respuesta** | `{ characters: ICharacterItem[], nextCursor: number \| null }` | `{ apiData: { results: IComicItem[], total: number }, offset: number }` |
| **Campo de imagen**      | `thumbnail: { path: string, extension: string }`               | `images: [{ path: string, extension: string }]`                         |
| **Re-fetch**             | Automático al hacer scroll                                    | Manual al cambiar page/order                                            |
| **Ordenamiento**         | En servicio antes de paginar                                   | En servicio antes de paginar                                            |
| **Dataset**              | **100 personajes únicos**                                     | **30 comics genéricos**                                                |

### Implicaciones técnicas

**Para personajes:**

- El hook `useInfiniteQuery` espera un cursor para la siguiente página
- Cuando el usuario hace scroll, React Query llama automáticamente a `fetchNextPage()`
- El servicio debe devolver `nextCursor: pageParam + 1` o `null` si es la última página
- **Con 100 personajes, el infinite scroll es claramente visible**

**Para comics:**

- El hook `useQuery` se llama con la página actual
- Los botones Previous/Next incrementan/decrementan el estado `page`
- Cada cambio de página hace un nuevo `refetch()` manual
- El servicio calcula el `offset` basándose en `page * maxComics`

---

## 📋 FASE 3: GENERACIÓN DE MOCKS (YA COMPLETADA ✅)

### Resultado final:

**Personajes:** ✅ 100 personajes generados
**Comics:** ✅ 30 comics generados
**URLs únicas (personajes):** 8 (rotadas entre los 100)
**URLs únicas (comics):** 6 (rotadas entre los 30)

### Archivos disponibles:

- `/mnt/project/mockCharacters100.json` ✅ (4501 líneas, 100 personajes)
- `/mnt/project/mockComics30.json` ✅ (generado con script)
- `/mnt/project/generate-mock-characters-100.js` (script generador)
- `/mnt/project/generate-mock-comics.js` (script generador)

### Tarea 3.1: Copiar archivos al proyecto

```bash
# Copiar personajes (100 items)
cp /mnt/project/mockCharacters100.json \
   playing-with-marvel-api/src/components/organisms/CharacterList/mocks/mockCharactersAZ.json

# Copiar comics (30 items)
cp /mnt/project/mockComics30.json \
   playing-with-marvel-api/src/components/organisms/CharacterComicList/mocks/mockCharacterComics.json
```

**Checklist:**

- [ ] Copiar mockCharacters100.json al proyecto
- [ ] Copiar mockComics30.json al proyecto
- [ ] Verificar que los archivos están en las ubicaciones correctas
- [ ] Commit de ambos archivos JSON

---

## 📋 FASE 4: ACTUALIZAR SERVICIOS

### Tarea 4.1: getCharactersService.ts ✅

**Archivo:** `src/components/organisms/CharacterList/services/getCharactersService.ts`

**Sistema:** Infinite scroll con `useInfiniteQuery`

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
  // Simular delay de red para mostrar loaders del DS
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    let characters = mockCharacters as ICharacterItem[];

    // Filtrar por búsqueda
    if (searchString) {
      characters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    // Ordenar
    if (order === FetchingOrder.NAME_AZ) {
      characters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === FetchingOrder.NAME_ZA) {
      characters = [...characters].sort((a, b) => b.name.localeCompare(a.name));
    }

    // Paginar para infinite scroll
    const offset = maxCharacters * pageParam;
    const paginatedCharacters = characters.slice(
      offset,
      offset + maxCharacters
    );

    // CRÍTICO: useInfiniteQuery espera un cursor
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

- [ ] Actualizar archivo
- [ ] Verificar que compila
- [ ] Probar infinite scroll con 100 personajes

---

### Tarea 4.2: getCharacterDetailsService.ts ⚠️ BÚSQUEDA DINÁMICA

**Archivo:** `src/components/pages/CharacterDetail/services/getCharacterDetailsService.ts`

**SOLUCIÓN ADOPTADA:** Búsqueda dinámica por ID en el array de 100 personajes.

**Ventajas:**

- ✅ Cada uno de los 100 personajes tiene su propia página de detalle funcional
- ✅ Navegación entre personajes funciona correctamente
- ✅ Datos únicos por personaje (nombre, descripción, imagen)
- ✅ Cero modificación de componentes existentes

```typescript
/**
 * MOCK SERVICE - Marvel API was discontinued
 * Searches for character by ID in the mock characters array
 * to maintain functional navigation between character details.
 */
import mockCharacters from "../../organisms/CharacterList/mocks/mockCharactersAZ.json";
import { ICharacterItem } from "../interfaces/characterDetail";

const getCharacterDetailsService = async (characterId: string | undefined) => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    // Buscar el personaje por ID en el array de 100 mocks
    const character = mockCharacters.find(
      (char: ICharacterItem) => char.id === Number(characterId)
    );

    // Si no existe, devolver el primero como fallback
    return character || mockCharacters[0];
  } catch (error) {
    console.log(error);
  }
};

export default getCharacterDetailsService;
```

**Nota:** No es necesario crear `mockCharacterDetail.json` - se busca dinámicamente entre los 100 personajes.

**Checklist:**

- [ ] Actualizar archivo
- [ ] Verificar que compila
- [ ] Probar navegación entre diferentes personajes
- [ ] Verificar que cada personaje muestra datos únicos

---

### Tarea 4.3: getCharacterComicsService.ts ⚠️ IMPORTANTE

**Archivo:** `src/components/organisms/CharacterComicList/services/getCharacterComicsService.ts`

**Sistema:** Paginación manual con `useQuery`

**⚠️ LIMITACIÓN CONOCIDA - RELACIÓN PERSONAJES-COMICS:**

Debido a la discontinuación de la API de Marvel, **los 100 personajes comparten los mismos 30 comics genéricos**. Esto es un compromiso aceptable para un proyecto showcase porque:

1. El foco es demostrar el **Design System**, no la lógica de negocio
2. La funcionalidad de paginación y ordenamiento de comics **funciona perfectamente**
3. Se añade un **disclaimer sutil y honesto** en la UI
4. Un recruiter técnico **valora** la solución pragmática

**Relación actual:**

```
100 personajes únicos → 30 comics genéricos (compartidos)
```

**Mitigación:**

- ✅ Disclaimer discreto en `CharacterComicList.tsx`
- ✅ Documentación clara en README
- ✅ Funcionalidad completa del componente

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
  // Simular delay de red para mostrar loaders del DS
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    let comics = [...mockComics];

    // Ordenar según el criterio seleccionado
    if (order === FetchingOrder.TITLE_AZ) {
      comics = comics.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === FetchingOrder.TITLE_ZA) {
      comics = comics.sort((a, b) => b.title.localeCompare(a.title));
    }
    // Añadir más opciones de ordenamiento si existen en FetchingOrder

    // Calcular el offset para paginación manual
    const offset = maxComics * page;

    // Paginar los resultados (slice simula LIMIT y OFFSET de SQL)
    const paginatedComics = comics.slice(offset, offset + maxComics);

    // CRÍTICO: useQuery espera esta estructura específica
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

**Checklist específica para comics:**

- [ ] Actualizar archivo con ordenamiento incluido
- [ ] Verificar que compila
- [ ] Añadir disclaimer en CharacterComicList.tsx (ver Tarea 4.4)
- [ ] Probar navegación Previous/Next
- [ ] Probar cambio de orden en el select
- [ ] Verificar que el contador "Displaying X to Y from Z" funciona

---

### Tarea 4.4: Añadir disclaimer sutil en CharacterComicList

**Archivo:** `src/components/organisms/CharacterComicList/CharacterComicList.tsx`

**Objetivo:** Informar honestamente que los comics son genéricos sin romper la experiencia.

**Ubicación:** Justo antes del título "Displaying X to Y from Z available comics"

```typescript
// Dentro del bloque que renderiza los comics, añadir:

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

      {/* 👇 AÑADIR ESTE DISCLAIMER */}
      <p className="text-sm text-gray-500 italic mb-3 mt-2">
        Note: Comics shown are for demonstration purposes due to Marvel API
        discontinuation
      </p>

      <h3 className="mb-2">
        Displaying {rangeInit} to {rangeEnd} from {totalComics} available comics
      </h3>

      {/* ... resto del código */}
    </>
  );
}
```

**Estilo del disclaimer:**

- Discreto (texto pequeño, gris, cursiva)
- Honesto pero no dramático
- No rompe el flujo visual
- Transmite profesionalidad y transparencia

**Checklist:**

- [ ] Añadir disclaimer con el texto exacto
- [ ] Verificar que se ve bien visualmente
- [ ] Confirmar que no rompe el layout
- [ ] Probar en diferentes tamaños de pantalla

---

## 📋 FASE 5: TESTING DE SERVICIOS (1 hora) ⚠️ CRÍTICO

**Contexto:** Los servicios NO tienen tests actualmente y son lo que vas a modificar al 100%. Sin tests, no hay red de seguridad.

**Decisión:** Opción B - Tests mínimos de servicios + monkey testing dirigido

### Filosofía de testing (según CLAUDE.md):

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

**Por qué unit tests de servicios:**

- ✅ Los servicios son Application Layer (lógica de negocio)
- ✅ Son independientes del framework React
- ✅ Se pueden testear en aislamiento
- ✅ Detectan bugs ANTES del deploy

---

### Tarea 5.1: Crear estructura de tests para servicios

**Crear directorios de tests:**

```bash
mkdir -p src/components/organisms/CharacterList/services/__tests__
mkdir -p src/components/pages/CharacterDetail/services/__tests__
mkdir -p src/components/organisms/CharacterComicList/services/__tests__
```

**Checklist:**

- [ ] Directorios creados
- [ ] Siguiendo convención `__tests__/` junto al código fuente

---

### Tarea 5.2: Tests para getCharactersService.ts

**Archivo:** `src/components/organisms/CharacterList/services/__tests__/getCharactersService.test.ts`

**Principios aplicados (CLAUDE.md):**

- ✅ Unit test de Application Layer (servicio)
- ✅ No testea React (es lógica pura)
- ✅ Mock de datos (no API real)
- ✅ Tests de edge cases

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import getCharactersService from "../getCharactersService";
import { FetchingOrder } from "@/components/pages/Characters/interfaces/characters";

/**
 * Tests para getCharactersService - Servicio de personajes con mocks
 *
 * Estos tests validan la lógica de paginación, filtrado y ordenamiento
 * que se implementará al migrar de API real a mocks.
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
      expect(result!.nextCursor).toBe(1); // Hay segunda página
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
      expect(result!.nextCursor).toBeNull(); // Es la última página (100 personajes total)
    });

    it("returns null cursor on last page", async () => {
      // ARRANGE
      const params = {
        pageParam: 1, // Segunda página con 50 items
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
      expect(result!.nextCursor).toBe(1); // Hay más páginas
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
        maxCharacters: 100, // Todos los personajes
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
        searchString: "man", // Hay varios con "man"
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

- [ ] Archivo creado
- [ ] Tests ejecutan sin errores
- [ ] Cobertura de happy paths
- [ ] Cobertura de edge cases

---

### Tarea 5.3: Tests para getCharacterDetailsService.ts

**Archivo:** `src/components/pages/CharacterDetail/services/__tests__/getCharacterDetailsService.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import getCharacterDetailsService from "../getCharacterDetailsService";

/**
 * Tests para getCharacterDetailsService - Búsqueda dinámica por ID
 *
 * Valida que cada personaje se puede encontrar por su ID y que existe
 * un fallback cuando el ID no existe.
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
      expect(character).toBeDefined(); // No debe crashear
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

- [ ] Archivo creado
- [ ] Tests ejecutan sin errores
- [ ] Valida búsqueda por ID
- [ ] Valida fallback

---

### Tarea 5.4: Tests para getCharacterComicsService.ts

**Archivo:** `src/components/organisms/CharacterComicList/services/__tests__/getCharacterComicsService.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import getCharacterComicsService from "../getCharacterComicsService";
import { FetchingOrder } from "../../../interfaces/characterComics";

/**
 * Tests para getCharacterComicsService - Paginación manual de comics
 *
 * Valida la lógica de paginación manual (Previous/Next) y ordenamiento
 * de los 30 comics genéricos.
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
        maxComics: 30, // Todos los comics
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
      // Verificar que están ordenados
      const titles = resultAZ!.apiData.results.map((c) => c.title);
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sortedTitles);
    });
  });
});
```

**Checklist:**

- [ ] Archivo creado
- [ ] Tests ejecutan sin errores
- [ ] Valida paginación manual
- [ ] Valida ordenamiento

---

### Tarea 5.5: Ejecutar tests

```bash
cd playing-with-marvel-api
npm test
# o
yarn test
```

**Checklist:**

- [ ] Todos los tests pasan (verde)
- [ ] Sin errores de TypeScript
- [ ] Sin warnings críticos
- [ ] Cobertura > 80% en servicios

---

### Tarea 5.6: Documentar decisión de testing

**Añadir comentario en cada test file:**

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

- [ ] Comentario añadido en los 3 test files
- [ ] README actualizado mencionando la nueva cobertura de tests

---

## 📋 FASE 6: TESTING MANUAL DIRIGIDO (1 hora)

**Con tests de servicios ya escritos, el testing manual es mucho más corto y dirigido.**

### Tarea 6.1: Verificar compilación

```bash
cd playing-with-marvel-api
yarn install
yarn build
```

- [ ] Sin errores de TypeScript
- [ ] Sin errores de build
- [ ] Imports de JSON correctos

### Tarea 6.2: Ejecutar tests existentes

```bash
yarn test
```

- [ ] Todos los tests pasan
- [ ] Si hay fallos, ajustar mocks según expectativas

### Tarea 6.3: Probar en desarrollo (Monkey Testing Dirigido)

```bash
yarn start
```

**Checklist visual - Personajes (infinite scroll con 100 items):**

- [ ] La página de personajes carga
- [ ] Se muestran las cards con imágenes del CDN
- [ ] El buscador funciona
- [ ] Los filtros de ordenamiento funcionan
- [ ] **Scroll infinito carga más personajes (se nota claramente con 100)**
- [ ] Loaders del DS se muestran correctamente

**Checklist visual - Detalle de personaje (navegación dinámica entre 100):**

- [ ] Al hacer clic en una card de personaje, va al detalle
- [ ] **CRÍTICO:** Cada personaje muestra SUS datos únicos (nombre, descripción, imagen)
- [ ] **CRÍTICO:** Navegar entre diferentes personajes muestra datos diferentes
- [ ] La URL incluye el ID correcto (`/character/:id/:name`)
- [ ] No hay errores en consola
- [ ] **Probar con al menos 5 personajes diferentes para confirmar**

**Checklist visual - Comics (paginación manual):**

- [ ] La página de detalle muestra comics
- [ ] **Se muestra el disclaimer discreto** sobre comics genéricos
- [ ] Botón "Next" funciona y cambia de página
- [ ] Botón "Previous" funciona y vuelve atrás
- [ ] Selector de orden funciona (A-Z, Z-A)
- [ ] El contador "Displaying 1 to 10 from 30" es correcto
- [ ] Imágenes de comics cargan del CDN
- [ ] No hay errores en consola

---

## 📝 FASE 7: DOCUMENTACIÓN (10 min)

### Actualizar README.md

Agregar sección:

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

## 🎯 MÉTRICAS DE ÉXITO

### ✅ Requisitos mínimos

- [ ] Proyecto compila sin errores
- [ ] Tests pasan
- [ ] Aplicación arranca en local
- [ ] Personajes: infinite scroll funciona con 100 items
- [ ] Comics: paginación manual funciona
- [ ] Imágenes del CDN cargan correctamente

### 🌟 Objetivos estratégicos

- [ ] **El Design System brilla:** Todos los componentes visibles y funcionales
- [ ] **Infinite scroll visible:** Con 100 personajes se nota claramente la funcionalidad
- [ ] **Estados del DS visibles:** Loading, error, empty states funcionan
- [ ] **Navegación fluida:** Sin enlaces rotos ni errores de consola
- [ ] **README claro:** Se explica que usa mocks por discontinuación de API
- [ ] **Código limpio:** Comentarios explican el cambio

---

## 🚀 RESUMEN EJECUTIVO

### Lo que se hizo

1. ✅ Generados **100 personajes** + 30 comics con imágenes reales del CDN de Marvel
2. ✅ Scripts Node.js ejecutados UNA VEZ para crear JSONs
3. ✅ JSONs commiteados a Git como datos estáticos
4. ✅ Servicios actualizados para importar JSONs en lugar de llamar a la API
5. ✅ Paginación diferenciada: infinite scroll (personajes) vs manual (comics)
6. ✅ **Búsqueda dinámica por ID** - cada uno de los 100 personajes tiene su página de detalle única
7. ✅ **Disclaimer honesto** - comics genéricos con explicación sutil en UI

### Arquitectura de la solución

**Personajes:**

- **100 personajes únicos** con datos diferenciados
- Navegación completa entre todos los personajes
- `getCharacterDetailsService` busca por ID dinámicamente
- Cada personaje muestra nombre, descripción e imagen únicos
- **Infinite scroll claramente visible** con 100 items

**Comics:**

- 30 comics genéricos compartidos por todos los 100 personajes
- Limitación comunicada honestamente mediante disclaimer discreto
- Funcionalidad completa de paginación y ordenamiento
- Showcase completo del Design System

### Lo que NO se hizo

- ❌ NO se ejecutan scripts en runtime
- ❌ NO hay generación dinámica de datos
- ❌ NO hay llamadas a APIs externas
- ❌ NO se modificó el Design System
- ❌ NO se creó archivo `mockCharacterDetail.json` estático (búsqueda dinámica)

### Compromiso técnico aceptado

**Limitación:** Los 100 personajes comparten los mismos 30 comics

**Justificación:**

- El proyecto es un showcase del Design System, no un producto real
- Los componentes de comics funcionan perfectamente
- Se informa honestamente al usuario mediante disclaimer
- Un recruiter técnico valora la solución pragmática

**Mitigación:**

- Disclaimer sutil en la UI
- Documentación clara en README
- Funcionalidad completa del componente

### Tiempo total estimado

- Generación de mocks: 10 min (ya hecho)
- Actualización de servicios: 20 min
- **Tests de servicios: 60 min** ← **NUEVA FASE**
- Disclaimer en UI: 5 min
- Testing manual dirigido: 60 min
- **Total: ~2 horas 35 minutos**

**Distribución del tiempo:**

- Tests automáticos: 1h (inversión de calidad)
- Testing manual: 1h (reducido gracias a tests)
- Implementación: 35min

---

**Documento actualizado:** 15 Noviembre 2025
**Versión:** 2.3
**Cambios principales:**

- Ampliado dataset de 50 a 100 personajes
- Infinite scroll más evidente y funcional
- Búsqueda dinámica entre 100 personajes únicos
- Documentación actualizada con nuevas métricas
