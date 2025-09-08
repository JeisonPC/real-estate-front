# 🏠 Real Estate Frontend

Una aplicación frontend moderna para gestión de propiedades inmobiliarias construida con **Next.js 15**, **TypeScript**, **React Query** y siguiendo principios de **Clean Architecture** y **SOLID**.

## ✨ Características

- 🎨 **UI Moderna**: Componentes React con CSS Modules y animaciones fluidas
- 🏗️ **Clean Architecture**: Separación clara entre dominio, casos de uso, infraestructura y presentación
- 🔧 **SOLID Principles**: Código mantenible y extensible siguiendo principios SOLID
- 🚀 **Next.js 15**: App Router, Server/Client Components, y optimizaciones modernas
- 📊 **Estado Global**: React Query para manejo de estado del servidor
- 🎯 **TypeScript**: Tipado estático completo
- 📱 **Responsive**: Diseño adaptable para móvil y desktop
- 🔍 **Filtros Avanzados**: Sistema de filtros con animaciones personalizadas
- 🌐 **API Integration**: Integración con API REST externa

## 🚀 Demo

- **Listado de propiedades** con grid responsive
- **Filtros dinámicos** con animación de expansión
- **Imágenes optimizadas** con Next.js Image
- **Loading states** y manejo de errores

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React Query** - Estado del servidor y caching
- **CSS Modules** - Estilos modulares

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
│   └── globals.css              # Estilos globales
│
├── components/                   # Componentes de UI
│   ├── atoms/                   # Componentes básicos
│   │   └── filter/              # Botón de filtro
│   │       ├── Filter.atom.tsx
│   │       └── styles.module.css
│   ├── molecules/               # Componentes compuestos
│   │   ├── card/                # Tarjeta de propiedad
│   │   │   ├── Card.molecules.tsx
│   │   │   └── styles.module.css
│   │   └── filter/              # Modal de filtros (deprecated)
│   └── templates/               # Componentes de página
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
│       │   │   ├── propertyFilters.ts
│       │   │   └── apiPropertyResponse.ts
│       │   ├── interfaces/      # Contratos
│       │   │   └── property.interface.ts
│       │   └── mappers/         # Mappers (deprecated)
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
│   └── QueryProvider.tsx       # Provider de React Query
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

### 2. **Sistema de Filtros Avanzado**

```typescript
// Filtros disponibles
interface PropertyFilters {
  name?: string; // Nombre de la propiedad
  address?: string; // Dirección
  minPrice?: number; // Precio mínimo
  maxPrice?: number; // Precio máximo
  page?: number; // Paginación
  pageSize?: number; // Tamaño de página
}
```

### 3. **Animaciones Personalizadas**

- **Filtro expandible**: Transición suave de botón a formulario
- **Grid responsive**: Adaptación automática según viewport
- **Loading states**: Indicadores de carga

### 4. **Builder Pattern para URLs**

```typescript
// Construcción fluida de URLs
const url = this.urlBuilder.setPath("/properties").build(filters);
```

### 5. **Manejo de Estado con React Query**

```typescript
// Cache automático y re-fetching
return useQuery<PropertyResponse[], Error>({
  queryKey: ["properties", filters],
  queryFn: () => getProperties(repository, filters),
});
```

## 🎨 Componentes UI

### Atomic Design

#### **Atoms** (Componentes básicos)

- `FilterAtom`: Botón de filtro con animación de expansión

#### **Molecules** (Componentes compuestos)

- `Card`: Tarjeta de propiedad con imagen, título, descripción y precio

#### **Templates** (Componentes de página)

- `PropertiesTemplate`: Layout principal con grid de propiedades y filtros

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
```

## 📦 Dependencias Principales

```json
{
  "@tanstack/react-query": "^5.x", // Estado del servidor
  "next": "15.x", // Framework React
  "react": "19.x", // Biblioteca UI
  "typescript": "^5.x" // Tipado estático
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

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

**Jeison Poveda** - [@JeisonPC](https://github.com/JeisonPC)

---

> 💡 **Tip**: Este proyecto demuestra cómo aplicar Clean Architecture y principios SOLID en una aplicación React/Next.js real, creando código mantenible, testeable y escalable.
