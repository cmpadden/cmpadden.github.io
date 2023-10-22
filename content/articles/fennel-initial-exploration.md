---
title: 'Initial Exploration of Fennel: Extending Hammerspoon'
description: 'My first impressions of Fennel for configuring Hammerspoon'
draft: false
date: "2023-10-22"
tags: ["lisp", "hammerspoon", "fennel"]
categories: ["lisp"]
---

<div>
  <img
    class="h-48 rounded-lg shadow-md"
    src="/images/dall-e-fennel-hammer.jpeg"
    alt="Dall-E Generated Image of Fennel and a Hammer"
  >
</div>

A while back I read an introductory book on Lisp programming titled, "The Little
Schemer". This book opened my mind to new (to me) programming paradigms, and left me
with a strong desire to find a way to incorporate Lisp programming into my every day
life. It took some time, but I believe I've found what I've been looking for: Fennel.

The [Fennel][1] programming language is a dialect of Lisp that boasts compatibility with
Lua, and it just so happens that two of my favorite applications are configured with
exactly that language: [Hammerspoon][2], and [Neovim][3].

## Initial Observations

To initially explore Fennel, I wanted to start small. My Hammerspoon configuration
consists of 7 [modules][4] that I use for operations such as: launching applications,
managing windows, keeping my computer from going to sleep, and general operating system
automation. So the plan is to translate these modules into Fennel, while maintaining
without breaking the existing functionality. However, at this point, I wasn't even sure
how to embed Fennel into my project...

## Integrating Fennel with Hammerspoon

While official documentation exists describing how to [embed fennel][5] into your
project; it didn't provide me with enough clarity to know my next steps on integrating
it with Hammerspoon. I found a few resources online demonstrating how to extend the
`package.path` and `package.cpath` properties in Lua, but I was unable to get this to
work.

* https://blog.exupero.org/hammerspoon-with-fennel/
* https://github.com/Hammerspoon/hammerspoon/issues/2377#issuecomment-636331435
* https://github.com/agzam/spacehammer/blob/master/init.lua

Ultimately, I opted to include the `fennel.lua` file to my Hammerspoon configuration,
and while not ideal, it does make the configuration nicely self-contained. I'll leave it
as a future task to include the module installed with LuaRocks.

With Fennel now included in my Hammerspoon configuration, all I need to do is configure
the `fennel.path` to point to the `*.fnl` files in the `.hammerspoon/` directory, and
ttranslating these modules can begin!

```lua
-- init.lua

local fennel = require('fennel')

fennel.path = package.path .. ";" .. os.getenv("HOME") .. "/.hammerspoon/?.fnl"

table.insert(package.loaders or package.searchers, fennel.searcher)

require 'main'
```

## Translating Lua to Fennel

As a Fennel novice, I was happy to see that the Fennel project provides an online
cross-compiler for Lua and Fennel called [anti-fennel][6], and while it can generate some
strange-looking Fennel code, it was an extremely useful tool for me to get
up-and-running right away. For example, by pasting the simple `sleep` function
from the `helpers` module into the compiler:

```lua
function sleep(ms)
    os.execute("sleep " .. tonumber(ms) / 1000)
end
```

```fennel
(fn sleep [ms]
  (os.execute (.. "sleep " (/ (tonumber ms) 1000))))
```

As another example, here is the output for my _caffeine_ toggle:

```lua
hs.hotkey.bind(HYPER, "0", function()
  hs.caffeinate.toggle("displayIdle")
  if hs.caffeinate.get("displayIdle") then
    helpers:show("Caffeine Enabled", nil, helpers.styles.success, helpers.assets.check)
  else
    helpers:show("Caffeine Disabled", nil, helpers.styles.error, helpers.assets.ban)
  end
end)
```

```lisp
(hs.hotkey.bind HYPER :0
  (fn [] (hs.caffeinate.toggle :displayIdle)
    (if (hs.caffeinate.get :displayIdle)
      (helpers:show "Caffeine Enabled" nil helpers.styles.success helpers.assets.check)
      (helpers:show "Caffeine Disabled" nil helpers.styles.error helpers.assets.ban))))	
```

This was especially helpful for more gnarly modules like the `window` module used for
window management, and seeing the Lua and Fennel code side-by-side was a kick starter in
learning the language!

## Next Steps

While my Fennel Hammerspoon configuration now works with parity to its Lua counterpart,
I have not yet added new features or modules. I look forward to writing new Fennel code,
and deepen my understanding of Lisp and the Fennel programming language.

Additionally, before beginning this endeavor, I was already aware of projects like
[spacehammer][7]; a wildly impressive Hammerspoon configuration written in Fennel, but,
I wanted to start small and learn the integration myself. However, with the basics out
of the way, I hope to explore this project further, and seek lessons-learned for the
configuration of my own.

The full pull-request for translating my Lua Hammerspoon configuration to Fennel can be
found here: https://github.com/cmpadden/dotfiles/pull/19/files


[1]: https://fennel-lang.org/
[2]: https://www.hammerspoon.org/
[3]: https://neovim.io/
[4]: https://github.com/cmpadden/dotfiles/tree/795749fa17e1310bb001bb7deaa22be8689f0027/hammerspoon/.hammerspoon/modules
[5]: https://fennel-lang.org/setup#embedding-fennel
[6]: https://fennel-lang.org/see
[7]: https://github.com/agzam/spacehammer
