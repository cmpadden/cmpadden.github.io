---
title: "Exploring the Digital Ocean `doctl` Utility"
date: "2023-01-01"
tags: ["linux", "digital-ocean"]
categories: ["linux"]
---

I recently had the need to spool up a small ephemeral Linux instance, and wanted to try something new by exploring the Digital Ocean `doctl` command line utility.
This proved to be an _extremely_ easy way to configure, create, connect, and destroy a Linux box, and I foresee myself using this service even more in the future.

<!--more-->

To start things off, I had to install and setup authentication to Digital Ocean. Doing
this on my Mac machine, I opted to use [Homebrew](https://brew.sh/).

```sh
# install `doctl`
brew install doctl

# setup authentication
doctl auth init
```

While the online [documentation](https://docs.digitalocean.com/reference/doctl/reference/compute/droplet/create/) is fantastic, I instead found myself mostly referencing the outputs of `--help`.

```sh
doctl compute droplet create --help
```

I had to find the image name of the version of Ubuntu I wanted to install:

```sh
doctl compute image list --public | grep ubuntu-22

# 118857366    22.04 (LTS) x64    snapshot    Ubuntu    ubuntu-22-04-x64    true    7
# 119383150    22.10 x64          snapshot    Ubuntu    ubuntu-22-10-x64    true    7
```

And also the slug of the compute size:

```sh
doctl compute size list

# Slug                  Description    Memory    VCPUs    Disk    Price Monthly    Price Hourly
# s-1vcpu-512mb-10gb    Basic          512       1        10      4.00             0.005950
# s-1vcpu-1gb           Basic          1024      1        25      6.00             0.008930
# s-1vcpu-1gb-amd       Basic AMD      1024      1        25      7.00             0.010420
# s-1vcpu-1gb-intel     Basic Intel    1024      1        25      7.00             0.010420
# s-1vcpu-2gb           Basic          2048      1        50      12.00            0.017860
# s-1vcpu-2gb-amd       Basic AMD      2048      1        50      14.00            0.020830
```

I've also configured a few SSH keys with Digital Ocean, and I can have the key (specified by ID) provisioned to the machine using the `--ssh-keys` flag.

```sh
doctl compute ssh-key list

# ID      Name    FingerPrint
# 1234    mini    <redacted>
```

Also, I wanted to install a few packages to the box upon creation, this can be done easily with the `--user-data-file` flag to run an initialization script.

```sh
echo 'apt install -y imagemagick zip' > bootstrap.sh
```

Putting it all together, here is the simple command for creating a small compute instance!

```sh
doctl compute droplet create \
    --image ubuntu-22-10-x64 \
    --size s-1vcpu-512mb-10gb \
    --region nyc1 \
    --ssh-keys 1234 \
    --user-data-file boostrap.sh \
    ephemeral
```

Finally, I can connect, do my thing, and destroy the instance.

```sh
doctl compute ssh ephemeral
```

```sh
doctl compute droplet delete --force ephemeral
```

All-in-all, I was up and running in about 20 minutes. What a handy utility!
