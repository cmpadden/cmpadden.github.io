---
title: 'Initial exploration of Nix'
draft: false
date: "2024-06-06"
tags: ["nix", "nixos", "nix-dawin"]
categories: ["configuration"]
---

For years I've heard respected engineers give praise to NixOS, and its declarative approach to managing packages and system configuration, however, I've also heard many claim that the learning curve is exceptionally steep. I've briefly perused the docs in the past, and have never taken the plunge into learning the system.

In this article I am going to document my initial experience, warts and all, in exploring [nix-darwin](https://github.com/LnL7/nix-darwin). A set of Nix modules that claim to bring an experience similar to NixOS to macOS.

## Installation

My very first entry point into this exploration is the [README file of the LnL7/nix-darwin](https://github.com/LnL7/nix-darwin) repository.

It first states that an installation of Nix is required.

> To install nix-darwin, a working installation of Nix is required.

> If you wish to use nix-darwin with flakes, please refer to the flakes section.

Then, it mentioned that I can use _flakes_ if I desire. I have no idea what a _flake_ is, so let's look that up.

Funnily enough, upon googling, "nix flakes", the first result is a Reddit post titled, [Can someone explain to me what a flake is like I’m 5?](https://www.reddit.com/r/NixOS/comments/131fvqs/can_someone_explain_to_me_what_a_flake_is_like_im/). With the top response from /u/ElvishJerricco stating:

> A flake.nix file is an attribute set with two attributes called inputs and outputs. The inputs attribute describes the other flakes that you would like to use; things like nixpkgs or home-manager. You have to give it the url where the code for that other flake is, and usually people use GitHub. The outputs attribute is a function, which is where we really start getting into the nix programming language. Nix will go and fetch all the inputs, load up their flake.nix files, and it will call your outputs function with all of their outputs as arguments. The outputs of a flake are just whatever its outputs function returns, which can be basically anything the flake wants it to be. Finally, nix records exactly which revision was fetched from GitHub in flake.lock so that the versions of all your inputs are pinned to the same thing until you manually update the lock file.

This raises more questions, but between this response and the response of a few other Redditors, it seems like the use of Flakes is a good option moving forward! So for now, I'm going to move forward with this relatively newer "experimental" approach!
