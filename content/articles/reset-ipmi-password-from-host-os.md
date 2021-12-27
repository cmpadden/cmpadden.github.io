---
title: 'Reset IPMI Credentials from the Host OS'
date: '2021-12-27'
tags: ['homelab', 'supermicro', 'truenas']
categories: ['homelab']
---

If you ever find yourself locked out of the Intelligent Platform Management Interface (IPMI) of a server, these
instructions will guide your through the process of resetting the credentials to their default values from the host
operating system.

<!--more-->

If you are using an operating system like TrueNAS -- good news! It's possible to reset the IPMI password directly from
the web interface. This is done by navigating to `Network > IPMI`, and simply entering a new value in the _IPMI
Password Reset_ field.

If you are using some other OS that doesn't have this feature, you can achieve similar results by using the `ipmitool`
command-line utility.

First, you'll want to determine the user ID associated with the user for whom you'd like to reset the password.

```
# ipmitool user list
ID  Name             Callin  Link Auth  IPMI Msg   Channel Priv Limit
1                    true    false      false      Unknown (0x00)
2   ADMIN            true    false      false      Unknown (0x00)
```

In this case, we will be resetting the password for _ADMIN_ who has a user ID of _2_. Then we'll assign the new
password like so:

```
# ipmitool user set password 2 <password>
```

And you should be good to go!

...

Alternatively, if you'd like to factory reset the baseboard management controller (BMC), which will reset the IPMI
credentials to their default value, you can issue the following command.

```
# ipmitool raw 0x3c 0x40
```

Where `0x3c` is the `<netfn>` argument, a.k.a. the network function code that defines the functional routing for
messages, and `0x40` is the `<cmd>`. According to section 5.1 of the _[IPMI interface
specification](https://www.intel.com/content/dam/www/public/us/en/documents/product-briefs/ipmi-second-gen-interface-spec-v2-rev1-1.pdf),
_netfn_ codes ranging from 0x30 to 0x3F are reserved for vendor specific functions. I searched around for some
Supermicro references on these vendor specific network functions without much luck other than various [support
responses](https://www.supermicro.com/support/faqs/faq.cfm?faq=15448) on how to reset a device. Bummer!
