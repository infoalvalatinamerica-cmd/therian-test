# Despliegue — Therian Test

Sigue estos pasos en tu terminal (PowerShell o Git Bash en Windows).

---

## Paso 1: Crear repositorio en GitHub

Ve a https://github.com/new y crea un repositorio con estos datos:
- **Nombre:** `therian-test`
- **Visibilidad:** Public (necesario para Vercel gratis)
- **NO** inicialices con README

Copia la URL del repositorio (ejemplo: `https://github.com/TU_USUARIO/therian-test.git`)

---

## Paso 2: Subir archivos a GitHub

Abre PowerShell o Git Bash en la carpeta `Lanzamiento` y ejecuta:

```bash
git init
git add -A
git commit -m "Lanzamiento Therian Test v1.0"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/therian-test.git
git push -u origin main
```

> Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

---

## Paso 3: Desplegar en Vercel

1. Ve a https://vercel.com/new
2. Haz clic en **"Import Git Repository"**
3. Selecciona `therian-test`
4. En la configuración de build deja todo en blanco (es un sitio estático)
5. Haz clic en **Deploy**

En ~60 segundos tendrás una URL pública tipo:
`https://therian-test.vercel.app`

---

## Paso 4: Configurar Brevo (captura de emails)

1. Ve a https://app.brevo.com → API Keys → copia tu API key
2. Abre `quiz.html` y reemplaza `YOUR_BREVO_API_KEY` con tu clave real
3. Verifica que `BREVO_LIST_ID` tenga el ID de tu lista de contactos
4. Haz commit y push de nuevo para redesplegar:

```bash
git add quiz.html
git commit -m "Agregar Brevo API key"
git push
```

---

## Estructura de archivos desplegados

```
/
├── portada_producto.html   ← Portada publicitaria (entrada)
├── quiz.html               ← Test de los 22 arquetipos
├── pagina_de_venta.html    ← Página de ventas → Hotmart
├── hotmart_22_lecciones.html ← Entregable (post-compra)
├── imagenes/               ← 22 imágenes arquetipos (fallback)
└── vercel.json             ← Routing de Vercel
```

## URLs del sitio desplegado

| Página | Ruta |
|--------|------|
| Portada (anuncio) | `/portada_producto.html` o `/` |
| Quiz gratuito | `/quiz.html` |
| Página de ventas | `/pagina_de_venta.html` |

---

## Resend (emails post-compra)

Resend se configura del lado de Hotmart como webhook. Cuando el cliente compra:
1. Hotmart llama a tu webhook endpoint
2. El webhook lee `bonusImg` del arquetipo del comprador desde Cloudinary
3. Resend envía el email con la imagen del arquetipo + PDF

> Habla con tu desarrollador para configurar el webhook de Hotmart → Resend.
