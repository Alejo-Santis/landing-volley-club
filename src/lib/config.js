/**
 * Configuración global de la aplicación
 * Aquí se centralizan todas las constantes y credenciales
 */

// EmailJS Configuration
// TODO: Reemplaza estos valores con tus credenciales reales
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'XXXXXXXXXXXXXXXXXXX', // Tu Public Key de EmailJS
  SERVICE_ID: 'service_XXXXXXX', // Tu Service ID
  TEMPLATE_ID: 'template_XXXXXXX', // Tu Template ID
  TO_EMAIL: 'vikingsvoleyclub@example.com' // Email destino
};

// Club Information
export const CLUB_INFO = {
  name: 'Vikings Voley Club',
  phoneNumber: '57312345678',
  instagram: 'https://www.instagram.com/vikingos_voley_club/',
  facebook: 'https://facebook.com/',
  whatsapp: 'https://wa.me/'
};

// Hero KPIs
export const KPI_DATA = [
  { value: '150+', label: 'Miembros activos' },
  { value: '8', label: 'Equipos' },
  { value: '12', label: 'Campeonatos' }
];

// Features/Benefits
export const FEATURES = [
  {
    icon: '🏐',
    title: 'Entrenamiento de calidad',
    description: 'Coaches certificados con planes progresivos para técnica, táctica y condición física.'
  },
  {
    icon: '🤝',
    title: 'Comunidad y equipo',
    description: 'Ambiente inclusivo con eventos, scrimmages y viajes a torneos regionales.'
  },
  {
    icon: '📈',
    title: 'Rutas de progreso',
    description: 'Categorías por nivel y edad, metas claras y seguimiento de tu evolución.'
  }
];

// Schedule Data
export const SCHEDULE = [
  {
    category: 'Formativo',
    ages: '8-12 años',
    days: 'Mar y Jue',
    time: '5:00-6:30 pm'
  },
  {
    category: 'Intermedio',
    ages: '13-17 años',
    days: 'Lun, Mié y Vie',
    time: '6:30-8:00 pm'
  },
  {
    category: 'Competitivo',
    ages: '18+',
    days: 'Mar, Jue y Sáb',
    time: '7:00-9:00 pm'
  },
  {
    category: 'Mixto recreativo',
    ages: 'Todos los niveles',
    days: 'Dom',
    time: '9:00-11:00 am'
  }
];

// Gallery Images
export const GALLERY_IMAGES = [
  {
    src: '/images/vikings_volley.jpg',
    alt: 'Entrenamientos',
    title: 'Entrenamientos'
  },
  {
    src: '/images/bloqueo.jpg',
    alt: 'Bloqueo en acción',
    title: 'Bloqueo'
  },
  {
    src: '/images/recepcion.jpg',
    alt: 'Recepción',
    title: 'Recepción'
  },
  {
    src: '/images/remate.png',
    alt: 'Remate',
    title: 'Remate'
  }
];

// Actions/Moves
export const ACTIONS = [
  {
    image: '/images/bloqueo.jpg',
    label: 'Bloqueo'
  },
  {
    image: '/images/recepcion.jpg',
    label: 'Recepción'
  },
  {
    image: '/images/remate.png',
    label: 'Remate'
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    text: '"Encontré una comunidad increíble aquí. Los coaches son profesionales y el ambiente es motivador. ¡Recomendado 100%!"',
    author: 'Juan Martínez',
    avatar: 'JM',
    role: 'Categoría Competitiva'
  },
  {
    text: '"Mis hijos mejoraron mucho en poco tiempo. Los entrenamientos son divertidos y se nota el profesionalismo del equipo."',
    author: 'María Cardona',
    avatar: 'MC',
    role: 'Madre - Formativo'
  },
  {
    text: '"Empecé sin experiencia y ahora compito en torneos. El apoyo del club y mis compañeros lo hizo posible."',
    author: 'Laura Pérez',
    avatar: 'LP',
    role: 'Categoría Intermedia'
  }
];

// WhatsApp Message
export const WHATSAPP_MESSAGE = 'Hola! Me gustaría más información sobre Vikings Voley Club.';
