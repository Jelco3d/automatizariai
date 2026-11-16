/**
 * Single source of truth for the booking calendar link.
 * Change the URL here and every "Programează" button on the site updates.
 */
export const BOOKING_URL = "https://calendly.com/erdeleanjelco8/30min";

/** Opens the booking calendar in a new tab. */
export const openBooking = () => {
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};
