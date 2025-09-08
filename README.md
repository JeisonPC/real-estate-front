# 🏠 Real Estate Frontend

Una aplicación frontend moderna para gestión de propiedades inmobiliarias construida con **Next.js 15**, **TypeScript**, **React Query** y siguiendo principios de **Clean Architecture** y **SOLID**.

## ✨ Características

- 🎨 **UI Moderna**: Componentes React con CSS Modules y animaciones fluidas
- 🏗️ **Clean Architecture**: Separación clara entre dominio, casos de uso, infraestructura y presentación
- 🔧 **SOLID Principles**: Código mantenible y extensible siguiendo principios SOLID
- 🚀 **Next.js 15**: App Router, Server/Client Components, y optimizaciones modernas
- 📊 **Estado Global**: React Query + Redux Toolkit para manejo de estado
- 🎯 **TypeScript**: Tipado estático completo
- 📱 **Responsive**: Diseño adaptable para móvil y desktop
- 🔍 **Filtros Avanzados**: Sistema de filtros con debounce y persistencia
- 🌐 **API Integration**: Integración con API REST externa
- 🌙 **Tema Dinámico**: Sistema de temas claro/oscuro
- 🧪 **Testing Completo**: Jest + React Testing Library
- ⚡ **Performance**: Lazy loading, memoización y optimizaciones

## 🌐 Demo en Vivo

🔗 **[Ver Demo](https://real-estate-million.netlify.app/)**

Explora la aplicación en funcionamiento con todas las funcionalidades implementadas:

- 🔍 **Búsqueda en tiempo real** con debounce de 500ms
- 🎛️ **Filtros avanzados** por nombre, dirección y rango de precios
- 🌙 **Cambio de tema** dinámico (claro/oscuro)
- 💾 **Persistencia** de filtros en localStorage
- � **Diseño responsive** para todos los dispositivos
- ⚡ **Optimizaciones** de performance y UX

## 🚀 Funcionalidades

- **Listado de propiedades** con grid responsive
- **Filtros dinámicos** con debounce y expansión animada
- **Tema adaptable** que respeta preferencias del sistema
- **Persistencia de estado** con localStorage
- **Imágenes optimizadas** con Next.js Image
- **Loading states** y manejo de errores
- **Tests automatizados** para garantizar calidad

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React Query** - Estado del servidor y caching
- **Redux Toolkit** - Estado global y gestión de temas
- **CSS Modules** - Estilos modulares con variables CSS
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes

### Arquitectura

- **Clean Architecture** - Separación de responsabilidades
- **SOLID Principles** - Código mantenible
- **Repository Pattern** - Abstracción de datos
- **Use Case Pattern** - Lógica de negocio
- **Builder Pattern** - Construcción de URLs
- **Strategy Pattern** - Query builders

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal con providers
│   ├── page.tsx                 # Página principal
│   └── globals.css              # Estilos globales con variables CSS
│
├── components/                   # Componentes de UI
│   ├── atoms/                   # Componentes básicos
│   │   ├── filter/              # Botón de filtro (deprecated)
│   │   ├── input/               # Input reutilizable
│   │   │   ├── Input.atom.tsx
│   │   │   └── styles.module.css
│   │   └── themeSwitch/         # Switch de tema
│   │       ├── ThemeSwitch.atom.tsx
│   │       └── styles.module.css
│   ├── molecules/               # Componentes compuestos
│   │   ├── card/                # Tarjeta de propiedad
│   │   │   ├── Card.molecules.tsx
│   │   │   └── styles.module.css
│   │   ├── filter/              # Sistema de filtros avanzado
│   │   │   ├── PropertyFilter.molecules.tsx
│   │   │   ├── PropertyFilter.molecules.test.tsx
│   │   │   ├── usePropertyFilter.ts
│   │   │   ├── usePropertyFilter.test.ts
│   │   │   └── styles.module.css
│   │   └── skeletonCard/        # Loading state
│   │       ├── SkeletonCard.molecules.tsx
│   │       └── styles.module.css
│   ├── organisms/               # Componentes complejos
│   │   └── skeletonCardGroup/   # Grupo de skeleton cards
│   │       ├── SkeletonCardGroup.organism.tsx
│   │       └── styles.module.css
│   └── templates/               # Componentes de página
│       ├── header/              # Header con tema
│       │   ├── Header.template.tsx
│       │   └── styles.module.css
│       └── properties/          # Template de propiedades
│           ├── Properties.template.tsx
│           └── styles.module.css
│
├── features/                     # Módulos de funcionalidad
│   └── properties/              # Módulo de propiedades
│       ├── domain/              # Capa de dominio
│       │   ├── entities/        # Entidades del negocio
│       │   │   ├── property.ts
│       │   │   ├── propertyRequest.ts
│       │   │   ├── propertyResponse.ts
│       │   │   └── propertyFilters.ts
│       │   └── interfaces/      # Contratos
│       │       └── property.interface.ts
│       ├── usecases/            # Casos de uso
│       │   └── getProperties.usecase.ts
│       ├── repositories/        # Implementaciones de repositorio
│       │   └── apiProperty.repository.ts
│       └── hooks/               # React Hooks
│           └── useGetProperties.ts
│
├── hooks/                        # Hooks globales
│   └── useFetch.ts              # Hook para peticiones HTTP
│
├── providers/                    # Providers de contexto
│   ├── QueryProvider.tsx       # Provider de React Query
│   ├── ReduxProvider.tsx       # Provider de Redux
│   └── ThemeApplier.tsx        # Aplicador de tema automático
│
├── store/                        # Redux store
│   ├── index.ts                 # Configuración del store
│   └── theme.slice.ts           # Slice de tema
│
└── utils/                        # Utilidades
    ├── fetcher.ts               # Función de fetch
    ├── queryBuilder.ts          # Constructor de queries
    └── urlBuilder.ts            # Constructor de URLs
```

## 🏗️ Arquitectura

### Clean Architecture

La aplicación sigue los principios de Clean Architecture con las siguientes capas:

#### 1. **Domain Layer** (Dominio)

- **Entities**: Modelos de negocio (`Property`, `PropertyResponse`, `PropertyFilters`)
- **Interfaces**: Contratos (`PropertyRepository`)
- Sin dependencias externas

#### 2. **Use Cases Layer** (Casos de Uso)

- **getProperties**: Lógica de negocio para obtener propiedades
- Orquesta las interacciones entre repositorios y entidades

#### 3. **Infrastructure Layer** (Infraestructura)

- **Repository**: Implementación de acceso a datos (`ApiPropertyRepository`)
- **HTTP Client**: Utilidades para peticiones (`fetcher`, `URLBuilder`)

#### 4. **Presentation Layer** (Presentación)

- **Components**: UI Components (Atoms, Molecules, Templates)
- **Hooks**: Estado de la aplicación (`useGetProperties`)

### SOLID Principles

#### **S - Single Responsibility**

- `URLQueryBuilder`: Solo construye query strings
- `URLBuilder`: Solo construye URLs
- `ApiPropertyRepository`: Solo maneja datos de propiedades
- `FilterAtom`: Solo maneja UI del filtro

#### **O - Open/Closed**

- Nuevos `QueryBuilder` sin modificar código existente
- Nuevos repositorios implementando `PropertyRepository`

#### **L - Liskov Substitution**

- Cualquier `QueryBuilder` puede reemplazar a `URLQueryBuilder`

#### **I - Interface Segregation**

- Interfaces específicas y pequeñas
- `QueryBuilder` con un solo método `build()`

#### **D - Dependency Inversion**

- `URLBuilder` depende de abstracción `QueryBuilder`
- `ApiPropertyRepository` usa inyección de dependencias

## 🔧 Funcionalidades Implementadas

### 1. **Listado de Propiedades**

```typescript
// Hook personalizado con React Query
const { data, error, isLoading } = useGetProperties(filters);

// Repository con Clean Architecture
export class ApiPropertyRepository implements PropertyRepository {
  async getAll(filters?: PropertyFilters): Promise<PropertyResponse[]>;
}
```

### 2. **Sistema de Filtros Avanzado con Debounce**

```typescript
// Hook personalizado para filtros
const usePropertyFilter = (onFiltersChange) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  // Debounce de 500ms para optimizar búsquedas
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange?.(updatedFilters);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [nameInput, addressInput]);
};

// Filtros disponibles
interface PropertyFilters {
  name?: string; // Nombre con debounce
  address?: string; // Dirección con debounce
  minPrice?: number; // Precio mínimo
  maxPrice?: number; // Precio máximo
  page?: number; // Paginación
  pageSize?: number; // Tamaño de página
}
```

### 3. **Sistema de Temas Dinámico**

```typescript
// Redux slice para temas
const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "auto" as ThemeMode },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Aplicación automática de tema
const ThemeApplier = () => {
  const { mode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const isDark =
      mode === "dark" ||
      (mode === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.className = isDark ? "dark" : "light";
  }, [mode]);
};
```

### 4. **Persistencia de Estado con localStorage**

```typescript
// Persistencia automática de filtros
useEffect(() => {
  const savedFilters = localStorage.getItem("propertyFilters");
  if (savedFilters) {
    const parsed = JSON.parse(savedFilters);
    setFilters(parsed);
  }
}, []);

useEffect(() => {
  localStorage.setItem("propertyFilters", JSON.stringify(filters));
}, [filters]);
```

### 5. **Componentes Optimizados con React.memo**

```typescript
// Prevención de re-renders innecesarios
const Card = React.memo(({ property }: CardProps) => {
  return (
    <div className={styles.card}>
      <Image src={property.imageUrl} alt={property.name} />
      {/* ... */}
    </div>
  );
});

// useCallback para funciones estables
const handleFiltersChange = useCallback((newFilters: PropertyFilters) => {
  setFilters(newFilters);
}, []);
```

### 6. **Animaciones Avanzadas con CSS**

```css
/* Variables CSS para temas */
:root.light {
  --fg: #1f2937;
  --bg: #ffffff;
  --gray-alpha-100: #e5e7eb;
  --gray-alpha-200: #d1d5db;
}

:root.dark {
  --fg: #f9fafb;
  --bg: #111827;
  --gray-alpha-100: #374151;
  --gray-alpha-200: #4b5563;
}

/* Animación fluida del filtro */
.filterForm {
  max-height: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expanded .filterForm {
  max-height: 420px;
  opacity: 1;
  transform: translateY(0);
  padding: 16px 16px 0 16px;
}

/* Responsive con mobile-first */
@media (min-width: 640px) {
  .formGrid {
    grid-template-columns: 1fr 1fr;
  }
}
```

### 7. **Builder Pattern para URLs**

```typescript
// Construcción fluida de URLs
const url = this.urlBuilder.setPath("/properties").build(filters);
```

### 8. **Manejo de Estado Híbrido**

```typescript
// React Query para servidor + Redux para cliente
return useQuery<PropertyResponse[], Error>({
  queryKey: ["properties", filters],
  queryFn: () => getProperties(repository, filters),
  staleTime: 5 * 60 * 1000, // 5 minutos
  refetchOnWindowFocus: false,
});
```

## 🎨 Componentes UI

### Atomic Design

#### **Atoms** (Componentes básicos)

- `InputAtom`: Input reutilizable con label y estilos consistentes
- `ThemeSwitch`: Switch para cambiar entre temas claro/oscuro

#### **Molecules** (Componentes compuestos)

- `Card`: Tarjeta de propiedad con imagen, título, descripción y precio
- `PropertyFilter`: Sistema completo de filtros con debounce y animaciones
- `SkeletonCard`: Estado de carga para tarjetas individuales

#### **Organisms** (Componentes complejos)

- `SkeletonCardGroup`: Grupo de skeleton cards para el estado de carga inicial

#### **Templates** (Componentes de página)

- `Header`: Encabezado con switch de tema
- `PropertiesTemplate`: Layout principal con grid de propiedades y filtros

### Hooks Personalizados

```typescript
// Hook para filtros con toda la lógica encapsulada
export function usePropertyFilter(onFiltersChange) {
  // Estado local
  const [isExpanded, setIsExpanded] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  // Handlers optimizados
  const handleInputChange = useCallback((field, value) => {
    // Lógica de cambio con debounce
  }, []);

  const handleClear = useCallback(() => {
    // Limpiar todos los filtros
  }, []);

  return {
    isExpanded,
    toggleExpanded,
    filters,
    setFilters,
    nameInput,
    addressInput,
    handleInputChange,
    handleClear,
  };
}
```

### Animaciones CSS

```css
/* Animación de expansión del filtro */
.container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filterForm {
  max-height: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.expanded .filterForm {
  max-height: 400px;
  opacity: 1;
  transform: translateY(0);
}
```

## 🧪 Testing

### Configuración de Jest

El proyecto utiliza Jest con React Testing Library para testing:

```javascript
// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Cobertura de Tests

- **Componentes**: 35 tests

  - **PropertyFilter** (12 tests): Expansión/colapso, debounce, filtros de precio, limpieza, persistencia
  - **Card** (15 tests): Renderizado, formateo de precio, contenido, casos edge, accesibilidad, CSS
  - **PropertiesTemplate** (8 tests): Estados de carga, error, éxito, estructura, integración

- **Custom Hooks**: 8 tests
  - Inicialización de estado
  - Cambios de estado
  - Funcionalidad de debounce
  - Casos edge

### Ejemplos de Tests

```typescript
// Test de debounce
it("should debounce onFiltersChange calls", async () => {
  const onFiltersChange = jest.fn();
  render(<PropertyFilter onFiltersChange={onFiltersChange} />);

  const nameInput = screen.getByPlaceholderText("Buscar por nombre...");
  fireEvent.change(nameInput, { target: { value: "test" } });

  await waitFor(
    () => {
      expect(onFiltersChange).toHaveBeenCalledWith({
        name: "test",
        address: "",
        minPrice: null,
        maxPrice: null,
      });
    },
    { timeout: 600 }
  );
});

// Test de hook personalizado
it("should update filters with debounce", async () => {
  const onFiltersChange = jest.fn();
  const { result } = renderHook(() => usePropertyFilter({ onFiltersChange }));

  act(() => {
    result.current.handleInputChange("name", "test");
  });

  await waitFor(
    () => {
      expect(onFiltersChange).toHaveBeenCalledWith({
        name: "test",
        address: "",
        minPrice: null,
        maxPrice: null,
      });
    },
    { timeout: 600 }
  );
});
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

## 🔌 Integración con API

### Endpoints

- `GET /properties` - Obtener propiedades
- Query parameters: `name`, `address`, `minPrice`, `maxPrice`, `page`, `pageSize`

### Ejemplo de respuesta

```json
{
  "items": [
    {
      "id": "68bce4be74aac4e04a41033d",
      "idOwner": "000000000000000000000001",
      "name": "Ocean View Apartment",
      "address": "123 Beach Ave",
      "price": 350000,
      "imageUrl": "https://res.cloudinary.com/..."
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 1
}
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/JeisonPC/real-estate-front.git
cd real-estate-front

# Instalar dependencias
npm install

# Configurar variables de entorno
echo "NEXT_PUBLIC_API_URL=https://tu-api.com" > .env.local

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno

```env
NEXT_PUBLIC_API_URL=https://realestateapi-e666.onrender.com
```

### Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run test         # Testing
npm run test:watch   # Testing en modo watch
npm run test:coverage # Testing con cobertura
```

## 📦 Dependencias Principales

```json
{
  "@tanstack/react-query": "^5.x", // Estado del servidor
  "@reduxjs/toolkit": "^2.x", // Estado global (temas)
  "next": "15.x", // Framework React
  "react": "19.x", // Biblioteca UI
  "react-redux": "^9.x", // Integración Redux
  "typescript": "^5.x" // Tipado estático
}
```

### Dependencias de Desarrollo

```json
{
  "@testing-library/jest-dom": "^6.x", // Matchers para Jest
  "@testing-library/react": "^16.x", // Testing utilities
  "@testing-library/react-hooks": "^8.x", // Hook testing
  "jest": "^29.x", // Framework de testing
  "jest-environment-jsdom": "^29.x" // Environment para Jest
}
```

## 🎯 Patrones de Diseño Implementados

### 1. **Repository Pattern**

```typescript
interface PropertyRepository {
  getAll(filters?: PropertyFilters): Promise<PropertyResponse[]>;
}
```

### 2. **Builder Pattern**

```typescript
class URLBuilder {
  setPath(path: string): this;
  build(queryParams?: object): string;
}
```

### 3. **Strategy Pattern**

```typescript
interface QueryBuilder {
  build(params: Record<string, any>): string;
}
```

### 4. **Dependency Injection**

```typescript
constructor(
  baseUrl: string,
  private readonly queryBuilder: QueryBuilder
) {}
```

## 🔮 Funcionalidades Futuras

- [ ] **Paginación avanzada** con lazy loading
- [ ] **Filtros geográficos** con mapas
- [ ] **Favoritos** con localStorage
- [ ] **Comparador** de propiedades
- [ ] **PWA** support
- [ ] **Tests unitarios** con Jest
- [ ] **Tests E2E** con Playwright
- [ ] **Storybook** para documentación de componentes

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 🏗️ Arquitectura Evolucionada

### Decisiones de Diseño

1. **Custom Hooks Pattern**: Extracción de lógica compleja del componente a hooks reutilizables
2. **CSS Variables**: Sistema de temas escalable usando variables CSS nativas
3. **Local Storage Integration**: Persistencia de filtros para mejor UX
4. **Debounce Strategy**: Optimización de llamadas a API con timeout de 500ms
5. **Component Memoization**: React.memo para prevenir re-renders innecesarios

### Beneficios Arquitectónicos

- ✅ **Separación de responsabilidades**: UI vs Lógica de negocio
- ✅ **Testabilidad**: Hooks y componentes testeable independientemente
- ✅ **Reutilización**: Hooks custom pueden ser usados en otros componentes
- ✅ **Performance**: Debounce y memoización optimizan renders
- ✅ **Accesibilidad**: Soporte completo para temas y preferencias del usuario

### Testing Strategy

```typescript
// Component Testing - Behavior Focused
describe("PropertyFilter Component", () => {
  it("should filter properties with debounce", () => {});
  it("should persist filters in localStorage", () => {});
  it("should adapt to theme changes", () => {});
});

// Hook Testing - Logic Focused
describe("usePropertyFilter Hook", () => {
  it("should manage filter state correctly", () => {});
  it("should debounce input changes", () => {});
  it("should handle edge cases", () => {});
});
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Jeison Poveda** - [@JeisonPC](https://github.com/JeisonPC)

---

> 💡 **Tip**: Este proyecto demuestra cómo aplicar Clean Architecture y principios SOLID en una aplicación React/Next.js real, creando código mantenible, testeable y escalable.
