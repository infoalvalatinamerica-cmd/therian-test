// ════════════════════════════════════════════
//  Vercel Serverless Function — Resend Email
//  Therian Test · Bono + CTA al Informe
// ════════════════════════════════════════════
const { Resend } = require('resend');

const HOTMART_URL = 'https://theriantest.vercel.app/pagina_de_venta.html';

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    name,
    email,
    archetypeName,
    archetypeSubtitle,
    archetypeImg,
    bonusImg
  } = req.body || {};

  if (!email || !archetypeName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const firstName = (name || '').split(' ')[0] || 'Viajero';
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Arquetipo — ${archetypeName}</title>
</head>
<body style="margin:0; padding:0; background-color:#0d2318;">
<div style="max-width:600px; margin:0 auto; background-color:#0d2318; color:#f5f0e8; font-family:Georgia, serif; padding:40px 30px; border:2px solid #d4a853; border-radius:4px;">

  <!-- HEADER -->
  <h1 style="color:#d4a853; text-transform:uppercase; letter-spacing:3px; text-align:center; font-size:1.35rem; margin:0 0 8px;">El Oráculo ha hablado</h1>
  <p style="text-align:center; font-style:italic; color:rgba(245,240,232,0.65); font-size:0.95rem; margin:0 0 28px;">"Tu naturaleza animal no es una coincidencia, es tu destino."</p>

  <hr style="border:0; border-top:1px solid #d4a853; margin:0 0 28px;">

  <!-- SALUDO -->
  <p style="font-size:1.1rem; margin:0 0 10px;">Hola <strong>${firstName}</strong>,</p>
  <p style="font-size:0.97rem; color:rgba(245,240,232,0.7); line-height:1.75; margin:0 0 22px;">
    Tras analizar tus instintos en las 15 preguntas, hemos descifrado que tu Arquetipo dominante es:
  </p>

  <!-- NOMBRE DEL ARQUETIPO -->
  <h2 style="color:#d4a853; font-size:2.2rem; text-align:center; text-transform:uppercase; letter-spacing:3px; margin:0 0 6px;">${archetypeName}</h2>
  <p style="text-align:center; color:rgba(245,240,232,0.55); font-size:0.78rem; letter-spacing:1.5px; text-transform:uppercase; margin:0 0 24px;">${archetypeSubtitle || ''}</p>

  <!-- IMAGEN ARQUETIPO -->
  <div style="text-align:center; margin-bottom:28px;">
    <img src="${archetypeImg}" alt="${archetypeName}"
         style="width:100%; max-width:440px; border-radius:12px; border:2px solid #d4a853; display:block; margin:0 auto;">
  </div>

  <!-- BONO -->
  <div style="background-color:rgba(212,168,83,0.08); padding:24px; border-radius:10px; border:1px solid rgba(212,168,83,0.3); margin-bottom:26px;">
    <h3 style="color:#d4a853; margin:0 0 12px; font-size:1.05rem;">🎁 Tu Bono de Bienvenida</h3>
    <p style="color:rgba(245,240,232,0.7); font-size:0.92rem; line-height:1.7; margin:0 0 16px;">
      Como prometimos, aquí tienes tu imagen de arquetipo en alta resolución. Úsala como fondo de pantalla o compártela en redes sociales:
    </p>
    <div style="text-align:center;">
      <a href="${bonusImg}"
         style="color:#d4a853; font-weight:bold; font-size:1rem; text-decoration:underline; letter-spacing:0.5px;">
        ✦ Descargar Imagen HD — ${archetypeName} ✦
      </a>
    </div>
  </div>

  <!-- COPY VENTA -->
  <p style="font-size:1rem; line-height:1.8; color:rgba(245,240,232,0.8); margin:0 0 14px;">
    Este animal revela tu superficie, pero… <strong style="color:#f5f0e8;">¿qué hay de tu sombra?</strong>
  </p>
  <p style="font-size:0.97rem; line-height:1.75; color:rgba(245,240,232,0.7); margin:0 0 18px;">
    En tu <strong style="color:#f5f0e8;">Informe Profundo de 10 páginas</strong> revelamos lo que el test no puede mostrarte:
  </p>

  <table style="width:100%; margin-bottom:26px;">
    <tr><td style="padding:6px 0; color:rgba(245,240,232,0.7); font-size:0.92rem;">✦ &nbsp;Análisis psicológico profundo de tu arquetipo</td></tr>
    <tr><td style="padding:6px 0; color:rgba(245,240,232,0.7); font-size:0.92rem;">✦ &nbsp;Tus fortalezas, puntos ciegos y sombra interior</td></tr>
    <tr><td style="padding:6px 0; color:rgba(245,240,232,0.7); font-size:0.92rem;">✦ &nbsp;Cómo eres en el trabajo, el amor y el conflicto</td></tr>
    <tr><td style="padding:6px 0; color:rgba(245,240,232,0.7); font-size:0.92rem;">✦ &nbsp;Compatibilidades con los otros 21 arquetipos</td></tr>
    <tr><td style="padding:6px 0; color:rgba(245,240,232,0.7); font-size:0.92rem;">✦ &nbsp;Plan de activación de 7 días + 3 bonos exclusivos</td></tr>
  </table>

  <!-- CTA -->
  <div style="text-align:center; margin:30px 0 16px;">
    <a href="${HOTMART_URL}"
       style="display:inline-block; background-color:#d4a853; color:#0d2318; padding:18px 38px; text-decoration:none; font-weight:bold; border-radius:50px; font-size:1.05rem; letter-spacing:0.5px; font-family:Arial, sans-serif;">
      DESBLOQUEAR MI INFORME COMPLETO ($3.99)
    </a>
  </div>
  <p style="text-align:center; font-size:0.73rem; color:rgba(245,240,232,0.4); margin:0 0 30px;">
    🔒 Pago seguro vía Hotmart &nbsp;·&nbsp; Garantía 7 días &nbsp;·&nbsp; Acceso inmediato
  </p>

  <hr style="border:0; border-top:1px solid rgba(212,168,83,0.25); margin:0 0 24px;">

  <!-- FOOTER -->
  <p style="text-align:center; font-size:0.78rem; color:rgba(245,240,232,0.35); line-height:1.8; margin:0;">
    Fernando Almanza — Arquetipos Therianos<br>
    © 2026 Todos los derechos reservados.
  </p>

</div>
</body>
</html>`;

  try {
    const result = await resend.emails.send({
      from: 'Arquetipos Therianos <onboarding@resend.dev>', // ← Cambiar por tu dominio verificado en Resend
      to: email,
      subject: `🐺 Tu esencia ha sido revelada, ${firstName} (Tu bono adentro 🎁)`,
      html
    });
    console.log('Email sent:', result);
    return res.status(200).json({ success: true, id: result.id });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email', detail: err.message });
  }
};
