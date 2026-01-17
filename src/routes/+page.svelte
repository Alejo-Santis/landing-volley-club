<script>
  import { onMount } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { theme } from '$lib/stores/themeStore';
  import { CLUB_INFO, FEATURES, SCHEDULE, GALLERY_IMAGES, ACTIONS, TESTIMONIALS, WHATSAPP_MESSAGE } from '$lib/config';

  let showHorarioModal = false;
  let horarioImageSrc = '/images/horarios.jpeg';

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openHorarioModal = () => {
    showHorarioModal = true;
  };

  const closeHorarioModal = () => {
    showHorarioModal = false;
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${CLUB_INFO.phoneNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      theme.setTheme(false);
    }
  });
</script>

<svelte:head>
  <title>{CLUB_INFO.name} - Club de Voleibol</title>
  <meta name="description" content="Club de voleibol para todas las edades y niveles." />
</svelte:head>

<Navigation {scrollToId} />

<main>
  <section id="beneficios" class="section">
    <h2 class="section-title">¿Por qué unirte?</h2>
    <div class="grid features">
      {#each FEATURES as feature}
        <article class="card">
          <div class="icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      {/each}
    </div>
  </section>

  <section id="acciones" class="section">
    <h2 class="section-title">Acciones del juego</h2>
    <div class="grid acciones">
      {#each ACTIONS as action}
        <figure class="accion-card">
          <img class="g-img" src={action.image} alt={action.label} loading="lazy" />
          <figcaption>{action.label}</figcaption>
        </figure>
      {/each}
    </div>
  </section>

  <section id="horarios" class="section alt">
    <h2 class="section-title">Horarios y categorías</h2>
    <div class="grid schedule">
      {#each SCHEDULE as slot}
        <article class="slot">
          <h3>{slot.category}</h3>
          <p>{slot.ages} · {slot.days} · {slot.time}</p>
        </article>
      {/each}
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
    <p class="section-subtitle">Revive los entrenamientos, competencias y celebraciones de {CLUB_INFO.name}</p>
    <div class="grid gallery">
      {#each GALLERY_IMAGES as item}
        <figure class="gallery-item">
          <div class="gallery-image-wrapper">
            <img class="g-img" src={item.src} alt={item.alt} loading="lazy" />
            <div class="gallery-overlay">{item.title}</div>
          </div>
        </figure>
      {/each}
    </div>
    <div class="insta-cta">
      <a class="cta primary" href={CLUB_INFO.instagram} target="_blank" rel="noopener noreferrer">Síguenos en Instagram para más contenido</a>
    </div>
  </section>

  <section id="testimonios" class="section alt">
    <h2 class="section-title">Lo que dicen nuestros miembros</h2>
    <p class="section-subtitle">Historias de crecimiento, amistad y logros en {CLUB_INFO.name}</p>
    <div class="grid testimonios">
      {#each TESTIMONIALS as testimonio}
        <article class="testimonio-card">
          <div class="stars">⭐⭐⭐⭐⭐</div>
          <p class="testimonio-text">{testimonio.text}</p>
          <div class="testimonio-autor">
            <div class="avatar">{testimonio.avatar}</div>
            <div>
              <strong>{testimonio.author}</strong>
              <small>{testimonio.role}</small>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section id="contacto" class="section alt">
    <h2 class="section-title">Contáctanos</h2>
    <ContactForm />
  </section>
</main>

<Modal isOpen={showHorarioModal} imageSrc={horarioImageSrc} imageAlt="Horarios ampliado" onClose={closeHorarioModal} />

<button class="whatsapp-button" on:click={openWhatsApp} title="Contáctanos por WhatsApp">
  <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
    <path d="M20.52 3.48C18.25 1.23 15.32 0 12.04 0 5.5 0 .12 5.38.12 11.92c0 2.1.55 4.16 1.58 5.99L.05 24l6.35-2.07c1.75.95 3.73 1.45 5.73 1.45 6.54 0 11.92-5.38 11.92-11.92 0-3.19-1.24-6.19-3.48-8.47zm-8.48 18.32c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.82 1.25 1.27-3.8-.24-.39c-1.03-1.63-1.58-3.52-1.58-5.47 0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9 1.87 1.87 2.9 4.35 2.9 6.99 0 5.45-4.43 9.88-9.88 9.88zm5.4-7.42c-.3-.15-1.75-.87-2.03-.97-.28-.1-.48-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.025-.52-.075-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.075-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.70.63.71.23 1.36.2 1.87.12.57-.085 1.76-.72 2.01-1.41.25-.7.25-1.29.175-1.42-.075-.125-.275-.2-.575-.35z"/>
  </svg>
</button>

<footer class="footer">
  <div class="foot-inner">
    <div class="left">
      <img src="/images/logo.png" alt="Logo del club" width="28" height="28" />
      <span>{CLUB_INFO.name}</span>
    </div>
    <div class="right">
      <a href={CLUB_INFO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
      <a href={CLUB_INFO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
      <a href={CLUB_INFO.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
    </div>
  </div>
  <small>© {new Date().getFullYear()} {CLUB_INFO.name}. Todos los derechos reservados.</small>
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

  main { position: relative }

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
  .card p { color: var(--muted); font-size: 14px; line-height: 1.6; position: relative; z-index: 1; margin: 0 }
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

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important }
  }

  @media (max-width: 980px) {
    .gallery { grid-template-columns: repeat(3, minmax(0,1fr)) }
    .acciones { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .schedule { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .features { grid-template-columns: 1fr }
    .testimonios { grid-template-columns: repeat(2, minmax(0,1fr)) }
  }

  @media (max-width: 560px) {
    .section { padding: 40px 16px }
    .gallery { grid-template-columns: repeat(2, minmax(0,1fr)) }
    .acciones { grid-template-columns: 1fr }
    .schedule { grid-template-columns: 1fr }
    .testimonios { grid-template-columns: 1fr }
    .footer { padding: 20px 16px }
    .foot-inner { flex-direction: column; text-align: center }
  }

  :global(.light-mode) {
    --bg: #f5f5f5;
    --text: #1a1a1a;
    --muted: #666666;
    --card: rgba(0,0,0,0.05);
    --stroke: rgba(0,0,0,0.1);
  }

  :global(.light-mode) {
    background: var(--bg);
    color: var(--text);
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

  :global(.light-mode) .footer {
    background: rgba(0,0,0,0.02);
    border-top-color: rgba(0,0,0,0.1);
  }

  :global(.light-mode) .accion-card {
    border-color: rgba(0,0,0,0.08);
  }
</style>
