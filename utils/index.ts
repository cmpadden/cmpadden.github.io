// Warning! This utility was created before becoming aware of <NuxtTime>.
//
// Date formatting can cause hydration issues due to the difference locale on server and client.
// See: https://www.leopold.is/blog/nuxt-hydration-issues-and-dates/
export const formatDate = function (date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
