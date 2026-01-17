# Vikings Voley Club - Documentación de Arquitectura

## 📋 Descripción General

Landing page profesional para Vikings Voley Club desarrollada con **SvelteKit 5** y **Tailwind CSS v4**. La aplicación incluye un diseño moderno con soporte para modo oscuro/claro, formulario de contacto con EmailJS, y una estructura de componentes escalable.

---

## 🏗️ Estructura del Proyecto

```
src/
├── lib/
│   ├── components/          # Componentes Svelte reutilizables
│   │   ├── Navigation.svelte    # Header con nav, hero y toggle de tema
│   │   ├── Modal.svelte         # Modal reutilizable para imágenes
│   │   └── ContactForm.svelte   # Formulario de contacto con validación
│   │
│   ├── stores/              # Svelte Stores (estado compartido)
│   │   └── themeStore.js    # Store del tema oscuro/claro con localStorage
│   │
│   ├── utils/               # Funciones utilitarias
│   │   └── emailService.js  # Servicio de email con EmailJS
│   │
│   ├── config.js            # Constantes y configuración global
│   └── index.ts             # Exportaciones públicas
│
├── routes/
│   ├── +page.svelte         # Página principal (composición de componentes)
│   └── +layout.svelte       # Layout global
│
├── app.css                  # Estilos globales y Tailwind directives
├── app.d.ts                 # Definiciones de tipos
└── app.html                 # Template HTML

static/
└── images/                  # Imágenes estáticas (logo, galería, etc.)

package.json                 # Dependencias y scripts
tailwind.config.js          # Configuración de Tailwind CSS
postcss.config.js           # Configuración de PostCSS
vite.config.ts              # Configuración de Vite
```

---

## 📦 Componentes Principales

### 1. **Navigation.svelte**
Header con navegación, logo y hero section.

**Props:**
- `scrollToId`: Función para scroll suave a secciones

**Features:**
- Logo con efecto glassmorphism
- Navegación con transiciones suaves
- Hero section con gradiente personalizado
- KPI cards con estadísticas
- Toggle de tema integrado

**Responsividad:** Menú oculto en móviles (<560px)

---

### 2. **Modal.svelte**
Componente modal reutilizable para visualizar imágenes ampliadas.

**Props:**
- `isOpen`: boolean - Controla visibilidad
- `imageSrc`: string - URL de la imagen
- `imageAlt`: string - Texto alternativo
- `onClose`: function - Callback al cerrar

**Features:**
- Animación de zoom al abrir
- Cierre con ESC o clic fuera
- Overlay oscuro con blur

---

### 3. **ContactForm.svelte**
Formulario de contacto con validación y envío por EmailJS.

**Estado:**
- `formData`: Datos del formulario (nombre, email, mensaje)
- `isSubmitting`: Control de envío
- `submitStatus`: Estados 'success' | 'error' | null

**Features:**
- Validación en tiempo real
- Feedback visual (success/error)
- Integración con EmailJS
- Deshabilitación de inputs durante envío

---

## 🎨 Stores

### `themeStore.js`
Store reactivo para gestionar el tema de la aplicación.

**Métodos:**
```javascript
theme.subscribe(isDark => {})  // Suscribirse a cambios
theme.toggle()                  // Alternar tema
theme.set(isDark: boolean)     // Establecer tema específico
```

**Comportamiento:**
- Persiste en localStorage
- Actualiza `document.documentElement.classList` con clase `light-mode`
- Reactivo en toda la aplicación

---

## 🔧 Servicios

### `emailService.js`

#### `sendEmail(formData)`
Envía email usando EmailJS.

**Parámetros:**
```javascript
{
  nombre: string,
  email: string,
  mensaje: string
}
```

**Returns:**
```javascript
{
  success: boolean,
  message: string,
  status: number
}
```

**Configuración requerida en `config.js`:**
```javascript
EMAILJS_CONFIG = {
  PUBLIC_KEY: '...',      // Tu Public Key
  SERVICE_ID: '...',      // Tu Service ID
  TEMPLATE_ID: '...',     // Tu Template ID
  TO_EMAIL: '...'         // Email destino
}
```

#### `validateFormData(formData)`
Valida los datos del formulario.

**Returns:**
```javascript
{
  isValid: boolean,
  errors: { nombre?, email?, mensaje? }
}
```

---

## ⚙️ Configuración

### `config.js`
Centro de todas las constantes de la aplicación.

**Secciones:**
- `EMAILJS_CONFIG`: Credenciales de EmailJS
- `CLUB_INFO`: Información del club (nombre, teléfono, redes)
- `KPI_DATA`: Métricas para hero section
- `FEATURES`: Beneficios del club
- `SCHEDULE`: Horarios y categorías
- `GALLERY_IMAGES`: Imágenes de galería
- `ACTIONS`: Acciones del voleibol
- `TESTIMONIALS`: Testimonios de miembros

**Ventaja:** Cambiar datos es trivial, no requiere tocar componentes.

---

## 🌈 Sistema de Temas

### Variables CSS
```css
:root {
  --bg: #0b1221;              /* Fondo oscuro */
  --text: #e5e7eb;            /* Texto claro */
  --muted: #9aa4b2;           /* Texto secundario */
  --primary: #0A3A7D;         /* Azul principal */
  --primary-2: #FFC62B;       /* Oro secundario */
  --card: rgba(...);          /* Fondo de cards */
  --stroke: rgba(...);        /* Bordes */
}

.light-mode {
  --bg: #f5f5f5;
  --text: #1a1a1a;
  --muted: #666666;
  /* ... etc */
}
```

### Implementación
1. Store reactivo detecta cambios
2. Actualiza clase en `<html>`
3. CSS con `:global(.light-mode)` selector

---

## 📱 Responsive Design

| Breakpoint | Cambios |
|-----------|---------|
| **980px** | Gallery 3 cols, Schedule 2 cols, Features 1 col |
| **560px** | Nav oculto, Section padding 40px, Todos los grids 1 col |

---

## 🚀 Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- npm o yarn

### Setup
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview
npm run preview

# Linting
npm run lint
npm run format
```

El servidor estará disponible en `http://localhost:5173`

---

## 📧 Configurar EmailJS

### Pasos:

1. **Registrarse en [emailjs.com](https://www.emailjs.com/)**
   - Crear cuenta gratuita
   - Ir a Dashboard

2. **Obtener Public Key**
   - Account → API Keys
   - Copiar "Public Key"

3. **Crear Email Service**
   - Services → Add Service
   - Elegir proveedor (Gmail, Outlook, etc.)
   - Conectar cuenta de email
   - Copiar "Service ID"

4. **Crear Email Template**
   - Email Templates → Create New
   - Variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Copiar "Template ID"

5. **Actualizar `src/lib/config.js`**
```javascript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui',
  SERVICE_ID: 'service_xxxxx',
  TEMPLATE_ID: 'template_xxxxx',
  TO_EMAIL: 'tu@email.com'
};
```

6. **Probar en `http://localhost:5173`**
   - Rellenar formulario
   - Enviar
   - Verificar email recibido

---

## 🎯 Flujo de Datos

```
User Form Input
    ↓
ContactForm.svelte (bind:value)
    ↓
sendEmail() - emailService.js
    ↓
Validación (validateFormData)
    ↓
EmailJS API
    ↓
SMTP Server
    ↓
Email recibido ✓
```

---

## 🔍 Buenas Prácticas Implementadas

✅ **Separación de responsabilidades**
- Componentes solo UI
- Servicios manejan lógica
- Config centralizada

✅ **Reusabilidad**
- Modal genérico (props configurables)
- Store reactivo compartido
- Funciones utilitarias puras

✅ **Escalabilidad**
- Fácil agregar nuevas secciones desde config.js
- Loop dinámicos en templates
- Componentes desacoplados

✅ **Accesibilidad**
- ARIA attributes en modal
- Navegación por teclado
- Semantic HTML

✅ **Performance**
- Lazy loading en imágenes
- CSS variables (sin recalc)
- Animaciones optimizadas

✅ **Mantenibilidad**
- Código bien documentado
- Estructura clara
- Fácil de debuggear

---

## 📊 Dependencias Principales

```json
{
  "svelte": "^5.x",
  "sveltekit": "^2.x",
  "vite": "^7.x",
  "@tailwindcss/postcss": "^4.x",
  "@emailjs/browser": "latest",
  "autoprefixer": "latest",
  "postcss": "latest"
}
```

---

## 🐛 Troubleshooting

### El tema no cambia
**Causa:** Store no suscrito correctamente o localStorage bloqueado
**Solución:**
```javascript
import { theme } from '$lib/stores/themeStore';
$: isDark = $theme;  // Suscribir con $
```

### Emails no se envían
**Causa:** Credenciales incorrectas o template sin variables
**Solución:**
1. Verificar config.js
2. Confirmar template tiene `{{from_name}}`, etc.
3. Revisar console para errores

### Estilos no aplican
**Causa:** CSS variables no definidas
**Solución:**
1. Verificar `:root` en app.css
2. No omitir `@tailwind directives`
3. Limpiar caché: `npm run build && npm run preview`

---

## 📈 Próximas Mejoras Sugeridas

- [ ] Sistema de base de datos para historiales de emails
- [ ] Integración con CRM (Hubspot, Pipedrive)
- [ ] Blog/noticias dinámicas
- [ ] Sistema de reservas de clases
- [ ] Dashboard admin
- [ ] Análiticas (Vercel Analytics, Plausible)
- [ ] Optimización SEO avanzada
- [ ] PWA (Progressive Web App)

---

## 📄 Licencia

Proyecto privado de Vikings Voley Club © 2026

---

## 👤 Autor

Refactorización y mejoras realizadas el 16 de enero de 2026.

**Cambios principales:**
- ✅ Refactorización completa en componentes
- ✅ Stores para estado compartido
- ✅ Servicios desacoplados
- ✅ Config centralizada
- ✅ Documentación exhaustiva

---

## 🎓 Recursos Útiles

- [SvelteKit Docs](https://kit.svelte.dev/)
- [Svelte Stores](https://svelte.dev/docs/svelte-store)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)

---

**¡Listo para producción! 🚀**
