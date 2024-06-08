---
title: 'My very first impression of Nix'
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

Returning to the installation instructions, let's get a working Nix installation setup.

The [nix.dev/install-nix](https://nix.dev/install-nix) page suggests piping the output of curl into our shell.

```sh
curl -L https://nixos.org/nix/install | sh
```

But first, let's take a look at what's going on here.

```sh
curl -L https://nixos.org/nix/install >> nix-install.sh
```

```sh
#!/bin/sh

# This script installs the Nix package manager on your system by
# downloading a binary distribution and running its installer script
# (which in turn creates and populates /nix).

{ # Prevent execution if this script was only partially downloaded
oops() {
    echo "$0:" "$@" >&2
    exit 1
}

umask 0022

tmpDir="$(mktemp -d -t nix-binary-tarball-unpack.XXXXXXXXXX || \
          oops "Can't create temporary directory for downloading the Nix binary tarball")"
cleanup() {
    rm -rf "$tmpDir"
}
trap cleanup EXIT INT QUIT TERM

require_util() {
    command -v "$1" > /dev/null 2>&1 ||
        oops "you do not have '$1' installed, which I need to $2"
}

case "$(uname -s).$(uname -m)" in
    Linux.x86_64)
        hash=0a0f8380a581c98bc813e31b6b38ecbca075ef6be2c90b8da6c89766a7cd501d
        path=ml60s224bjsc53jkdjr171kyi8g10kap/nix-2.22.1-x86_64-linux.tar.xz
        system=x86_64-linux
        ;;
    Linux.i?86)
        hash=ce359e545f3758e563d3bbd6668ab1b8028ab73336f4cdb7e29181e9b282c43b
        path=n2dranancfhwiqc4nkc6k89z9aj45ppy/nix-2.22.1-i686-linux.tar.xz
        system=i686-linux
        ;;
    Linux.aarch64)
        hash=3694481327ee34edb8aef1107bb7dd569a604b6707653e36802b9192d576c4df
        path=8s8yqgs5iscyf56qg9cipgbykg9n7yx9/nix-2.22.1-aarch64-linux.tar.xz
        system=aarch64-linux
        ;;
    Linux.armv6l)
        hash=44aaaff746ca9da964f961d916c6d33820468cbfcb6f4323d394409b5b4ee5f6
        path=0l0bxii1r4qn0byqhn4pws0ncjsvgrfv/nix-2.22.1-armv6l-linux.tar.xz
        system=armv6l-linux
        ;;
    Linux.armv7l)
        hash=59f624f7b2375a1acbb8e7bcffc35bdd6e588d374d026d1797deb53784200685
        path=g3bx9fs23c7w2s0v063ik4n0g8mwac1j/nix-2.22.1-armv7l-linux.tar.xz
        system=armv7l-linux
        ;;
    Darwin.x86_64)
        hash=fc7415d8d28b94ff1959c3a670430b0c9804e5dcb281b1a36e8646860397e656
        path=56iy2576f73v5yrcn6l8fqsz51mlf2dr/nix-2.22.1-x86_64-darwin.tar.xz
        system=x86_64-darwin
        ;;
    Darwin.arm64|Darwin.aarch64)
        hash=1cc1cb82e744e853b8d2c6fe075a1048c3600a404b4b8894ae892bf24258ca37
        path=1c4gbsd8kmx2zkd2pasarmkvafcpwvsm/nix-2.22.1-aarch64-darwin.tar.xz
        system=aarch64-darwin
        ;;
    *) oops "sorry, there is no binary distribution of Nix for your platform";;
esac

# Use this command-line option to fetch the tarballs using nar-serve or Cachix
if [ "${1:-}" = "--tarball-url-prefix" ]; then
    if [ -z "${2:-}" ]; then
        oops "missing argument for --tarball-url-prefix"
    fi
    url=${2}/${path}
    shift 2
else
    url=https://releases.nixos.org/nix/nix-2.22.1/nix-2.22.1-$system.tar.xz
fi

tarball=$tmpDir/nix-2.22.1-$system.tar.xz

require_util tar "unpack the binary tarball"
if [ "$(uname -s)" != "Darwin" ]; then
    require_util xz "unpack the binary tarball"
fi

if command -v curl > /dev/null 2>&1; then
    fetch() { curl --fail -L "$1" -o "$2"; }
elif command -v wget > /dev/null 2>&1; then
    fetch() { wget "$1" -O "$2"; } else oops "you don't have wget or curl installed, which I need to download the binary tarball"
fi

echo "downloading Nix 2.22.1 binary tarball for $system from '$url' to '$tmpDir'..."
fetch "$url" "$tarball" || oops "failed to download '$url'"

if command -v sha256sum > /dev/null 2>&1; then
    hash2="$(sha256sum -b "$tarball" | cut -c1-64)"
elif command -v shasum > /dev/null 2>&1; then
    hash2="$(shasum -a 256 -b "$tarball" | cut -c1-64)"
elif command -v openssl > /dev/null 2>&1; then
    hash2="$(openssl dgst -r -sha256 "$tarball" | cut -c1-64)"
else
    oops "cannot verify the SHA-256 hash of '$url'; you need one of 'shasum', 'sha256sum', or 'openssl'"
fi

if [ "$hash" != "$hash2" ]; then
    oops "SHA-256 hash mismatch in '$url'; expected $hash, got $hash2"
fi

unpack=$tmpDir/unpack
mkdir -p "$unpack"
tar -xJf "$tarball" -C "$unpack" || oops "failed to unpack '$url'"

script=$(echo "$unpack"/*/install)

[ -e "$script" ] || oops "installation script is missing from the binary tarball!"
export INVOKED_FROM_INSTALL_IN=1
"$script" "$@"

} # End of wrapping
```

This seems straight forward enough. It pulls a binary distribution depending on the operating system and system architecture, it unpacks the binary, and then calls the installation script that was included in the binary tarball.

Upon invoking the install script, I'm prompted with an installation wizard.

```sh
$ sh ./nix-install.sh
downloading Nix 2.22.1 binary tarball for aarch64-darwin from 'https://releases.nixos.org/nix/nix-2.22.1/nix-2.22.1-aarch64-darwin.tar.xz' to '/var/folders/q_/2q7xz7v50bz47p00grqxlsmr0000gn/T/nix-binary-tarball-unpack.XXXXXXXXXX.YaBGa1tIJz'...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 12.1M  100 12.1M    0     0  5107k      0  0:00:02  0:00:02 --:--:-- 5106k
Switching to the Multi-user Installer
Welcome to the Multi-User Nix Installation

This installation tool will set up your computer with the Nix package
manager. This will happen in a few stages:

1. Make sure your computer doesn't already have Nix. If it does, I
   will show you instructions on how to clean up your old install.

2. Show you what I am going to install and where. Then I will ask
   if you are ready to continue.

3. Create the system users (uids [301..332]) and groups (gid 30000)
   that the Nix daemon uses to run builds. To create system users
   in a different range, exit and run this tool again with
   NIX_FIRST_BUILD_UID set.

4. Perform the basic installation of the Nix files daemon.

5. Configure your shell to import special Nix Profile files, so you
   can use Nix.

6. Start the Nix daemon.

Would you like to see a more detailed list of what I will do?
[y/n]

I will:

 - make sure your computer doesn't already have Nix files
   (if it does, I will tell you how to clean them up.)
 - create local users (see the list above for the users I'll make)
 - create a local group (nixbld)
 - install Nix in to /nix
 - create a configuration file in /etc/nix
 - set up the "default profile" by creating some Nix-related files in
   /var/root
 - back up /etc/bashrc to /etc/bashrc.backup-before-nix
 - update /etc/bashrc to include some Nix configuration
 - back up /etc/zshrc to /etc/zshrc.backup-before-nix
 - update /etc/zshrc to include some Nix configuration
 - create a Nix volume and a LaunchDaemon to mount it
 - create a LaunchDaemon (at /Library/LaunchDaemons/org.nixos.nix-daemon.plist) for nix-daemon

Ready to continue?
[y/n] y


---- let's talk about sudo -----------------------------------------------------
This script is going to call sudo a lot. Every time I do, it'll
output exactly what it'll do, and why.

Just like this:

---- sudo execution ------------------------------------------------------------
I am executing:

    $ sudo echo

to demonstrate how our sudo prompts look


This might look scary, but everything can be undone by running just a
few commands. I used to ask you to confirm each time sudo ran, but it
was too many times. Instead, I'll just ask you this one time:

Can I use sudo?
[y/n] y

Yay! Thanks! Let's get going!

~~> Fixing any leftover Nix volume state
Before I try to install, I'll check for any existing Nix volume config
and ask for your permission to remove it (so that the installer can
start fresh). I'll also ask for permission to fix any issues I spot.

~~> Checking for artifacts of previous installs
Before I try to install, I'll check for signs Nix already is or has
been installed on this system.

---- Nix config report ---------------------------------------------------------
        Temp Dir:       /var/folders/q_/2q7xz7v50bz47p00grqxlsmr0000gn/T/tmp.aFKVh3H9lq
        Nix Root:       /nix
     Build Users:       32
  Build Group ID:       30000
Build Group Name:       nixbld

build users:
    Username:   UID
     _nixbld1:  301
     _nixbld2:  302
     _nixbld3:  303
     _nixbld4:  304
     _nixbld5:  305
     _nixbld6:  306
     _nixbld7:  307
     _nixbld8:  308
     _nixbld9:  309
     _nixbld10: 310
     _nixbld11: 311
     _nixbld12: 312
     _nixbld13: 313
     _nixbld14: 314
     _nixbld15: 315
     _nixbld16: 316
     _nixbld17: 317
     _nixbld18: 318
     _nixbld19: 319
     _nixbld20: 320
     _nixbld21: 321
     _nixbld22: 322
     _nixbld23: 323
     _nixbld24: 324
     _nixbld25: 325
     _nixbld26: 326
     _nixbld27: 327
     _nixbld28: 328
     _nixbld29: 329
     _nixbld30: 330
     _nixbld31: 331
     _nixbld32: 332

Ready to continue?
[y/n] y


---- Preparing a Nix volume ----------------------------------------------------
    Nix traditionally stores its data in the root directory /nix, but
    macOS now (starting in 10.15 Catalina) has a read-only root directory.
    To support Nix, I will create a volume and configure macOS to mount it
    at /nix.

~~> Configuring /etc/synthetic.conf to make a mount-point at /nix

<~snip~>

Alright! We're done!
Try it! Open a new terminal, and type:

  $ nix-shell -p nix-info --run "nix-info -m"

Thank you for using this installer. If you have any feedback or need
help, don't hesitate:

You can open an issue at
https://github.com/NixOS/nix/issues/new?labels=installer&template=installer.md

Or get in touch with the community: https://nixos.org/community

---- Reminders -----------------------------------------------------------------
[ 1 ]
Nix won't work in active shell sessions until you restart them.

You have new mail in /var/mail/colton
```

As prompted by the installation, let's run the `nix-info` command in a `nix-shell` At 

```sh
$ nix-shell -p nix-info --run "nix-info -m"
 - system: `"aarch64-darwin"`
 - host os: `Darwin 23.3.0, macOS 14.3`
 - multi-user?: `yes`
 - sandbox: `no`
 - version: `nix-env (Nix) 2.22.1`
 - channels(root): `"nixpkgs"`
 - nixpkgs: `/nix/var/nix/profiles/per-user/root/channels/nixpkgs`
```

At this point, I'm not familiar with what a `nix-shell` is, but the man page states:


> nix-shell - start an interactive shell based on a Nix expression

And the `-p` flag sets up an environment with the specified packages present -- in this case the `nix-info` package.

---

Now that we having a working installation of Nix in our environment, let's return to the `nix-darwin` documentation and continue where we left off.

In the _Flakes_ section of the README, there is a set of instructions for getting started from scratch. First, we create a configuration directory:

```sh
mkdir ~/.config/nix-darwin && cd ~/.config/nix-darwin
```

Then it suggests we run the `nix flake init` command with a template.

```sh
nix flake init --template nix-darwin
```

This resulted in the following error:

```sh
$ nix flake init --template nix-darwin
error: experimental Nix feature 'nix-command' is disabled; add '--extra-experimental-features nix-command' to enable it
```

After adding that flag, it resulted in _another_ error:

```sh
$ nix flake init --template nix-darwin --extra-experimental-features nix-command
error: experimental Nix feature 'flakes' is disabled; add '--extra-experimental-features flakes' to enable it
```

But after adding both features, it wrote a _flake.nix_ file.


```sh
$ nix flake init \
    --template nix-darwin \
    --extra-experimental-features nix-command \
    --extra-experimental-features flakes
wrote: /Users/colton/.config/nix-darwin/flake.nix
```

Of which the contents can be seen here:

```txt
{
  description = "Example Darwin system flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nix-darwin.url = "github:LnL7/nix-darwin";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ self, nix-darwin, nixpkgs }:
  let
    configuration = { pkgs, ... }: {
      # List packages installed in system profile. To search by name, run:
      # $ nix-env -qaP | grep wget
      environment.systemPackages =
        [ pkgs.vim
        ];

      # Auto upgrade nix package and the daemon service.
      services.nix-daemon.enable = true;
      # nix.package = pkgs.nix;

      # Necessary for using flakes on this system.
      nix.settings.experimental-features = "nix-command flakes";

      # Create /etc/zshrc that loads the nix-darwin environment.
      programs.zsh.enable = true;  # default shell on catalina
      # programs.fish.enable = true;

      # Set Git commit hash for darwin-version.
      system.configurationRevision = self.rev or self.dirtyRev or null;

      # Used for backwards compatibility, please read the changelog before changing.
      # $ darwin-rebuild changelog
      system.stateVersion = 4;

      # The platform the configuration will be used on.
      nixpkgs.hostPlatform = "x86_64-darwin";
    };
  in
  {
    # Build darwin flake using:
    # $ darwin-rebuild build --flake .#simple
    darwinConfigurations."simple" = nix-darwin.lib.darwinSystem {
      modules = [ configuration ];
    };

    # Expose the package set, including overlays, for convenience.
    darwinPackages = self.darwinConfigurations."simple".pkgs;
  };
}
```

The instructions suggest to replace occurrences of _simple_ with my host name, but, I'm going to skip that step for the time being.

```sh
# skipped recommended replacement
sed -i '' "s/simple/$(scutil --get LocalHostName)/" flake.nix
```

It also recommends updating the `nixpkgs.hostPlatform` to `aarch64-darwin` if my machine runs on Apple Silicon -- that suggestion I _will_ perform.

```sh
sed -i '' "s/x86_64-darwin/aarch64-darwin/" flake.nix
```

With the `flake.nix` file created, let's install `nix-darwin`!

```sh
$ nix run nix-darwin -- switch --flake ~/.config/nix-darwin
error: experimental Nix feature 'nix-command' is disabled; add '--extra-experimental-features nix-command' to enable it
```

Once again I ran into the _experimental features_ error. Let's see how that setting can be made permanent...

It looks like there's an answer on one of the `nix-darwin` GitHub issues that states that the initial flake installation will make these settings permanent, but the flags are required for the first flake install.

https://github.com/LnL7/nix-darwin/issues/740#issuecomment-1718313148


```sh
$ nix \
    --extra-experimental-features 'nix-command flakes' \
    run nix-darwin -- switch --flake ~/.config/nix-darwin
warning: creating lock file '/Users/colton/.config/nix-darwin/flake.lock':
• Added input 'nix-darwin':
    'github:LnL7/nix-darwin/c0d5b8c54d6828516c97f6be9f2d00c63a363df4?narHash=sha256-vo5k2wQekfeoq/2aleQkBN41dQiQHNTniZeVONWiWLs%3D' (2024-05-29)
• Added input 'nix-darwin/nixpkgs':
    follows 'nixpkgs'
• Added input 'nixpkgs':
    'github:NixOS/nixpkgs/31f40991012489e858517ec20102f033e4653afb?narHash=sha256-HlvsMH8BNgdmQCwbBDmWp5/DfkEQYhXZHagJQCgbJU0%3D' (2024-06-06)
building the system configuration...
error: flake 'path:/Users/colton/.config/nix-darwin?lastModified=1717817588&narHash=sha256-2yAlnXcUYtEVW2w0tf%2BBIxh9xUt9tEdpnQZmf63GRV0%3D' does not provide attribute 'packages.aarch64-darwin.darwinConfigurations.mini.system', 'legacyPackages.aarch64-darwin.darwinConfigurations.mini.system' or 'darwinConfigurations.mini.system'
```
