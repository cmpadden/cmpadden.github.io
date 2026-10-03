---
title: "Migrate to TrueNAS Scale from TrueNAS Core"
date: "2021-12-28"
tags: ["homelab", "supermicro", "truenas"]
categories: ["homelab"]
---

TrueNAS Scale offers a variety of interesting features that are not supported in its TrueNAS Core counterpart. Most notably, because the base operating system is Debian Linux, opposed to FreeBSD, there is native support for Linux containers via Docker, and Kubernetes Pods! This post walks through the steps required to upgrade from TrueNAS Core to TrueNAS Scale.

<!--more-->

Thankfully, the upgrade procedure to migrate from TrueNAS Core to TrueNAS Scale is relatively straight forward. All it requires is to create a bootable USB of the TrueNAS Scale image, boot the USB, and select _Install/Upgrade_ in the installation wizard. But for the sake of being thorough, you can find instructions on how to backup system configurations and install the OS below.

1. Make a backup of your system’s configuration
   1. Navigate to `System > General`
   2. Click `Save Config`, check the _Export Secret Seed_ box, and click `Save`
2. Export dataset keys for the encrypted pools
   1. Navigate to `Storage > Pools`
   2. Click the cog icon, and select `Export Dataset Keys`
3. Insert the TrueNAS Core bootable USB into the NAS
4. From the Supermicro IPMI interface select _Remote Control_ and _iKVM/HTML5_ and select _Reboot_
5. Select the bootable USB as the boot device
6. From the TrueNAS installation wizard, select _Install/Upgrade_, select the drive that contains the TrueNAS installation, and select _Upgrade Install_

Reboot the device, and voila — you should be up-and-running! Give the system a quick rundown to validate that your settings and pools have transferred correctly, and then enjoy all the container goodness!

For a breakdown of the differences between TrueNAS Core, Enterprise, and Scale, you can reference [this table](https://www.truenas.com/help-me-choose/).
