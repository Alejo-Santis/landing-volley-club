/**
 * Svelte Store para gestionar el estado del tema (oscuro/claro)
 * Permite que múltiples componentes accedan al estado del tema de forma reactiva
 */

import { writable } from 'svelte/store';

/**
 * Crear el store con valor inicial basado en localStorage
 */
function createThemeStore() {
  // Determinar el tema inicial
  const initialTheme = typeof window !== 'undefined' 
    ? localStorage.getItem('theme') === 'light' ? false : true
    : true;

  const { subscribe, set: setStore, update } = writable(initialTheme);

  // Aplicar tema inicial
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('light-mode', !initialTheme);
  }

  return {
    subscribe,
    /**
     * Cambiar el tema y guardar en localStorage
     */
    toggle: () => {
      update((currentTheme) => {
        const newTheme = !currentTheme;
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('light-mode', !newTheme);
          localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        }
        return newTheme;
      });
    },
    /**
     * Establecer el tema específicamente
     * @param {boolean} isDark - true para oscuro, false para claro
     */
    setTheme: (isDark) => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('light-mode', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
      setStore(isDark);
    }
  };
}

export const theme = createThemeStore();
