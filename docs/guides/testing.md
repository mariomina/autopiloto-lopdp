# 🧪 Guía de Testing - Autopiloto LOPDP

**Versión:** 1.0  
**Framework:** Vitest + Testing Library  
**Fecha:** 2026-02-09

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración](#configuración)
3. [Estructura de Tests](#estructura-de-tests)
4. [Escribir Tests](#escribir-tests)
5. [Ejecutar Tests](#ejecutar-tests)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Ejemplos](#ejemplos)

---

## 🎯 Introducción

Este proyecto utiliza **Vitest** como framework de testing y **Testing Library** para tests de componentes React. Esta guía te ayudará a escribir y ejecutar tests efectivos.

### Stack de Testing

- **Vitest** - Framework de testing rápido y moderno
- **@testing-library/react** - Testing de componentes React
- **@testing-library/user-event** - Simulación de interacciones de usuario
- **@testing-library/jest-dom** - Matchers adicionales para DOM
- **jsdom** - Entorno DOM para Node.js

---

## ⚙️ Configuración

### Archivos de Configuración

#### `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

#### `src/__tests__/setup.ts`
Archivo de configuración global que se ejecuta antes de todos los tests:
- Importa matchers de jest-dom
- Configura cleanup automático
- Mockea APIs del navegador (matchMedia, IntersectionObserver, etc.)

---

## 📁 Estructura de Tests

```
src/
├── __tests__/
│   ├── setup.ts                 # Configuración global
│   ├── unit/                    # Tests unitarios
│   │   ├── NavItem.test.tsx
│   │   ├── Layout.test.tsx
│   │   └── ...
│   └── integration/             # Tests de integración
│       ├── api/
│       │   ├── dashboard.test.ts
│       │   └── audit.test.ts
│       └── ...
└── components/
    └── layout/
        ├── NavItem.tsx
        ├── NavItem.test.tsx     # Opcional: test junto al componente
        └── Layout.tsx
```

### Convenciones de Nombres

- **Tests unitarios:** `ComponentName.test.tsx`
- **Tests de integración:** `feature.test.ts`
- **Tests E2E:** `flow.e2e.test.ts`

---

## ✍️ Escribir Tests

### Anatomía de un Test

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  // Setup común
  const defaultProps = {
    title: 'Test Title',
    onClick: vi.fn()
  }

  it('should render the component', () => {
    render(<MyComponent {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    render(<MyComponent {...defaultProps} />)
    
    await user.click(screen.getByRole('button'))
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
```

### Queries Recomendadas (en orden de prioridad)

1. **getByRole** - Mejor para accesibilidad
   ```typescript
   screen.getByRole('button', { name: /submit/i })
   ```

2. **getByLabelText** - Para formularios
   ```typescript
   screen.getByLabelText(/email/i)
   ```

3. **getByPlaceholderText** - Para inputs
   ```typescript
   screen.getByPlaceholderText(/enter email/i)
   ```

4. **getByText** - Para contenido de texto
   ```typescript
   screen.getByText(/hello world/i)
   ```

5. **getByTestId** - Último recurso
   ```typescript
   screen.getByTestId('custom-element')
   ```

### Matchers Comunes

```typescript
// Existencia
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Visibilidad
expect(element).toBeVisible()
expect(element).not.toBeVisible()

// Contenido
expect(element).toHaveTextContent('Hello')
expect(element).toContainHTML('<span>Hello</span>')

// Atributos
expect(element).toHaveAttribute('aria-label', 'Close')
expect(element).toHaveClass('active')

// Formularios
expect(input).toHaveValue('test@example.com')
expect(checkbox).toBeChecked()
expect(button).toBeDisabled()
```

---

## 🚀 Ejecutar Tests

### Comandos Disponibles

```bash
# Ejecutar tests en modo watch
npm test

# Ejecutar tests una vez
npm run test:run

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests específicos
npm test NavItem

# Ejecutar tests en modo debug
npm test -- --inspect-brk
```

### Modo Watch

El modo watch re-ejecuta automáticamente los tests cuando cambias archivos:

```bash
npm test
```

Comandos en modo watch:
- `a` - Ejecutar todos los tests
- `f` - Ejecutar solo tests fallidos
- `p` - Filtrar por nombre de archivo
- `t` - Filtrar por nombre de test
- `q` - Salir

---

## 🎓 Mejores Prácticas

### 1. Tests Descriptivos

```typescript
// ❌ Malo
it('works', () => {
  // ...
})

// ✅ Bueno
it('should display error message when email is invalid', () => {
  // ...
})
```

### 2. Arrange-Act-Assert (AAA)

```typescript
it('should increment counter when button is clicked', async () => {
  // Arrange
  const user = userEvent.setup()
  render(<Counter initialValue={0} />)
  
  // Act
  await user.click(screen.getByRole('button', { name: /increment/i }))
  
  // Assert
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

### 3. Evitar Detalles de Implementación

```typescript
// ❌ Malo - Depende de la estructura interna
const button = container.querySelector('.btn-primary')

// ✅ Bueno - Usa queries accesibles
const button = screen.getByRole('button', { name: /submit/i })
```

### 4. Mockear Dependencias Externas

```typescript
// Mock de módulos
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test' })
}))

// Mock de funciones
const mockOnClick = vi.fn()
```

### 5. Limpiar Mocks

```typescript
describe('MyComponent', () => {
  const mockFn = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks() // Limpia el historial de llamadas
  })
  
  it('test 1', () => {
    // mockFn está limpio
  })
})
```

### 6. Tests Independientes

```typescript
// ❌ Malo - Tests dependen uno del otro
let counter = 0

it('increments counter', () => {
  counter++
  expect(counter).toBe(1)
})

it('increments counter again', () => {
  counter++
  expect(counter).toBe(2) // Falla si el primer test no corre
})

// ✅ Bueno - Tests independientes
it('increments counter', () => {
  let counter = 0
  counter++
  expect(counter).toBe(1)
})

it('increments counter again', () => {
  let counter = 0
  counter++
  expect(counter).toBe(1)
})
```

---

## 📚 Ejemplos

### Test de Componente Simple

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>)
    
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
  
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Test con Interacciones de Usuario

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/components/LoginForm'

describe('LoginForm', () => {
  it('should submit form with email and password', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})
```

### Test con Estado Asíncrono

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { UserProfile } from '@/components/UserProfile'

describe('UserProfile', () => {
  it('should load and display user data', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' }
    
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockUser
    })
    
    render(<UserProfile userId="123" />)
    
    // Esperar a que aparezca el nombre
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
})
```

### Test de Componente con Props Dinámicas

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/components/StatusBadge'

describe('StatusBadge', () => {
  it.each([
    ['success', 'bg-green-500'],
    ['error', 'bg-red-500'],
    ['warning', 'bg-yellow-500'],
  ])('should apply %s styles for %s status', (status, expectedClass) => {
    const { container } = render(<StatusBadge status={status} />)
    
    expect(container.firstChild).toHaveClass(expectedClass)
  })
})
```

---

## 🐛 Debugging

### Ver el DOM Renderizado

```typescript
import { render, screen } from '@testing-library/react'

it('debug test', () => {
  const { debug } = render(<MyComponent />)
  
  // Imprime todo el DOM
  debug()
  
  // Imprime un elemento específico
  debug(screen.getByRole('button'))
})
```

### Usar screen.logTestingPlaygroundURL()

```typescript
it('debug test', () => {
  render(<MyComponent />)
  
  // Genera URL para Testing Playground
  screen.logTestingPlaygroundURL()
})
```

---

## 📊 Coverage

### Generar Reporte de Coverage

```bash
npm run test:coverage
```

Esto genera:
- Reporte en consola
- Reporte HTML en `coverage/index.html`
- Reporte JSON en `coverage/coverage-final.json`

### Umbrales de Coverage

Configurados en `vitest.config.ts`:
```typescript
coverage: {
  thresholds: {
    lines: 60,
    functions: 60,
    branches: 60,
    statements: 60
  }
}
```

---

## 🔗 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/react)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ Checklist de Testing

Antes de hacer commit:
- [ ] Todos los tests pasan (`npm test -- --run`)
- [ ] Coverage > 60% (`npm run test:coverage`)
- [ ] No hay tests skipped (`it.skip`)
- [ ] Tests son descriptivos y claros
- [ ] Mocks están limpios en `beforeEach`
- [ ] No hay console.logs en tests

---

**Última Actualización:** 2026-02-09  
**Autor:** @dev (AIOS Framework)  
**Versión:** 1.0
