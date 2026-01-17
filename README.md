# 🏐 Vikings Voley Club - Landing Page

Bienvenido a la landing page oficial de **Vikings Voley Club**. Un sitio moderno, responsivo y profesional para presentar nuestro club, horarios, servicios y contactar con nuevos miembros.

---

## ✨ Características Principales

### 🎨 Diseño Moderno
- Interfaz glassmorphism elegante
- Tema oscuro/claro automático
- Animaciones suaves y fluidas
- Totalmente responsivo (móvil, tablet, desktop)

### 📱 Secciones
1. **Hero** - Impactante presentación del club
2. **Beneficios** - 3 razones para unirse
3. **Acciones** - Imágenes de movimientos del voleibol
4. **Horarios** - Categorías y horarios con modal
5. **Galería** - Fotos de entrenamientos y competencias
6. **Testimonios** - Opiniones de miembros
7. **Contacto** - Formulario para consultas

### 🚀 Funcionalidades
- ✅ Navegación con scroll suave
- ✅ Modal para ver horarios ampliados
- ✅ Botón WhatsApp flotante
- ✅ Formulario de contacto con validación
- ✅ Envío de emails con EmailJS
- ✅ Toggle tema claro/oscuro
- ✅ Optimización SEO
- ✅ Lazy loading de imágenes

---

## 🌐 Acceso

### En Desarrollo
```bash
npm run dev
# http://localhost:5173
```

### En Producción
```bash
npm run build
npm run preview
```

---

## 📋 Estructura del Proyecto

```
src/
├── lib/
│   ├── components/          # Componentes UI
│   │   ├── Navigation.svelte    # Header + hero
│   │   ├── Modal.svelte         # Modal reutilizable
│   │   └── ContactForm.svelte   # Formulario contacto
│   ├── stores/              # Estado compartido
│   │   └── themeStore.js    # Toggle tema
│   ├── utils/               # Servicios
│   │   └── emailService.js  # Envío de emails
│   └── config.js            # 📌 DATOS DEL SITIO
│
└── routes/
    └── +page.svelte         # Página principal
```

**👉 Cambiar datos: `src/lib/config.js`**

---

## ⚙️ Configurar EmailJS (Contacto)

Para activar el formulario de contacto:

### 1. Registrarse en EmailJS
Ir a [emailjs.com](https://www.emailjs.com/) y crear cuenta gratis.

### 2. Obtener Credenciales
- **Public Key** → Account → API Keys
- **Service ID** → Services → Add Service
- **Template ID** → Email Templates → Create

### 3. Actualizar `src/lib/config.js`
```javascript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'tu_public_key_aqui',
  SERVICE_ID: 'service_xxxxx',
  TEMPLATE_ID: 'template_xxxxx',
  TO_EMAIL: 'mi@email.com'
};
```

### 4. ¡Listo! ✓
El formulario enviará emails automáticamente.

---

## 📊 Datos Fáciles de Editar

Todos en **`src/lib/config.js`** (sin código):

### Información del Club
```javascript
export const CLUB_INFO = {
  name: 'Vikings Voley Club',
  phoneNumber: '573147282218',
  instagram: 'https://instagram.com/vikingos_voley_club',
};
```

### Horarios
```javascript
export const SCHEDULE = [
  {
    category: 'Formativo',
    ages: '8-12 años',
    days: 'Mar y Jue',
    time: '5:00-6:30 pm'
  },
  // ... más
];
```

### Testimonios
```javascript
export const TESTIMONIALS = [
  {
    text: '"Encontré una comunidad increíble..."',
    author: 'Juan Martínez',
    avatar: 'JM',
    role: 'Categoría Competitiva'
  },
  // ... más
];
```

### Galería de Imágenes
```javascript
export const GALLERY_IMAGES = [
  {
    src: '/images/vikings_volley.jpg',
    alt: 'Entrenamientos',
    title: 'Entrenamientos'
  },
  // ... más
];
```

---

## 🎨 Personalización

### Cambiar Colores
En `src/routes/+page.svelte`, busca `:root`:

```css
:root {
  --primary: #0A3A7D;      /* Azul principal */
  --primary-2: #FFC62B;    /* Oro secundario */
  --bg: #0b1221;           /* Fondo oscuro */
  --text: #e5e7eb;         /* Texto claro */
}
```

### Cambiar Número de WhatsApp
En `src/lib/config.js`:
```javascript
phoneNumber: 'TU_NUMERO_AQUI'
```

---

## 🚀 Despliegue

### ✅ Vercel (Recomendado)
1. Conectar repositorio GitHub
2. Configuración automática
3. Deploy con cada push

### ✅ Netlify
1. Conectar repositorio
2. Build: `npm run build`
3. Publish: `.svelte-kit/build`

### ✅ Tu Servidor
```bash
npm run build
# Subir carpeta `.svelte-kit` al servidor
```

---

## 📞 Contacto

- **WhatsApp:** 573147282218
- **Instagram:** @vikingos_voley_club
- **Email:** vikingsvoleyclub@example.com

---

## 🎯 Quick Start

```bash
# 1. Instalar
npm install

# 2. EDITAR DATOS
# Abrir: src/lib/config.js
# Cambiar: nombres, horarios, teléfono, imágenes

# 3. CONFIGURAR EMAIL (opcional)
# Si quieres formulario de contacto funcionando

# 4. Desarrollo local
npm run dev

# 5. Build para producción
npm run build

# 6. Desplegar
# (Vercel, Netlify, tu servidor, etc.)
```

---

## 📚 Documentación Técnica

Para desarrolladores: ver [README_ESTRUCTURA.md](./README_ESTRUCTURA.md)

**Incluye:**
- Arquitectura de componentes
- Guía de stores y servicios
- Troubleshooting técnico
- Mejoras futuras

---

**¡Gracias por usar Vikings Voley Club! 🏐**

Última actualización: 16 de enero de 2026```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
