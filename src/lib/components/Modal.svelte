<script>
  /**
   * Modal Component
   * Componente reutilizable de modal para mostrar imágenes
   */
  export let isOpen = false;
  export let imageSrc = '';
  export let imageAlt = 'Modal image';
  export let onClose = () => {};

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleEscapeKey} />

{#if isOpen}
  <div class="modal-overlay" on:click={onClose} role="dialog" aria-modal="true" tabindex="-1">
    <div class="modal-content" on:click|stopPropagation role="document">
      <button class="modal-close" on:click={onClose} aria-label="Cerrar modal">✕</button>
      <img src={imageSrc} alt={imageAlt} class="modal-image" />
    </div>
  </div>
{/if}

<style>
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
</style>
