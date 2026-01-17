/**
 * Servicio de Email con EmailJS
 * Encapsula toda la lógica de envío de emails
 */

import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '$lib/config';

/**
 * Enviar email usando EmailJS
 * @param {Object} formData - Datos del formulario {nombre, email, mensaje}
 * @returns {Promise} Resultado del envío
 */
export async function sendEmail(formData) {
  // Validar que las credenciales estén configuradas
  if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'XXXXXXXXXXXXXXXXXXX') {
    throw new Error('EmailJS no está configurado. Por favor, añade tus credenciales en src/lib/config.js');
  }

  try {
    // Inicializar EmailJS con la clave pública
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // Enviar el email
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        from_name: formData.nombre,
        from_email: formData.email,
        message: formData.mensaje,
        to_email: EMAILJS_CONFIG.TO_EMAIL
      }
    );

    return {
      success: response.status === 200,
      message: '¡Mensaje enviado exitosamente! Nos contactaremos pronto.',
      status: response.status
    };
  } catch (error) {
    console.error('Error enviando email:', error);
    throw {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
      error: error
    };
  }
}

/**
 * Validar datos del formulario
 * @param {Object} formData - Datos a validar
 * @returns {Object} {isValid, errors}
 */
export function validateFormData(formData) {
  const errors = {};

  if (!formData.nombre || formData.nombre.trim().length === 0) {
    errors.nombre = 'El nombre es requerido';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Email inválido';
  }

  if (!formData.mensaje || formData.mensaje.trim().length === 0) {
    errors.mensaje = 'El mensaje es requerido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
