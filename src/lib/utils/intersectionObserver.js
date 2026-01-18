/**
 * Acción Svelte para animaciones al entrar en viewport
 * Uso: <div use:inView={{ threshold: 0.2 }} on:inView>...</div>
 */

export function inView(element, options = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      element.classList.add('in-view');
      element.dispatchEvent(new CustomEvent('inView'));
      observer.unobserve(element);
    }
  }, { threshold, rootMargin });

  observer.observe(element);

  return {
    destroy() {
      observer.unobserve(element);
    }
  };
}

/**
 * Función para animar números contadores
 * Uso: animateCounter(element, startValue, endValue, duration)
 */
export function animateCounter(element, start = 0, end, duration = 1500) {
  let startTime = null;
  const range = end - start;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(start + range * progress);
    
    element.textContent = value.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
