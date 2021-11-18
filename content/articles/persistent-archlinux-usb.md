---
title: "Create a Persistent Arch Linux Bootable USB with Vagrant"
date: '2020-01-09'
draft: false
tags: ["vagrant", "archlinux"]
categories: ["linux"]
---

When installing a linux distribution, it is common for the instructions to have
the user create a bootable USB, boot from the device, and proceed with the
installation procedure from that live medium. However, this blog post will
outline an alternative approach where a virtual machine created with Vagrant
will be used in favor of the live medium.

<!--more-->

# Preface

The original intention was to use Docker for this process -- leveraging the
`--device` flag and mounting the target USB device in the Docker container,
but the underlying hypervisor in Docker Desktop for Mac does not support this.
<sup>[1][1] [2][2] [3][3]</sup> While there are workarounds using Docker
Machine, Vagrant felt like the path of least resistance.

# Instructions

## Create an Arch Linux Virtual Machine with Vagrant

Get the latest Arch Linux image <sup>[4][4]</sup> from the Vagrant Cloud Box
Catalog.

```bash
vagrant box add archlinux/archlinux
```

Determine the USB vendor information for the thumb-drive that we will
pass-through to the virtual machine. Using the `VBoxManage` utility that comes
with Virtual Box, list the devices, and make note of the Vendor and Product ID.

```bash
 VBoxManage list usbhost
```

Create a `Vagrantfile` with `archlinx/archlinux` as the target box, and the USB
device information that is passed through. <sup>[5][5] [6][6]</sup> Vagrant
offers a handy customization parameter `vb.customize` that calls the
`VBoxManage` command under-the-hood, allowing one to enable the guest machine
to access the host machine's USB devices.

```txt
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "archlinux/archlinux"
  config.vm.provider "virtualbox" do |vb|
    vb.name = "archlinux"
    vb.customize ['modifyvm', :id, '--usb', 'on']
    vb.customize ['usbfilter', 'add', '1', '--target', :id, '--name', 'SanDisk Ultra Fit', '--vendorid', '0x0781', '--productid', '0x5583']
  end
end
```

When virtual machine is brought up, the `usbfilter` is applied, and the guest
is able to access to the host machine's USB device that was specified in the
filter.

Start the machine, `ssh` into the guest, and list the devices to confirm that
the USB device is available (see: `/dev/sdb`).

```bash
$ vagrant up
$ vagrant ssh
[vagrant@archlinux ~]$ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk
├─sda1   8:1    0  1.9G  0 part [SWAP]
└─sda2   8:2    0 18.1G  0 part /
sdb      8:16   1 28.7G  0 disk
└─sdb1   8:17   1    8G  0 part
```

## Install Arch Linux on the USB Drive

The [Arch Linux Installation Guide][9] outlines the installation procedure in
great detail -- the following steps follow this closely with a few alteration
due to installing onto removable media.

### Partition the Disk (UEFI with GPT)

```bash
[root@archlinux ~]# fdisk /dev/sdb
```

```txt
Command (m for help): p
Disk /dev/sdb: 28.66 GiB, 30752636928 bytes, 60063744 sectors
Disk model: Ultra Fit
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: E1D6C445-1B79-AB4D-A442-FA4AD6DF4ECC

Device       Start      End  Sectors  Size Type
/dev/sdb1     2048  1050623  1048576  512M EFI System
/dev/sdb2  1050624 60063710 59013087 28.1G Linux filesystem

Filesystem/RAID signature on partition 1 will be wiped.
```

### Format the Partitions

The UEFI specification mandates support for FAT file-systems, and FAT32 is
recommended for removable media. <sup>[7][7]</sup>


```bash
[root@archlinux ~]# pacman -Sy dosfstools
[root@archlinux ~]# mkfs.fat -F32 /dev/sdb1
```

As for the root partition, it is recommended to use `ext4` without a journal to
reduce the reads and writes to the file-system as this is detrimental to the
flash-based USB drive. <sup>[8][8]</sup>

```bash
[root@archlinux ~]# mkfs.ext4 -O "^has_journal" /dev/sdb2
```

### Mount the Partitions and Bootstrap the Environment

```bash
[root@archlinux ~]# mount /dev/sdb2 /mnt
[root@archlinux ~]# mkdir -p /mnt/boot/efi
[root@archlinux ~]# mount /dev/sdb1 /mnt/boot/efi
```

```bash
[root@archlinux ~]# pacman -S arch-install-scripts
[root@archlinux ~]# pacstrap /mnt base linux linux-firmware
[root@archlinux ~]# genfstab -U /mnt >> /mnt/etc/fstab
```

### Configure the New Environment

```
[root@archlinux ~]# arch-chroot /mnt
```

```
[root@archlinux /]# ln -sf /usr/share/zoneinfo/US/Eastern /etc/localtime
[root@archlinux /]# hwclock --systohc
[root@archlinux /]# sed -i 's/#en_US.UTF-8/en_US.UTF-8/' /etc/locale.gen
[root@archlinux /]# locale-gen
[root@archlinux /]# echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

```
[root@archlinux /]# hostnamectl set-hostname usb
[root@archlinux /]# echo "127.0.0.1        localhost" >> /etc/hosts
[root@archlinux /]# echo "::1              localhost" >> /etc/hosts
```

Note, one difference here from a standard installation is that the
`--removable` flag is specified when installing the GRUB bootloader.
<sup>[10][10]</sup>

```
[root@archlinux /]# pacman -S grub
[root@archlinux /]# grub-install --target=x86_64-efi --efi-directory=/boot/efi  --removable --recheck
[root@usb /]# grub-mkconfig -o /boot/grub/grub.cfg
```

Shutdown the virtual machine, restart the host machine, and boot the newly
created Arch Linux thumb-drive!

:tada:

## Side-note

It was attempted to use the `controlvm usbattach` command to pass the USB
device to the guest machine, but this did not work as it expects the virtual
machine to already be running, and the `vb.customize` option runs prior to
booting the machine. <sup>[11][11]</sup>

```txt
Command: ["controlvm", "060a716b-1965-49e2-bc56-12beed5df716", "usbattach36fc9e60-c465-11cf-8056-444553540000"]

Stderr: VBoxManage.exe: error: Machine '060a716b-1965-49e2-bc56-12beed5df716' is not currently running.
```

## References

1. [Docker Desktop on Mac vs. Docker Toolbox][1]
1. [GitHub - HyperKit][2]
1. [GitHub - Docker for Mac - Issue #900][3]
1. [Vagrant Cloud - Arch Linux][4]
1. [Attaching USB Devices to VirtualBox Guests using VBoxManage][5]
1. [GitHub Gist - Vagrant USB Filter][6]
1. [Arch Linux Wiki - EFI System Partition - Format Partitions][7]
1. [Arch Linux Wiki - Arch Linux on USB - Installation Tweaks][8]
1. [Arch Linux Wiki - Installation Guide][9]
1. [Arch Linux Wiki - GRUB - UEFI Systems][10]
1. [Vagrant VBoxManage Customizations ][11]

[1]: https://docs.docker.com/docker-for-mac/docker-toolbox/
[2]: https://github.com/moby/hyperkit
[3]: https://github.com/docker/for-mac/issues/900
[4]: https://app.vagrantup.com/archlinux/boxes/archlinux
[5]: https://antonyjepson.wordpress.com/2012/01/26/quickly-attaching-usb-devices-to-virtualbox-guests-using-vboxmanage/
[6]: https://gist.github.com/dscape/7d829c0c116ef419f963
[7]: https://wiki.archlinux.org/index.php/EFI_system_partition#Format_the_partition
[8]: https://wiki.archlinux.org/index.php/Install_Arch_Linux_on_a_USB_key#Installation_tweaks
[9]: https://wiki.archlinux.org/index.php/Installation_guide
[10]: https://wiki.archlinux.org/index.php/GRUB#UEFI_systems
[11]: https://www.vagrantup.com/docs/virtualbox/configuration.html#vboxmanage-customizations
