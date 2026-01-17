<script>
  /**
   * ContactForm Component
   * Formulario de contacto con validación y envío de email
   */
  import { sendEmail, validateFormData } from '$lib/utils/emailService';

  let formData = {
    nombre: '',
    email: '',
    mensaje: ''
  };
  let isSubmitting = false;
  let submitStatus = null; // null, 'success', 'error'
  let submitMessage = '';

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validar datos
    const { isValid, errors } = validateFormData(formData);
    if (!isValid) {
      submitStatus = 'error';
      submitMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    isSubmitting = true;
    submitStatus = null;

    try {
      const result = await sendEmail(formData);
      submitStatus = 'success';
      submitMessage = result.message;
      formData = { nombre: '', email: '', mensaje: '' };
      setTimeout(() => {
        submitStatus = null;
      }, 5000);
    } catch (error) {
      console.error('Error enviando email:', error);
      submitStatus = 'error';
      submitMessage = error.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.';
      setTimeout(() => {
        submitStatus = null;
      }, 5000);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="contact">
  <form on:submit={handleSubmit}>
    <div class="row">
      <label>
        <span>Nombre</span>
        <input 
          type="text"
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
        required
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
    
    <p class="note">⚙️ Para activar esta funcionalidad, necesitas configurar EmailJS con tus credenciales (ver instrucciones en src/lib/config.js).</p>
  </form>
</div>

<style>
  .contact {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,198,43,0.2);
    padding: 28px;
    border-radius: 18px;
    max-width: 860px;
  }

  form {
    display: contents;
  }

  .row { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px }
  
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

  button {
    margin-top: 8px;
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

  .note { 
    color: var(--muted); 
    font-size: 13px; 
    margin-top: 14px;
    margin-bottom: 0;
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

  :global(.cta.primary:hover:not(:disabled)) {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(255,198,43,0.45);
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

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important }
  }

  @media (max-width: 560px) {
    .row { grid-template-columns: 1fr }
    .contact { padding: 20px 16px }
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
</style>
