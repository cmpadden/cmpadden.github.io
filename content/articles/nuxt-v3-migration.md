---
title: "This Website Has Been Migrated to Nuxt 3 🎉"
date: "2022-12-31"
tags: ["nuxt"]
categories: ["web"]
---

This website has been migrated to the latest version of the Nuxt web framework, and with it comes all of the exciting goodies that the Vue and Nuxt teams have been concocting over the past few years.
Not to mention, all of the great plugins in the Vue ecosystem!

<!--more-->

If you're curious what changes were required to make the migration, you can check out [pull request #3][1] in the GitHub repository.

![Screenshot of Nuxt Migration Pull Request](/images/nuxt-migration-pr.png)

While the documentation for making this migration is great, there were many breaking changes, and the overall process was quite tedious.
For this reason, I opted to generate a new project entirely, and port existing code to this clean slate.
I believe that this resulted in a project with a bit less cruft.

The most valuable resources for making these changes include:

- [The Nuxt Migration Guide][2]
- [The Nuxt Framework Guide][3]
- [Nuxt Tailwind Module Documentation][4]
- [Nuxt Content Module Documentation][5]

Part of the delay for doing this upgrade was in waiting for module developers to support this major release.
I'm super thankful for all of the hard work they've don, and I'm excited to explore all of the new features available!
I just hope that the breaking changes in this release don't cause too much fracturing of the community, as it does feel like déjà vu of Python 2 and 3.


[1]: https://github.com/cmpadden/cmpadden.github.io/pull/3
[2]: https://nuxt.com/docs/migration/overview
[3]: https://nuxt.com/docs/getting-started/introduction
[4]: https://tailwindcss.nuxt.dev/
[5]: https://content.nuxtjs.org/
