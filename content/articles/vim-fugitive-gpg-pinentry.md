---
title: 'Using pinentry-mac to sign commits from vim-fugitive'
draft: false
date: "2024-05-11"
tags: ["vim", "tip"]
categories: ["tooling", "tips"]
---

In order to sign git commits from within Vim using a plugin like [tpope/vim-fugitive](https://github.com/tpope/vim-fugitive), it is necessary to configure the `gpg-agent` to use a GUI based `pinentry-program`. 

<!--more-->

## Preface

The man, the myth, the legend, Timothy Popallopollis himself [recommends](https://github.com/tpope/vim-fugitive/issues/846#issuecomment-253816577) configuring your `gpg-agent` to use a GUI based `pinentry-program`. On macOS this can be done quite by simply installing `pinentry-mac`, and updating your `gpg-agent.conf`.

## Configuration

First things first, let's install the pinentry program.

```bash
$ brew install pinentry-mac
```

Then, all we need to do is set the `pinentry-program` option in your `~/.gnupg/gpg-agent.conf` file.

```
default-cache-ttl 600
max-cache-ttl 7200
pinentry-program /opt/homebrew/bin/pinentry-mac
```

If your don't know the path to your pinentry program, you can throw down a quick `which`.

```bash
$ which pinentry-mac
/opt/homebrew/bin/pinentry-mac
```

Or use your Homebrew prefix.

```bash
$ echo $(brew --prefix)/bin/pinentry-mac
/opt/homebrew/bin/pinentry-mac
```

But that's all it takes. Now, you should be prompted to enter your gpg pin in an external window when signing commits from vim.

