# 📋 ESTRATEGIA DE TESTING PARA MIGRACIÓN MARVEL API

**Fecha:** 15 Noviembre 2025  
**Contexto:** Migración de Marvel API a datos mockeados  
**Decisión:** Opción B - Tests de servicios + Monkey testing dirigido

---

## 🎯 PROBLEMA IDENTIFICADO

### Estado actual de cobertura de tests:

| Componente | Tests existentes | Modificación | Riesgo |
|------------|------------------|--------------|---------|
| **Servicios** | ❌ **NINGUNO** | ✅ **100%** | 🔴 **MUY ALTO** |
| Hooks | ⚠️ Solo mocks | ⚠️ Indirecto | 🟡 MEDIO |
| Componentes UI | ✅ Sí | ❌ No | 🟢 BAJO |
| Lógica paginación | ❌ No | ✅ Sí | 🔴 ALTO |
| Búsqueda/filtrado | ❌ No | ✅ Sí | 🔴 ALTO |

### ⚠️ **CONCLUSIÓN: La cobertura NO es suficiente**

Sin tests de servicios, estarías modificando al 100% código sin red de seguridad.

---

## 🔍 ANÁLISIS DE OPCIONES

### Opción A: Solo Monkey Testing (2-3 horas)

**Proceso:**
- Testing manual exhaustivo
- Happy paths + edge cases
- 3 browsers mínimo
- Sin red de seguridad futura

**Pros:**
- ✅ No requiere escribir código de tests
- ✅ Valida directamente en browser

**Contras:**
- ❌ 2-3 horas de trabajo manual
- ❌ Confianza ~60%
- ❌ No quedan tests en el repo
- ❌ Próxima modificación: mismo proceso manual
- ❌ Difícil detectar regresiones

**Tiempo:** 2-3 horas

---

### Opción B: Tests de Servicios + Monkey Testing Dirigido ✅ **SELECCIONADA**

**Proceso:**
1. Escribir tests unitarios de servicios (1h)
2. Ejecutar tests automáticos
3. Monkey testing dirigido solo en áreas críticas (1h)

**Pros:**
- ✅ Tests quedan en el repo (valor futuro)
- ✅ Confianza ~80-85%
- ✅ Detecta bugs ANTES del deploy
- ✅ Red de seguridad para próximas modificaciones
- ✅ Profesionalismo visible para recruiters
- ✅ Siguiendo guidelines del proyecto (CLAUDE.md)

**Contras:**
- ⚠️ Requiere 1h adicional escribiendo tests
- ⚠️ Necesita conocimiento de testing patterns

**Tiempo:** 2 horas (1h tests + 1h testing manual dirigido)

---

## 📊 COMPARATIVA DETALLADA

| Criterio | Opción A (Solo Manual) | **Opción B (Tests + Manual)** |
|----------|------------------------|-------------------------------|
| **Tiempo inicial** | 2-3h | 2h |
| **Confianza** | 60% | 80-85% |
| **Detecta bugs** | ⚠️ En runtime | ✅ Pre-deploy |
| **Valor futuro** | ❌ Ninguno | ✅ Tests reutilizables |
| **Para recruiter** | ⚠️ Neutro | ✅ Positivo |
| **Próxima modificación** | 2-3h manual de nuevo | 10min ejecutar tests |
| **Regresiones** | ❌ Difícil detectar | ✅ Automático |
| **Guidelines** | ⚠️ No sigue CLAUDE.md | ✅ Sigue CLAUDE.md |

---

## 🎓 APLICANDO GUIDELINES DEL PROYECTO (CLAUDE.md)

### Filosofía de testing del proyecto:

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

### Por qué los servicios necesitan tests unitarios:

1. **Son Application Layer:** Lógica de negocio pura
2. **Independientes de React:** Se pueden testear sin renderizar
3. **Alta complejidad:** Paginación, filtrado, ordenamiento
4. **100% de cambio:** Todo el código se reescribe
5. **Fast feedback:** Tests ejecutan en <1 segundo

### Blackbox Principle (CLAUDE.md):

**✅ LO QUE TESTEAREMOS (Nuestro código):**
- Lógica de paginación (cursor calculation)
- Lógica de filtrado (búsqueda case-insensitive)
- Lógica de ordenamiento (localeCompare)
- Búsqueda por ID (find + fallback)
- Cálculo de offset (paginación manual)

**❌ LO QUE NO TESTEAREMOS (Blackboxes):**
- React Query hooks (librería externa)
- JSON.parse/JSON.stringify (browser API)
- Array.prototype.sort (JavaScript nativo)
- Estructura de componentes React

---

## 📝 TESTS A ESCRIBIR

### 1. getCharactersService.test.ts

**Cobertura:**
- ✅ Paginación (pageParam → nextCursor)
- ✅ Filtrado (searchString case-insensitive)
- ✅ Ordenamiento (A-Z, Z-A)
- ✅ Edge cases (búsqueda sin resultados, última página)

**Líneas de código:** ~150 líneas
**Tiempo estimado:** 25 minutos

---

### 2. getCharacterDetailsService.test.ts

**Cobertura:**
- ✅ Búsqueda por ID (find en array)
- ✅ Fallback para ID inexistente
- ✅ Fallback para undefined
- ✅ Estructura de respuesta

**Líneas de código:** ~80 líneas
**Tiempo estimado:** 15 minutos

---

### 3. getCharacterComicsService.test.ts

**Cobertura:**
- ✅ Paginación manual (offset calculation)
- ✅ Ordenamiento (TITLE_AZ, TITLE_ZA)
- ✅ Estructura de respuesta (apiData + offset)
- ✅ Edge cases (múltiples páginas)

**Líneas de código:** ~120 líneas
**Tiempo estimado:** 20 minutos

---

## 🚀 PLAN DE EJECUCIÓN

### Fase 1: Escribir tests (1 hora)

```bash
# Crear estructura
mkdir -p src/components/organisms/CharacterList/services/__tests__
mkdir -p src/components/pages/CharacterDetail/services/__tests__
mkdir -p src/components/organisms/CharacterComicList/services/__tests__

# Escribir tests siguiendo plantillas del plan
# (Ver FASE 5 del Plan de Rescate v2.3)
```

**Deliverable:** 3 archivos de test con ~350 líneas totales

---

### Fase 2: Implementar servicios con tests como guía (20 min)

```bash
# Implementar servicios mockeados
# Ejecutar tests en watch mode
npm test -- --watch

# Iterar hasta que todos pasen (verde)
```

**Deliverable:** Servicios funcionando con tests en verde

---

### Fase 3: Testing manual dirigido (1 hora)

Con tests automáticos en verde, solo verificar:

**Happy paths principales (30 min):**
- [ ] Cargar página → 50 personajes visibles
- [ ] Scroll infinito → Más personajes (hasta 100)
- [ ] Buscar "Spider" → Filtrado correcto
- [ ] Click personaje → Detalle correcto
- [ ] Comics: Next → Página 2
- [ ] Comics: Previous → Página 1

**Edge cases críticos (30 min):**
- [ ] Buscar "zzzz" → No results
- [ ] Scroll hasta el final → No más carga
- [ ] URL /character/999999 → Fallback
- [ ] Comics última página → Next disabled

**Browsers:** Solo Chrome (tests cubren lógica)

---

## 📈 MÉTRICAS DE CONFIANZA

### Con Opción B (Tests + Manual):

**Cobertura de servicios:**
- getCharactersService: ~90%
- getCharacterDetailsService: ~95%
- getCharacterComicsService: ~90%

**Confianza total:**
- Tests automáticos: 80%
- Testing manual: +5%
- **Total: 85% de confianza**

**Tiempo vs Confianza:**
```
Opción A:  ████████████░░░░░░░░  60% confianza | 3h
Opción B:  ████████████████░░░░  85% confianza | 2h ✅
```

---

## 🎯 VALOR A LARGO PLAZO

### Próxima modificación del código:

**Sin tests (Opción A):**
```
Cambio pequeño → ¿Rompí algo? → 2h monkey testing
```

**Con tests (Opción B):**
```
Cambio pequeño → npm test → ✅ Verde en 5 segundos
```

### Para el recruiter:

**Sin tests:**
- ⚠️ "Migré la API pero no hay tests"
- ⚠️ Puede preguntar: "¿Cómo garantizas que funciona?"

**Con tests:**
- ✅ "Migré la API con cobertura de tests"
- ✅ Demuestra profesionalismo y buenas prácticas
- ✅ Alineado con guidelines del proyecto

---

## 📋 CHECKLIST DE DECISIÓN

**¿Por qué Opción B es mejor?**

- [x] Menor tiempo total (2h vs 3h)
- [x] Mayor confianza (85% vs 60%)
- [x] Valor futuro (tests reutilizables)
- [x] Sigue guidelines del proyecto (CLAUDE.md)
- [x] Detección temprana de bugs
- [x] Profesionalismo visible
- [x] Red de seguridad permanente

**¿Cuándo elegir Opción A?**

- [ ] Cambio trivial sin lógica
- [ ] Proyecto desechable
- [ ] Sin tiempo para tests
- [ ] No hay guidelines de testing

**Ninguna aplica en este caso → Opción B es clara ganadora**

---

## 🚀 CONCLUSIÓN

**Decisión final:** Opción B - Tests de servicios + Monkey testing dirigido

**Justificación:**
1. **Rentabilidad:** 2h vs 3h con mayor confianza
2. **Calidad:** Bugs detectados pre-deploy
3. **Profesionalismo:** Tests visibles para recruiter
4. **Guidelines:** Sigue convenciones del proyecto
5. **Futuro:** Red de seguridad permanente

**Próximo paso:** Ejecutar FASE 5 del Plan de Rescate v2.3

---

**Documento creado por:**  
- Ricardo (Arquitectura y testing strategy)
- Julián (Frontend expertise y análisis de riesgos)
- David (Decisión final: Opción B)

**Fecha:** 15 Noviembre 2025  
**Versión del plan:** v2.3