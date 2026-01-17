<script>
  /**
   * Navigation Component
   * Header con navegación, logo y toggle de tema
   */
  import { theme } from '$lib/stores/themeStore';
  import { CLUB_INFO } from '$lib/config';
  import { onMount } from 'svelte';

  export let scrollToId = (id) => {};
  
  let isScrolled = false;

  function handleThemeToggle() {
    theme.toggle();
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 10;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:window on:scroll={() => { isScrolled = window.scrollY > 10; }} />

<header class="site-header" class:scrolled={isScrolled}>
  <nav class="nav">
    <a class="brand" href="/" aria-label="Inicio">
      <img src="/images/logo.png" alt="Logo del club" width="36" height="36" style="border-radius: 50;"/>
      <span>{CLUB_INFO.name}</span>
    </a>
    <div class="spacer"></div>
    <ul class="menu">
      <li><button on:click={() => scrollToId('beneficios')}>Beneficios</button></li>
      <li><button on:click={() => scrollToId('horarios')}>Horarios</button></li>
      <li><button on:click={() => scrollToId('acciones')}>Acciones</button></li>
      <li><button on:click={() => scrollToId('galeria')}>Galería</button></li>
      <li><button class="cta small" on:click={() => scrollToId('contacto')}>Únete</button></li>
      <li><button class="theme-toggle" on:click={handleThemeToggle} title="Cambiar tema">
        {#if $theme}
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

<style>
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    margin: 0;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 100;
    background: rgba(11, 18, 33, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 198, 43, 0.1);
    transition: all 200ms ease;
  }

  .nav :global(.site-header.scrolled) {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    background: rgba(11, 18, 33, 0.95);
    border-bottom-color: rgba(255, 198, 43, 0.2);
  }
  
  .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700 }
  .brand img { filter: drop-shadow(0 0 12px rgba(0,209,255,0.35)) }
  .spacer { flex: 1 }
  
  .menu { list-style: none; display: flex; gap: 8px; margin: 0; padding: 0 }
  .menu button, .menu :global(.cta.small) {
    background: transparent;
    border: 1px solid transparent;
    color: var(--text);
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: 200ms ease;
  }
  
  .menu button:hover { background: rgba(255,198,43,0.15); border-color: var(--primary-2); }
  .menu :global(.cta.small) { border-color: var(--stroke) }
  .menu .theme-toggle {
    font-size: 18px;
    padding: 8px 12px;
    transition: all 200ms ease;
  }
  
  .menu .theme-toggle:hover {
    transform: rotate(-20deg) scale(1.1);
  }

  .hero {
    position: relative;
    max-width: 100%;
    min-height: 600px;
    margin-top: 80px;
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

  :global(.cta) {
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

  :global(.cta.primary) {
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    color: #0b1221;
    box-shadow: 0 12px 32px rgba(255,198,43,0.35);
  }

  :global(.cta.primary::before) {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  :global(.cta.primary:hover) {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(255,198,43,0.45);
  }

  :global(.cta.primary:hover::before) { opacity: 1; }

  :global(.cta.secondary) {
    background: rgba(255,255,255,0.1);
    color: var(--text);
    border: 1.5px solid rgba(255,198,43,0.4);
    backdrop-filter: blur(10px);
  }

  :global(.cta.secondary:hover) {
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

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important }
  }

  @media (max-width: 980px) {
    .hero { margin-top: 70px; padding: 60px 20px; min-height: 500px }
    .hero-content h1 { font-size: clamp(24px, 5vw, 42px) }
    .kpis { grid-template-columns: repeat(2, minmax(0,1fr)) }
  }

  @media (max-width: 560px) {
    .hero { margin-top: 60px; padding: 40px 16px; min-height: auto }
    .menu { display: none }
    .kpis { grid-template-columns: 1fr }
    .actions { flex-direction: column }
    :global(.cta) { width: 100%; justify-content: center }
  }

  :global(.light-mode) {
    --bg: #f5f5f5;
    --text: #1a1a1a;
    --muted: #666666;
    --card: rgba(0,0,0,0.05);
    --stroke: rgba(0,0,0,0.1);
  }

  :global(.light-mode) .nav {
    background: rgba(245, 245, 245, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  :global(.light-mode) .nav.scrolled {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    background: rgba(245, 245, 245, 0.95);
    border-bottom-color: rgba(0, 0, 0, 0.2);
  }

  :global(.light-mode) .hero {
    background: linear-gradient(135deg, 
      rgba(10,58,125,0.3) 0%, 
      rgba(10,58,125,0.15) 25%,
      rgba(255,198,43,0.05) 75%,
      rgba(15,70,140,0.2) 100%),
      linear-gradient(135deg, #e8f0f7 0%, #fff9e6 100%);
  }

  :global(.light-mode) .kpi-card {
    background: rgba(255,255,255,0.7);
    border-color: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .kpi-card:hover {
    background: rgba(255,198,43,0.12);
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
</style>
