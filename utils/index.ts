/** Keep displayed dates identical during SSR and browser hydration. */
export const formatDate = (date: string | number | Date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
