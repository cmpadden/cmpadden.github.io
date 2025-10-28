---
title: "Tip: Re-running Bash Commands"
date: "2021-09-22"
draft: false
tags: ["tip", "bash"]
categories: ["tips"]
---

Do you ever find yourself having to re-run a Bash command? I often find this
happening to myself when I neglect to use `sudo` for a command that requires
root privileges.

<!--more-->

```bash
$ pacman -Syu
error: you cannot perform this operation unless you are root.
```

Well, I have good news for you -- you can easily re-issue a command with the
`!!` designator! Simply type `sudo` followed by `!!` and you're good to go.

```bash
$ sudo !!
sudo pacman -Syu
[sudo] password for colton:
:: Synchronizing package databases...
```

--

Commands that are prefixed with a bang, `!`, are considered _Event
Designators,_ and are references to your command-line history. You can take a
look at your history with the `history` command.

```bash
$ history
 1021  touch hello_world.txt
 1022  ls
 1023  echo "Here we go again!"
 1024  find . -name *.py
```

There are many ways to use `!` in your shell. For example, if you wanted to
re-issue a specific command in your history, you could use `!n` where `n` is
the number next to the command in your history.

```bash
$ !1023
echo "Here we go again!"
Here we go again!
```

Or... if you wanted to run the command you issued 4-commands ago, you can use
`!-4`.

```bash
$ !-4
ls
hello_world.txt
```

Or... if you wanted to run the last command that started with the string
_find_, you can use `!find`.

```bash
$ !find
find . -name *.py
```

Be sure to check out the _Event Designators_ section of the `bash` `man` pages
for more information!

--

As an aside, for even faster command-line history navigation, be sure to check
out the excellent [fzf](https://github.com/junegunn/fzf) utility by _junegunn._
One of the many features of `fzf` is browsing and re-issuing commands from your
command-line history with a fuzzy-finder!
