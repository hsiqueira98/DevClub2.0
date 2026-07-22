/*
 * Site-wide constants.
 *
 * The page has no checkout/enrollment backend (see DECISION_LOG.md —
 * hiring-contest submission), so every conversion CTA opens a real
 * WhatsApp conversation with a pre-filled "quero me matricular" message
 * instead of pointing at a dead route. Single source of truth: the
 * number or message changes here, never pasted per button.
 */
export const WHATSAPP_ENROLL_URL =
  'https://api.whatsapp.com/send/?phone=5516990482444&text=quero%20me%20matricular&type=phone_number&app_absent=0'
