# 🔄 Refactorización del Proyecto - Arquitectura Modular

## Resumen de Cambios

Se realizó una **refactorización completa** para seguir **buenas prácticas de programación** y mejorar la **escalabilidad y mantenibilidad** del proyecto.

### Antes: Todo en un Archivo ❌
- `src/routes/+page.svelte` → **1184 líneas**
- Difícil de mantener
- Difícil de reutilizar código
- Configuración hardcodeada

### Después: Arquitectura Modular ✅
- **Componentes separados** por responsabilidad
- **Stores centralizados** para estado global
- **Servicios** con lógica de negocio
- **Configuración centralizada**

---

## 📁 Nueva Estructura

### `src/lib/config.js` - **Centro de Datos**
```
✓ Información del club
✓ Credenciales EmailJS
✓ Horarios
✓ Testimonios
✓ Galería
✓ Acciones
✓ Características
```
**Uso:** Edita aquí para cambiar contenido sin tocar código

### `src/lib/stores/themeStore.js` - **Estado del Tema**
```javascript
export const theme = createThemeStore();
// ✓ Subscribe a cambios
// ✓ Toggle automático
// ✓ Persist en localStorage
```
**Uso:** `import { theme } from '$lib/stores/themeStore'`

### `src/lib/utils/emailService.js` - **Servicio de Email**
```javascript
export async function sendEmail(formData)
export function validateFormData(formData)
```
**Uso:** Lógica centralizada para envío de emails

### `src/lib/components/Navigation.svelte` - **Header + Hero**
```
✓ Navegación con scroll suave
✓ Toggle de tema
✓ Logo
✓ Hero section completa
```
**Props:** `scrollToId` (función para navegar)

### `src/lib/components/Modal.svelte` - **Modal Reutilizable**
```
✓ Props: isOpen, imageSrc, imageAlt, onClose
✓ Cerrar con ESC
✓ Animaciones suaves
```
**Uso:** Abrir/cerrar imágenes ampliadas

### `src/lib/components/ContactForm.svelte` - **Formulario**
```
✓ Validación de datos
✓ Envío con EmailJS
✓ Estados: loading, success, error
✓ Mensajes de feedback
```
**Uso:** Insertarlo en cualquier página

### `src/routes/+page.svelte` - **Página Principal (Limpia)**
```
Ahora solo:
✓ Importa componentes
✓ Importa datos
✓ Renderiza secciones
```
**Tamaño:** De 1184 → ~150 líneas útiles

---

## 🎯 Ventajas de Esta Arquitectura

| Aspecto | Antes | Después |
|--------|-------|---------|
| **Mantenibilidad** | Difícil | Fácil |
| **Reutilización** | Imposible | Flexible |
| **Testing** | Complejo | Unitario |
| **Escalabilidad** | Limitada | Excelente |
| **Colaboración** | Conflictos | Limpio |

---

## 🚀 Cómo Agregar Nuevas Secciones

### 1️⃣ Agregar Datos en `config.js`
```javascript
export const NEW_SECTION = [
  { /* datos */ }
];
```

### 2️⃣ Crear Componente (si es necesario)
```svelte
<script>
  export let data = [];
</script>

{#each data as item}
  <!-- render -->
{/each}
```

### 3️⃣ Usar en `+page.svelte`
```svelte
<script>
  import NewComponent from '$lib/components/NewComponent.svelte';
  import { NEW_SECTION } from '$lib/config';
</script>

<NewComponent data={NEW_SECTION} />
```

---

## 🔧 Cambiar Configuración Global

Todos los datos están en **`src/lib/config.js`**:

```javascript
// Cambiar nombre del club
export const CLUB_INFO = {
  name: 'Mi Club Nuevo'
};

// Agregar más testimonios
export const TESTIMONIALS = [
  { /* nuevo */ }
];

// Cambiar credenciales EmailJS
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'nueva_key'
};
```

---

## 🌙 Store de Tema (Explicado)

El tema ahora usa **Svelte Stores** para reactividad:

```javascript
// En cualquier componente
import { theme } from '$lib/stores/themeStore';

// Suscribirse al valor
$theme // true = oscuro, false = claro

// Cambiar tema
theme.toggle() // Alterna oscuro ↔ claro
theme.setTheme(false) // Fuerza modo claro
```

**Cómo funciona:**
1. ✓ Lee localStorage al cargar
2. ✓ Aplica clase `.light-mode` al `<html>`
3. ✓ Guarda preferencia en localStorage
4. ✓ Todos los componentes ven el cambio

---

## 📧 EmailJS Centralizado

Toda la lógica está en `src/lib/utils/emailService.js`:

```javascript
// Enviar email
try {
  const result = await sendEmail(formData);
  // ✓ Éxito
} catch (error) {
  // ✗ Error
}

// Validar
const { isValid, errors } = validateFormData(formData);
```

**Cambiar comportamiento:**
- Editar `src/lib/utils/emailService.js`
- Todos los formularios usarán el nuevo código

---

## 🔍 Debugging

### Tema no cambia
```javascript
// Verificar en Console
localStorage.getItem('theme')
document.documentElement.classList.contains('light-mode')
```

### Emails no se envían
```javascript
// En emailService.js, verifica:
// 1. EMAILJS_CONFIG está completado
// 2. Variables en EmailJS template coinciden
// 3. Network en DevTools no tiene errores
```

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Líneas antes | 1184 |
| Líneas después | ~150 |
| Componentes | 3 |
| Stores | 1 |
| Servicios | 1 |
| Archivos config | 1 |

---

## ✨ Próximas Mejoras (Sugeridas)

- [ ] Agregar página de galería completa
- [ ] Crear componente de pricing
- [ ] Agregar sección de coaches
- [ ] Integrar Google Analytics
- [ ] Agregar búsqueda/filtros
- [ ] PWA (Progressive Web App)

---

**Refactorización completada:** 16 de enero de 2026  
**Versión:** 2.0  
**Mantenibilidad:** ⭐⭐⭐⭐⭐
