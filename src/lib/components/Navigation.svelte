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
    <div class="nav-container">
      <a class="brand" href="/" aria-label="Inicio">
        <img src="/images/logo.png" alt="Logo Vikings Voley Club" class="brand-logo" />
        <span class="logo-text">{CLUB_INFO.name}</span>
      </a>
      
      <ul class="menu">
        <li><button on:click={() => scrollToId('beneficios')}>Beneficios</button></li>
        <li><button on:click={() => scrollToId('horarios')}>Horarios</button></li>
        <li><button on:click={() => scrollToId('acciones')}>Acciones</button></li>
        <li><button on:click={() => scrollToId('galeria')}>Galería</button></li>
      </ul>

      <div class="nav-actions">
        <button class="theme-toggle" on:click={handleThemeToggle} title="Cambiar tema">
          {#if $theme}
            ☀️
          {:else}
            🌙
          {/if}
        </button>
        <button class="cta-nav" on:click={() => scrollToId('contacto')}>Únete</button>
      </div>
    </div>
  </nav>
  
  <div class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          Vive el voleibol<br>
          <span class="gradient">con intensidad</span>
        </h1>
        <p class="hero-subtitle">
          Club de voleibol para todas las edades y niveles. Entrenamientos profesionales,
          comunidad vibrante y competencias todo el año.
        </p>
        <div class="hero-actions">
          <a class="cta primary" href="#contacto">Quiero probar una clase</a>
          <a class="cta secondary" href="#horarios">Ver horarios</a>
        </div>
      </div>
      
      <div class="hero-images">
        <img src="/hero/remate-remove-bg.png" alt="Remate" class="hero-img remate" />
        <img src="/hero/recepcion-remove-bg.png" alt="Recepción" class="hero-img recepcion" />
      </div>
    </div>
  </div>

  <div class="kpi-section">
    <div class="kpi-container">
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
    z-index: 100;
    background: rgba(11, 18, 33, 0.7);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 198, 43, 0.1);
    transition: all 200ms ease;
    padding: 16px 40px;
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .site-header.scrolled .nav {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    background: rgba(11, 18, 33, 0.95);
    border-bottom-color: rgba(255, 198, 43, 0.3);
    backdrop-filter: blur(20px);
  }
  
  .brand { 
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
    gap: 12px;
  }

  .brand-logo {
    width: 40px;
    height: 40px;
    display: block;
    object-fit: contain;
    border-radius: 8px;
    transition: transform 200ms ease, filter 200ms ease;
  }

  .brand:hover .brand-logo {
    transform: scale(1.1) rotate(5deg);
  }

  .logo-text {
    font-weight: 900;
    font-size: 24px;
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: -1px;
  }
  
  .menu { 
    list-style: none;
    display: flex;
    gap: 28px;
    margin: 0;
    padding: 0;
    flex: 1;
  }

  .menu button {
    background: transparent;
    border: none;
    color: var(--text);
    padding: 0;
    cursor: pointer;
    transition: color 200ms ease;
    font-weight: 500;
    font-size: 15px;
  }

  .menu button:hover {
    color: var(--primary-2);
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .cta-nav {
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    color: #0b1221;
    border: none;
    padding: 12px 32px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .cta-nav:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 198, 43, 0.3);
  }
  
  .theme-toggle {
    font-size: 18px;
    padding: 8px 12px;
    transition: all 200ms ease;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text);
  }
  
  .theme-toggle:hover {
    transform: rotate(-20deg) scale(1.1);
  }

  .hero {
    position: relative;
    min-height: 700px;
    margin-top: 80px;
    padding: 80px 40px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(180deg, 
      rgba(11,18,33,1) 0%,
      rgba(11,18,33,0.95) 50%,
      rgba(10,58,125,0.08) 100%);
    border-bottom: 1px solid var(--stroke);
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255,198,43,0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(10,58,125,0.15) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
    animation: gradientShift 8s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.05);
    }
  }

  .hero-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .hero-content {
    animation: slideInLeft 0.8s ease-out;
    position: relative;
    z-index: 2;
  }

  .hero-title {
    font-size: clamp(42px, 7vw, 72px);
    line-height: 1.1;
    margin: 0 0 24px;
    font-weight: 900;
    letter-spacing: -2px;
    color: var(--text);
    animation: fadeInUp 0.8s ease-out 0.1s both;
  }

  .hero-title .gradient {
    display: block;
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradientWave 3s ease-in-out infinite;
    background-size: 200% 100%;
  }

  @keyframes gradientWave {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
  }

  .hero-subtitle {
    font-size: 16px;
    color: var(--muted);
    margin: 0 0 32px;
    max-width: 520px;
    line-height: 1.7;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 0;
    animation: fadeInUp 0.8s ease-out 0.3s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-images {
    position: relative;
    height: 600px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: slideInRight 0.8s ease-out;
    z-index: 2;
  }

  .hero-images::before {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 200px;
    background: radial-gradient(ellipse at center, rgba(255,198,43,0.3) 0%, transparent 70%);
    filter: blur(30px);
    animation: pulseGlow 3s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulseGlow {
    0%, 100% { 
      filter: blur(30px);
      opacity: 0.5;
    }
    50% { 
      filter: blur(40px);
      opacity: 0.8;
    }
  }

  .hero-img {
    max-height: 100%;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.2));
  }

  .hero-img.remate {
    animation: floatRemate 4s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    z-index: 2;
  }

  .hero-img.recepcion {
    animation: floatRecepcion 4.5s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
    z-index: 1;
    opacity: 0.85;
  }

  @keyframes floatRemate {
    0% { 
      transform: translateY(0px) translateX(0px) rotate(0deg); 
      filter: drop-shadow(0 20px 60px rgba(255,198,43, 0.15));
    }
    25% { 
      transform: translateY(-28px) translateX(-8px) rotate(-2deg); 
      filter: drop-shadow(0 25px 70px rgba(255,198,43, 0.25));
    }
    50% { 
      transform: translateY(-15px) translateX(0px) rotate(0deg); 
      filter: drop-shadow(0 20px 60px rgba(255,198,43, 0.15));
    }
    75% { 
      transform: translateY(-32px) translateX(8px) rotate(2deg); 
      filter: drop-shadow(0 28px 75px rgba(255,198,43, 0.3));
    }
    100% { 
      transform: translateY(0px) translateX(0px) rotate(0deg); 
      filter: drop-shadow(0 20px 60px rgba(255,198,43, 0.15));
    }
  }

  @keyframes floatRecepcion {
    0% { 
      transform: translateY(0px) translateX(0px) scale(1); 
      filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.15));
    }
    25% { 
      transform: translateY(-22px) translateX(6px) scale(1.02); 
      filter: drop-shadow(0 20px 50px rgba(255,198,43, 0.2));
    }
    50% { 
      transform: translateY(-8px) translateX(0px) scale(1); 
      filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.15));
    }
    75% { 
      transform: translateY(-25px) translateX(-6px) scale(1.02); 
      filter: drop-shadow(0 22px 55px rgba(255,198,43, 0.25));
    }
    100% { 
      transform: translateY(0px) translateX(0px) scale(1); 
      filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.15));
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
    background: rgba(10, 58, 125, 0.15);
    color: var(--primary);
    border: 2px solid var(--primary);
  }

  :global(.cta.secondary:hover) {
    background: rgba(10, 58, 125, 0.25);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(10, 58, 125, 0.2);
  }

  .kpi-section {
    background: linear-gradient(180deg, 
      var(--bg) 0%,
      rgba(10,58,125,0.05) 100%);
    padding: 60px 40px;
    border-top: 1px solid var(--stroke);
    position: relative;
    overflow: hidden;
  }

  .kpi-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(255,198,43,0.5) 50%,
      transparent 100%);
  }

  .kpi-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 30px;
    position: relative;
    z-index: 2;
  }

  .kpi-card {
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(10px);
    border: 1px solid var(--stroke);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    animation: slideInUp 0.8s ease-out both;
  }

  .kpi-card:nth-child(1) { animation-delay: 0.1s; }
  .kpi-card:nth-child(2) { animation-delay: 0.2s; }
  .kpi-card:nth-child(3) { animation-delay: 0.3s; }

  .kpi-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 198, 43, 0.2), transparent);
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }

  .kpi-card:hover {
    border-color: var(--primary-2);
    transform: translateY(-12px);
    box-shadow: 0 20px 48px rgba(255, 198, 43, 0.3);
  }

  .kpi-card:hover::before {
    opacity: 1;
  }

  .kpi-card strong {
    display: block;
    font-size: 42px;
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 8px;
    font-weight: 900;
    position: relative;
    z-index: 1;
  }

  .kpi-card span {
    color: var(--muted);
    font-size: 14px;
    font-weight: 600;
    position: relative;
    z-index: 1;
  }

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

  @media (max-width: 1024px) {
    .hero-container {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .hero-images {
      height: 400px;
    }

    .kpi-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .nav {
      padding: 12px 20px;
    }

    .nav-container {
      gap: 20px;
    }

    .menu {
      display: none;
    }

    .hero {
      padding: 60px 20px;
      min-height: auto;
    }

    .hero-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .hero-title {
      font-size: clamp(32px, 5vw, 48px);
    }

    .hero-subtitle {
      font-size: 15px;
    }

    .hero-images {
      height: 350px;
    }

    .kpi-section {
      padding: 40px 20px;
    }

    .kpi-container {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .kpi-card {
      padding: 24px 16px;
    }

    .kpi-card strong {
      font-size: 32px;
    }
  }

  :global(.light-mode) {
    --bg: #faf7f2;
    --text: #1a1a1a;
    --muted: #666666;
    --card: rgba(0,0,0,0.05);
    --stroke: rgba(0,0,0,0.08);
  }

  :global(.light-mode) .nav {
    background: rgba(250, 247, 242, 0.95);
    border-bottom-color: rgba(0, 0, 0, 0.08);
  }

  :global(.light-mode) .site-header.scrolled .nav {
    background: rgba(250, 247, 242, 0.98);
    border-bottom-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  :global(.light-mode) .logo-text {
    background: linear-gradient(135deg, var(--primary), #0052a3);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  :global(.light-mode) .menu button {
    color: var(--primary);
  }

  :global(.light-mode) .menu button:hover {
    color: var(--primary-2);
  }

  :global(.light-mode) .cta-nav {
    background: linear-gradient(135deg, var(--primary-2), #ff9500);
    color: white;
  }

  :global(.light-mode) .hero {
    background: linear-gradient(180deg, 
      rgba(250, 247, 242, 1) 0%,
      rgba(245, 240, 232, 1) 50%,
      rgba(240, 235, 225, 1) 100%);
  }

  :global(.light-mode) .hero::before {
    background: 
      radial-gradient(circle at 20% 50%, rgba(255,198,43,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(10,58,125,0.08) 0%, transparent 50%);
  }

  :global(.light-mode) .hero-title {
    color: var(--primary);
  }

  :global(.light-mode) .hero-subtitle {
    color: #666;
  }

  :global(.light-mode) .kpi-section {
    background: linear-gradient(180deg, 
      rgba(250, 247, 242, 1) 0%,
      rgba(245, 240, 232, 1) 100%);
  }

  :global(.light-mode) .kpi-section::before {
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(255,198,43,0.3) 50%,
      transparent 100%);
  }

  :global(.light-mode) .kpi-card {
    background: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 198, 43, 0.25);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  :global(.light-mode) .kpi-card:hover {
    background: white;
    border-color: var(--primary-2);
    box-shadow: 0 20px 48px rgba(255, 198, 43, 0.15);
  }

  :global(.light-mode) .kpi-card span {
    color: #666;
  }

  :global(.light-mode) .theme-toggle {
    color: var(--primary);
  }
</style>
