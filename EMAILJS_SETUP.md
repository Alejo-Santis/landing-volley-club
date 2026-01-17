# 📧 Configuración de EmailJS para Formulario de Contacto

La funcionalidad de envío de emails ya está integrada en tu landing page. Solo necesitas configurar tus credenciales de EmailJS.

## 🚀 Pasos para configurar:

### 1. Registrarse en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Haz clic en "Sign Up"
- Completa el registro (puedes usar tu cuenta de Google)

### 2. Obtener tus credenciales

#### **Public Key (User ID):**
- En el dashboard, ve a "Account" (esquina superior derecha)
- Copia tu **Public Key**

#### **Service ID:**
- En el dashboard, ve a "Email Services"
- Conecta tu email (Gmail, Outlook, etc.) o usa el servicio por defecto
- Copia el **Service ID**

#### **Template ID:**
- Ve a "Email Templates"
- Crea una nueva plantilla o usa una existente
- Copia el **Template ID**

**Plantilla sugerida:**
```
Asunto: Nueva solicitud de contacto - {{from_name}}

De: {{from_name}} ({{from_email}})

Mensaje:
{{message}}
```

### 3. Actualizar el código

Abre el archivo `src/routes/+page.svelte` y busca la función `sendEmail`. 

Reemplaza estas líneas (alrededor de la línea 70):

```javascript
const SERVICE_ID = 'service_XXXXXXX'; // Reemplazar
const TEMPLATE_ID = 'template_XXXXXXX'; // Reemplazar
const USER_ID = 'XXXXXXXXXXXXXXXXXXX'; // Reemplazar
```

Con tus credenciales reales, por ejemplo:

```javascript
const SERVICE_ID = 'service_abc123xyz';
const TEMPLATE_ID = 'template_def456uvw';
const USER_ID = 'your_public_key_here';
```

### 4. Reemplazar email destino

En la misma función, reemplaza:

```javascript
to_email: 'vikingsvoleyclub@example.com' // Reemplazar con tu email
```

Con tu email real:

```javascript
to_email: 'tu_email@gmail.com' // Tu email del club
```

### 5. ¡Listo!

Ahora cuando alguien llene el formulario de contacto, recibirás un email automáticamente.

## 📊 Límites gratuitos de EmailJS:
- **200 emails/mes** en el plan gratuito
- Sin código backend necesario
- Totalmente seguro (las credenciales se ejecutan en el cliente)

## ✅ Características implementadas:
- ✓ Validación de formulario
- ✓ Indicador de envío ("Enviando...")
- ✓ Mensaje de éxito en verde
- ✓ Mensaje de error en rojo
- ✓ Campos deshabilitados durante el envío
- ✓ Los datos se limpian después de enviar exitosamente

## 🆘 Solución de problemas:

**Si recibes error "CORS":**
- Verifica que tu Public Key es correcto
- Asegúrate de estar usando la rama correcta de emailjs

**Si no recibes emails:**
- Verifica el Service ID y Template ID
- Revisa que el email destino sea correcto
- Comprueba que tu plantilla de email tiene las variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`

---

¡Listo! Tu formulario de contacto ahora está funcional. 🎉
