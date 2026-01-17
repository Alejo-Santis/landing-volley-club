<script>
  import { onMount } from 'svelte';
  import emailjs from '@emailjs/browser';

  /** @param {string} id */
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  let showHorarioModal = false;
  let horarioImageSrc = '/images/horarios.jpeg';
  let isDarkMode = true;
  
  // Estado del formulario
  let formData = {
    nombre: '',
    email: '',
    mensaje: ''
  };
  let isSubmitting = false;
  let submitStatus = null; // null, 'success', 'error'
  let submitMessage = '';

  const openHorarioModal = () => {
    showHorarioModal = true;
  };

  const closeHorarioModal = () => {
    showHorarioModal = false;
  };

  const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light-mode', !isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '573147282218';
    const message = 'Hola! Me gustaría más información sobre Vikings Voley Club.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Enviar email con EmailJS
  const sendEmail = async (e) => {
    e.preventDefault();
    isSubmitting = true;
    submitStatus = null;

    try {
      // TODO: Reemplaza estos valores con tus credenciales de EmailJS
      // 1. Regístrate en https://www.emailjs.com/
      // 2. Copia tu Public Key (USER_ID)
      // 3. Crea un servicio de email y obtén el Service ID
      // 4. Crea una plantilla y obtén el Template ID
      
      const SERVICE_ID = 'service_XXXXXXX'; // Reemplazar
      const TEMPLATE_ID = 'template_XXXXXXX'; // Reemplazar
      const USER_ID = 'XXXXXXXXXXXXXXXXXXX'; // Reemplazar

      // Inicializar EmailJS
      emailjs.init(USER_ID);

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.nombre,
          from_email: formData.email,
          message: formData.mensaje,
          to_email: 'vikingsvoleyclub@example.com' // Reemplazar con tu email
        }
      );

      if (response.status === 200) {
        submitStatus = 'success';
        submitMessage = '¡Mensaje enviado exitosamente! Nos contactaremos pronto.';
        formData = { nombre: '', email: '', mensaje: '' };
        setTimeout(() => {
          submitStatus = null;
        }, 5000);
      }
    } catch (error) {
      console.error('Error enviando email:', error);
      submitStatus = 'error';
      submitMessage = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
      setTimeout(() => {
        submitStatus = null;
      }, 5000);
    } finally {
      isSubmitting = false;
    }
  };

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      isDarkMode = false;
      document.documentElement.classList.add('light-mode');
    }
  });
</script>

<header class="site-header">
  <nav class="nav">
    <a class="brand" href="/" aria-label="Inicio">
      <img src="/images/logo.png" alt="Logo del club" width="36" height="36"  style="border-radius: 50;"/>
      <span>Vikings Voley Club</span>
    </a>
    <div class="spacer"></div>
    <ul class="menu">
      <li><button on:click={() => scrollToId('beneficios')}>Beneficios</button></li>
      <li><button on:click={() => scrollToId('horarios')}>Horarios</button></li>
      <li><button on:click={() => scrollToId('acciones')}>Acciones</button></li>
      <li><button on:click={() => scrollToId('galeria')}>Galería</button></li>
      <li><button class="cta small" on:click={() => scrollToId('contacto')}>Únete</button></li>
      <li><button class="theme-toggle" on:click={toggleTheme} title="Cambiar tema">
        {#if isDarkMode}
          ☀️
        {:else}
          🌙
        {/if}
      </button></li>
    </ul>
  </nav>
  <div class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>
        Vive el voleibol con intensidad
        <span class="gradient">entrena, compite y crece</span>
      </h1>
      <p class="hero-subtitle">
        Club de voleibol para todas las edades y niveles. Entrenamientos profesionales,
        comunidad vibrante y competencias todo el año.
      </p>
      <div class="actions">
        <a class="cta primary" href="#contacto">Quiero probar una clase</a>
        <a class="cta secondary" href="#horarios">Ver horarios</a>
      </div>
      <div class="kpis">
        <div class="kpi-card">
          <strong>150+</strong>
          <span>Miembros activos</span>
        </div>
        <div class="kpi-card">
          <strong>8</strong>
          <span>Equipos</span>
        </div>
        <div class="kpi-card">
          <strong>12</strong>
          <span>Campeonatos</span>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  
</header>

<main>
  <section id="beneficios" class="section">
    <h2 class="section-title">¿Por qué unirte?</h2>
    <div class="grid features">
      <article class="card">
        <div class="icon">🏐</div>
        <h3>Entrenamiento de calidad</h3>
        <p>Coaches certificados con planes progresivos para técnica, táctica y condición física.</p>
      </article>
      <article class="card">
        <div class="icon">🤝</div>
        <h3>Comunidad y equipo</h3>
        <p>Ambiente inclusivo con eventos, scrimmages y viajes a torneos regionales.</p>
      </article>
      <article class="card">
        <div class="icon">📈</div>
        <h3>Rutas de progreso</h3>
        <p>Categorías por nivel y edad, metas claras y seguimiento de tu evolución.</p>
      </article>
    </div>
  </section>

  <section id="acciones" class="section">
    <h2 class="section-title">Acciones del juego</h2>
    <div class="grid acciones">
      <figure class="accion-card"><img class="g-img" src="/images/bloqueo.jpg" alt="Bloqueo" loading="lazy" /><figcaption>Bloqueo</figcaption></figure>
      <figure class="accion-card"><img class="g-img" src="/images/recepcion.jpg" alt="Recepción" loading="lazy" /><figcaption>Recepción</figcaption></figure>
      <figure class="accion-card"><img class="g-img" src="/images/remate.png" alt="Remate" loading="lazy" /><figcaption>Remate</figcaption></figure>
    </div>
  </section>

  <section id="horarios" class="section alt">
    <h2 class="section-title">Horarios y categorías</h2>
    <div class="grid schedule">
      <article class="slot">
        <h3>Formativo</h3>
        <p>8-12 años · Mar y Jue · 5:00-6:30 pm</p>
      </article>
      <article class="slot">
        <h3>Intermedio</h3>
        <p>13-17 años · Lun, Mié y Vie · 6:30-8:00 pm</p>
      </article>
      <article class="slot">
        <h3>Competitivo</h3>
        <p>18+ · Mar, Jue y Sáb · 7:00-9:00 pm</p>
      </article>
      <article class="slot">
        <h3>Mixto recreativo</h3>
        <p>Todos los niveles · Dom · 9:00-11:00 am</p>
      </article>
    </div>
    <div class="horarios-wrap">
      <button class="horarios-button" on:click={openHorarioModal}>
        <img class="horarios-img" src="/images/horarios.jpeg" alt="Cuadro de horarios del club" loading="lazy" />
        <span class="horarios-overlay-text">Ver más</span>
      </button>
      <p class="note">Los horarios pueden variar por torneo. Contáctanos para confirmar tu categoría ideal.</p>
    </div>
  </section>

  <section id="galeria" class="section">
    <h2 class="section-title">Momentos del club</h2>
    <p class="section-subtitle">Revive los entrenamientos, competencias y celebraciones de Vikings Voley Club</p>
    <div class="grid gallery">
      <figure class="gallery-item">
        <div class="gallery-image-wrapper">
          <img class="g-img" src="/images/vikings_volley.jpg" alt="Entrenamientos" loading="lazy" />
          <div class="gallery-overlay">Entrenamientos</div>
        </div>
      </figure>
      <figure class="gallery-item">
        <div class="gallery-image-wrapper">
          <img class="g-img" src="/images/bloqueo.jpg" alt="Bloqueo en acción" loading="lazy" />
          <div class="gallery-overlay">Bloqueo</div>
        </div>
      </figure>
      <figure class="gallery-item">
        <div class="gallery-image-wrapper">
          <img class="g-img" src="/images/recepcion.jpg" alt="Recepción" loading="lazy" />
          <div class="gallery-overlay">Recepción</div>
        </div>
      </figure>
      <figure class="gallery-item">
        <div class="gallery-image-wrapper">
          <img class="g-img" src="/images/remate.png" alt="Remate" loading="lazy" />
          <div class="gallery-overlay">Remate</div>
        </div>
      </figure>
    </div>
    <div class="insta-cta">
      <a class="cta primary" href="https://www.instagram.com/vikingos_voley_club/" target="_blank" rel="noopener noreferrer">Síguenos en Instagram para más contenido</a>
    </div>
  </section>

  <section id="testimonios" class="section alt">
    <h2 class="section-title">Lo que dicen nuestros miembros</h2>
    <p class="section-subtitle">Historias de crecimiento, amistad y logros en Vikings Voley</p>
    <div class="grid testimonios">
      <article class="testimonio-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="testimonio-text">"Encontré una comunidad increíble aquí. Los coaches son profesionales y el ambiente es motivador. ¡Recomendado 100%!"</p>
        <div class="testimonio-autor">
          <div class="avatar">JM</div>
          <div>
            <strong>Juan Martínez</strong>
            <small>Categoría Competitiva</small>
          </div>
        </div>
      </article>
      <article class="testimonio-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="testimonio-text">"Mis hijos mejoraron mucho en poco tiempo. Los entrenamientos son divertidos y se nota el profesionalismo del equipo."</p>
        <div class="testimonio-autor">
          <div class="avatar">MC</div>
          <div>
            <strong>María Cardona</strong>
            <small>Madre - Formativo</small>
          </div>
        </div>
      </article>
      <article class="testimonio-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="testimonio-text">"Empecé sin experiencia y ahora compito en torneos. El apoyo del club y mis compañeros lo hizo posible."</p>
        <div class="testimonio-autor">
          <div class="avatar">LP</div>
          <div>
            <strong>Laura Pérez</strong>
            <small>Categoría Intermedia</small>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section id="contacto" class="section alt">
    <h2 class="section-title">Contáctanos</h2>
    <form class="contact" on:submit={sendEmail}>
      <div class="row">
        <label>
          <span>Nombre</span>
          <input 
            required 
            placeholder="Tu nombre"
            bind:value={formData.nombre}
            disabled={isSubmitting}
          />
        </label>
        <label>
          <span>Email</span>
          <input 
            type="email" 
            required 
            placeholder="tu@email.com"
            bind:value={formData.email}
            disabled={isSubmitting}
          />
        </label>
      </div>
      <label>
        <span>Mensaje</span>
        <textarea 
          rows="4" 
          placeholder="Cuéntanos tu objetivo y nivel"
          bind:value={formData.mensaje}
          disabled={isSubmitting}
        ></textarea>
      </label>
      <button class="cta primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
      
      {#if submitStatus === 'success'}
        <p class="submit-success">✓ {submitMessage}</p>
      {:else if submitStatus === 'error'}
        <p class="submit-error">✗ {submitMessage}</p>
      {/if}
      
      <p class="note">⚙️ Para activar esta funcionalidad, necesitas configurar EmailJS con tus credenciales (ver instrucciones en el código).</p>
    </form>
  </section>
</main>

{#if showHorarioModal}
  <div class="modal-overlay" on:click={closeHorarioModal} role="dialog" aria-modal="true" tabindex="-1">
    <div class="modal-content" on:click|stopPropagation on:keydown={(e) => e.key === 'Escape' && closeHorarioModal()} role="document">
      <button class="modal-close" on:click={closeHorarioModal} aria-label="Cerrar modal">✕</button>
      <img src={horarioImageSrc} alt="Horarios ampliado" class="modal-image" />
    </div>
  </div>
{/if}

<button class="whatsapp-button" on:click={openWhatsApp} title="Contáctanos por WhatsApp">
  <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
    <path d="M20.52 3.48C18.25 1.23 15.32 0 12.04 0 5.5 0 .12 5.38.12 11.92c0 2.1.55 4.16 1.58 5.99L.05 24l6.35-2.07c1.75.95 3.73 1.45 5.73 1.45 6.54 0 11.92-5.38 11.92-11.92 0-3.19-1.24-6.19-3.48-8.47zm-8.48 18.32c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.82 1.25 1.27-3.8-.24-.39c-1.03-1.63-1.58-3.52-1.58-5.47 0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9 1.87 1.87 2.9 4.35 2.9 6.99 0 5.45-4.43 9.88-9.88 9.88zm5.4-7.42c-.3-.15-1.75-.87-2.03-.97-.28-.1-.48-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.025-.52-.075-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.075-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.70.63.71.23 1.36.2 1.87.12.57-.085 1.76-.72 2.01-1.41.25-.7.25-1.29.175-1.42-.075-.125-.275-.2-.575-.35z"/>
  </svg>
</button>

<footer class="footer">
  <div class="foot-inner">
    <div class="left">
      <img src="/images/logo.png" alt="Logo del club" width="28" height="28" />
      <span>Vikings Voley Club</span>
    </div>
    <div class="right">
      <a href="https://www.instagram.com/vikingos_voley_club/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
      <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
    </div>
  </div>
  <small>© {new Date().getFullYear()} Vikings Voley Club. Todos los derechos reservados.</small>
  
</footer>

<style>
  :global(*) { box-sizing: border-box }
  :global(:root) {
    --bg: #0b1221;
    --text: #e5e7eb;
    --muted: #9aa4b2;
    --primary: #0A3A7D;
    --primary-2: #FFC62B;
    --card: rgba(255,255,255,0.06);
    --stroke: rgba(255,255,255,0.1);
  }

  .site-header { position: relative; overflow: clip }
  .nav {
    max-width: 1100px;
    margin: 0 auto;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 10;
  }
  .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700 }
  .brand img { filter: drop-shadow(0 0 12px rgba(0,209,255,0.35)) }
  .spacer { flex: 1 }
  .menu { list-style: none; display: flex; gap: 8px; margin: 0; padding: 0 }
  .menu button, .menu .cta.small {
    background: transparent;
    border: 1px solid transparent;
    color: var(--text);
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: 200ms ease;
  }
  .menu button:hover { background: rgba(255,198,43,0.15); border-color: var(--primary-2); }
  .menu .cta.small { border-color: var(--stroke) }

  .menu .theme-toggle {
    font-size: 18px;
    padding: 8px 12px;
    transition: all 200ms ease;
  }

  .menu .theme-toggle:hover {
    transform: rotate(-20deg) scale(1.1);
  }
  .menu button, .menu .cta.small {
    background: transparent;
    border: 1px solid transparent;
    color: var(--text);
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: 200ms ease;
  }
  .menu button:hover { background: rgba(255,198,43,0.15); border-color: var(--primary-2); }

  .hero {
    position: relative;
    max-width: 100%;
    min-height: 600px;
    padding: 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, 
      rgba(10,58,125,0.95) 0%, 
      rgba(10,58,125,0.8) 25%,
      rgba(255,198,43,0.1) 75%,
      rgba(15,70,140,0.9) 100%);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255,198,43,0.1), transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(10,58,125,0.2), transparent 50%);
    pointer-events: none;
  }

  .hero-content {
    max-width: 1100px;
    width: 100%;
    position: relative;
    z-index: 2;
    animation: slideInUp 0.8s ease-out;
  }

  .hero-content h1 {
    font-size: clamp(32px, 6vw, 62px);
    line-height: 1.1;
    margin: 0 0 20px;
    font-weight: 800;
    letter-spacing: -1px;
  }

  .hero-subtitle {
    font-size: 18px;
    color: rgba(229,231,235,0.9);
    margin: 0 0 28px;
    max-width: 600px;
    line-height: 1.6;
  }

  .gradient {
    display: block;
    background: linear-gradient(90deg, var(--primary-2), #ff9500);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 900;
  }

  .actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin: 12px 0 28px;
  }

  .cta {
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 700;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
  }

  .cta.primary {
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    color: #0b1221;
    box-shadow: 0 12px 32px rgba(255,198,43,0.35);
  }

  .cta.primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .cta.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(255,198,43,0.45);
  }

  .cta.primary:hover::before { opacity: 1; }

  .cta.secondary {
    background: rgba(255,255,255,0.1);
    color: var(--text);
    border: 1.5px solid rgba(255,198,43,0.4);
    backdrop-filter: blur(10px);
  }

  .cta.secondary:hover {
    background: rgba(255,198,43,0.15);
    border-color: var(--primary-2);
    transform: translateY(-2px);
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 16px;
    margin-top: 24px;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .kpi-card {
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,198,43,0.2);
    border-radius: 16px;
    padding: 18px;
    text-align: center;
    transition: all 300ms ease;
  }

  .kpi-card:hover {
    background: rgba(255,198,43,0.1);
    border-color: var(--primary-2);
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(255,198,43,0.15);
  }

  .kpi-card strong {
    display: block;
    font-size: 32px;
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 6px;
  }

  .kpi-card span {
    color: var(--muted);
    font-size: 13px;
  }

  .divider { height: 1px; width: 100%; background: linear-gradient(90deg, transparent, var(--stroke), transparent); margin-top: 18px }

  .section { max-width: 1100px; margin: 0 auto; padding: 60px 20px }
  .section.alt { background: linear-gradient(180deg, rgba(255,198,43,0.02), rgba(10,58,125,0.02)) }
  .section-title { font-size: clamp(28px, 3vw, 42px); margin: 0 0 12px; font-weight: 800 }
  .section-subtitle { color: var(--muted); font-size: 16px; margin: 0 0 32px; max-width: 600px; line-height: 1.6 }

  .grid { display: grid; gap: 20px }
  
  .features { grid-template-columns: repeat(3, minmax(0,1fr)) }
  .card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,198,43,0.15);
    padding: 24px;
    border-radius: 18px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,198,43,0.1), transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .card:hover {
    background: rgba(255,198,43,0.08);
    border-color: var(--primary-2);
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(255,198,43,0.1);
  }

  .card:hover::before { opacity: 1; }

  .card h3 { margin: 12px 0 8px; font-size: 18px; position: relative; z-index: 1 }
  .card p { color: var(--muted); font-size: 14px; line-height: 1.6; position: relative; z-index: 1 }
  .card .icon { font-size: 22px; margin-bottom: 12px; position: relative; z-index: 1 }

  .schedule { grid-template-columns: repeat(4, minmax(0,1fr)) }
  .slot {
    background: linear-gradient(135deg, rgba(10,58,125,0.15), rgba(255,198,43,0.08));
    border: 1px solid rgba(255,198,43,0.2);
    padding: 20px;
    border-radius: 16px;
    transition: all 300ms ease;
  }

  .slot:hover {
    background: linear-gradient(135deg, rgba(10,58,125,0.25), rgba(255,198,43,0.15));
    border-color: var(--primary-2);
    transform: translateY(-4px);
  }

  .slot h3 { margin: 0 0 8px; color: var(--primary-2); font-size: 16px; font-weight: 700 }
  .slot p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.5 }
  .note { color: var(--muted); font-size: 13px; margin-top: 14px }

  .horarios-wrap {
    margin-top: 28px;
    text-align: center;
  }

  .horarios-button {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    padding: 0;
    display: inline-block;
  }

  .horarios-img {
    max-width: 100%;
    max-height: 400px;
    width: auto;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(255,198,43,0.2);
    border: 1px solid rgba(255,198,43,0.2);
    transition: all 300ms ease;
    display: block;
  }

  .horarios-button:hover .horarios-img {
    transform: scale(1.02);
    box-shadow: 0 16px 40px rgba(255,198,43,0.3);
  }

  .horarios-overlay-text {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, var(--primary-2), #ff9500);
    color: #0b1221;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .horarios-button:hover .horarios-overlay-text {
    opacity: 1;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 200ms ease;
  }

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 16px;
    overflow: hidden;
    animation: zoomIn 300ms cubic-bezier(0.4, 0, 0.2, 1);
    background: white;
    border: none;
    padding: 0;
    cursor: default;
  }

  .modal-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
    backdrop-filter: blur(10px);
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  /* WhatsApp Button */
  .whatsapp-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #25d366, #20ba5a);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
  }

  .whatsapp-button:hover {
    transform: scale(1.1) rotate(-10deg);
    box-shadow: 0 10px 28px rgba(37, 211, 102, 0.5);
  }

  .whatsapp-button:active {
    transform: scale(0.95);
  }

  /* Mensajes de estado del formulario */
  .submit-success {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.1);
    border: 1px solid rgba(74, 222, 128, 0.3);
    padding: 12px 16px;
    border-radius: 12px;
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    animation: slideInUp 300ms ease-out;
  }

  .submit-error {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    padding: 12px 16px;
    border-radius: 12px;
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    animation: slideInUp 300ms ease-out;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Light Mode */
  :global(.light-mode) {
    --bg: #f5f5f5;
    --text: #1a1a1a;
    --muted: #666666;
    --primary: #0A3A7D;
    --primary-2: #FFC62B;
    --card: rgba(0,0,0,0.05);
    --stroke: rgba(0,0,0,0.1);
  }

  :global(.light-mode) {
    background: var(--bg);
    color: var(--text);
  }

  :global(.light-mode) .nav {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  :global(.light-mode) .hero {
    background: linear-gradient(135deg, 
      rgba(10,58,125,0.3) 0%, 
      rgba(10,58,125,0.15) 25%,
      rgba(255,198,43,0.05) 75%,
      rgba(15,70,140,0.2) 100%),
      linear-gradient(135deg, #e8f0f7 0%, #fff9e6 100%);
  }

  :global(.light-mode) .card {
    background: rgba(0,0,0,0.03);
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .card:hover {
    background: rgba(255,198,43,0.06);
  }

  :global(.light-mode) .section.alt {
    background: rgba(0,0,0,0.02);
  }

  :global(.light-mode) .slot {
    background: linear-gradient(135deg, rgba(10,58,125,0.08), rgba(255,198,43,0.04));
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .gallery-image-wrapper {
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .testimonio-card {
    background: rgba(0,0,0,0.03);
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .contact {
    background: rgba(0,0,0,0.03);
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) input,
  :global(.light-mode) textarea {
    background: rgba(0,0,0,0.05);
    border-color: rgba(0,0,0,0.1);
    color: var(--text);
  }

  :global(.light-mode) input:focus,
  :global(.light-mode) textarea:focus {
    background: rgba(255,198,43,0.08);
    border-color: var(--primary-2);
  }

  :global(.light-mode) .footer {
    background: rgba(0,0,0,0.02);
    border-top-color: rgba(0,0,0,0.1);
  }

  :global(.light-mode) .menu button:hover {
    background: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .theme-toggle {
    background: rgba(0,0,0,0.08);
    border-color: rgba(0,0,0,0.12);
    color: var(--text);
  }

  :global(.light-mode) .theme-toggle:hover {
    background: rgba(255,198,43,0.15);
    border-color: var(--primary-2);
  }

  :global(.light-mode) .accion-card {
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .kpi-card {
    background: rgba(255,255,255,0.7);
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .kpi-card:hover {
    background: rgba(255,198,43,0.12);
  }

  .acciones { grid-template-columns: repeat(3, minmax(0,1fr)); gap: 20px }

  .accion-card {
    margin: 0;
    border-radius: 14px;
    overflow: hidden;
    aspect-ratio: 1/1;
    cursor: pointer;
    border: 1px solid rgba(255,198,43,0.2);
    transition: all 300ms ease;
    position: relative;
    max-height: 280px;
  }

  .accion-card:hover {
    transform: translateY(-4px);
    border-color: var(--primary-2);
    box-shadow: 0 12px 28px rgba(255,198,43,0.2);
  }

  .accion-card .g-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .accion-card figcaption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(11,18,33,0.95), transparent);
    color: var(--primary-2);
    text-align: center;
    padding: 12px;
    font-size: 14px;
    font-weight: 700;
  }

  .gallery { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px }
  .gallery-item {
    margin: 0;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 4/3;
    cursor: pointer;
  }

  .gallery-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid rgba(255,198,43,0.2);
    border-radius: 16px;
  }

  .g-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .gallery-item:hover .g-img {
    transform: scale(1.08) rotate(1deg);
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,198,43,0.3), rgba(10,58,125,0.5));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 18px;
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }

  .insta-cta { margin-top: 28px; text-align: center }

  .testimonios { grid-template-columns: repeat(3, minmax(0,1fr)) }

  .testimonio-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,198,43,0.15);
    padding: 28px;
    border-radius: 18px;
    transition: all 300ms ease;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .testimonio-card:hover {
    background: rgba(255,198,43,0.08);
    border-color: var(--primary-2);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255,198,43,0.15);
  }

  .stars { font-size: 16px; letter-spacing: 4px }

  .testimonio-text {
    color: var(--text);
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
    flex: 1;
    font-style: italic;
  }

  .testimonio-autor {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-top: auto;
  }

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-2), var(--primary));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0b1221;
    font-weight: 700;
    font-size: 12px;
    flex-shrink: 0;
  }

  .testimonio-autor strong { display: block; font-size: 14px; color: var(--text) }
  .testimonio-autor small { color: var(--muted); font-size: 12px; display: block }

  .contact {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,198,43,0.2);
    padding: 28px;
    border-radius: 18px;
    max-width: 860px;
  }

  .contact .row { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px }
  label { display: grid; gap: 8px }
  label span { font-weight: 600; font-size: 14px }

  input, textarea {
    width: 100%;
    background: rgba(255,255,255,0.05);
    color: var(--text);
    border: 1px solid rgba(255,198,43,0.2);
    border-radius: 12px;
    padding: 12px 14px;
    outline: none;
    transition: all 300ms ease;
    font-family: inherit;
    font-size: 14px;
  }

  input:focus, textarea:focus {
    border-color: var(--primary-2);
    background: rgba(255,198,43,0.08);
    box-shadow: 0 0 0 3px rgba(255,198,43,0.1);
  }

  .contact button { margin-top: 8px }

  .footer {
    border-top: 1px solid var(--stroke);
    padding: 28px 20px;
    color: var(--muted);
    background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(10,58,125,0.03));
  }

  .foot-inner { max-width: 1100px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px }
  .left { display: inline-flex; align-items: center; gap: 8px; color: var(--text) }
  .right { display: inline-flex; gap: 18px }
  .right a { color: var(--muted); text-decoration: none; transition: color 200ms ease }
  .right a:hover { color: var(--primary-2) }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(-10px) }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important }
  }

  @media (max-width: 980px) {
    .hero { padding: 60px 20px; min-height: 500px }
    .hero-content h1 { font-size: clamp(24px, 5vw, 42px) }
    .gallery { grid-template-columns: repeat(3, minmax(0,1fr)) }
    .acciones { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .schedule { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .features { grid-template-columns: 1fr }
    .testimonios { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .kpis { grid-template-columns: repeat(2, minmax(0,1fr)) }
  }

  @media (max-width: 560px) {
    .menu { display: none }
    .section { padding: 40px 16px }
    .hero { padding: 40px 16px; min-height: auto }
    .kpis { grid-template-columns: 1fr }
    .actions { flex-direction: column }
    .cta { width: 100%; justify-content: center }
    .contact .row { grid-template-columns: 1fr }
    .gallery { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .acciones { grid-template-columns: 1fr }
    .schedule { grid-template-columns: 1fr }
    .testimonios { grid-template-columns: 1fr }
    .footer { padding: 20px 16px }
    .foot-inner { flex-direction: column; text-align: center }
  }
</style>
