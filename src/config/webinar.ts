// Detaliile webinarului — actualizează-le aici când se schimbă data sau linkul.
export const WEBINAR = {
  title: "Cum construiești o afacere care rulează singură",
  // ISO 8601, ora României
  startsAt: "2026-09-24T19:00:00+03:00",
  durationMinutes: 45,
  joinUrl: "https://meet.google.com/webinar-afacere-autonoma",
  registrationPath: "/webinar-afacere-autonoma",
  source: "webinar-afacere-autonoma",
};

export const formatWebinarDate = () =>
  new Date(WEBINAR.startsAt).toLocaleDateString("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Bucharest",
  });

export const formatWebinarTime = () =>
  new Date(WEBINAR.startsAt).toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Bucharest",
  });
