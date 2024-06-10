---
title: 'Configuring a YubiKey for use with OpenSSH'
draft: false
date: "2024-06-09"
tags: ["unix", "configurations"]
categories: ["tooling", "tips"]
---

[YubiKey's](https://www.yubico.com/) are a convenient way to introduce a physical form of two factor authentication into ones workflow. They support a variety of protocols, but in this guide we will walk through how to configure a YubiKey for use with OpenSSH via the "new" `ed25519-sk` key type that supports FIDO compliant hardware keys.

<!--more-->

In [release 8.2 of OpenSSH](https://www.openssh.com/txt/release-8.2) support for FIDO devices was added with public key types "ecdsa-sk" and "ed25519-sk" (-sk standing for "security key"). This key type is supported by YubiKey's with firmware version 5.2.3 or higher.

> This release adds support for FIDO/U2F hardware authenticators to OpenSSH. U2F/FIDO are open standards for inexpensive two-factor authentication hardware that are widely used for website authentication.  In OpenSSH FIDO devices are supported by new public key types "ecdsa-sk" and "ed25519-sk", along with corresponding certificate types.

Let's get started by installing the latest version of OpenSSH via [Homebrew](https://brew.sh/), along with the YubiKey Manager (ykman) CLI. The version of OpenSSH included with macOS is not compatible.

```sh
$ brew install openssh ykman
```

Then, let's confirm that our YubiKey has a firmware that is greater than 5.2.3:

```sh
$ ykman list
YubiKey 5Ci (5.4.3) [OTP+FIDO+CCID]
```

Next, we'll go ahead and enable a pin on our device via the `change-pin` command, as this a requirement for our use.

```sh
$ ykman fido access change-pin
```

And last, we'll generate the key on our device!

```sh
$ ssh-keygen -t ed25519-sk -O resident
Generating public/private ed25519-sk key pair.
You may need to touch your authenticator to authorize key generation.
...
```

We specify _resident_ to indicate that the key handle is to be stored on the YubiKey itself, since we will be using this device with multiple computers.

```txt
resident
        Indicate that the key handle should be stored on the FIDO
        authenticator itself.  This makes it easier to use the
        authenticator on multiple computers.  Resident keys may be
        supported on FIDO2 authenticators and typically require that a PIN
        be set on the authenticator prior to generation.  Resident keys
        may be loaded off the authenticator using ssh-add(1).  Storing
        both parts of a key on a FIDO authenticator increases the
        likelihood of an attacker being able to use a stolen authenticator
        device.
```

And that's all it takes -- simple enough. Now, when interacting with _ssh_ or _git_ you will be prompted to touch the YubiKey to bring that little bit of physical 2FA.
