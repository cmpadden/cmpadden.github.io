---
title: 'Upgrading the Firmware on the PCEngines APU2'
date: '2019-12-21'
draft: false
tags: ['pcengine', 'apu']
categories: ['linux']
---

I've had a [PCEngines APU2](https://pcengines.ch/apu2.htm) gathering dust for a
few years, and have recently decided to dust it off.

Since the last time the device has been powered on, there have been many great
improvements to the firmware, and it was very-much due for an upgrade. The
following steps outline how the firmware was upgraded on the APU from the
already-installed operating system -- CentOS.

<!--more-->

First, we will connect to the device over the serial port

```
screen /dev/tty.usbserial 115200
```

Then, we will install the `flashrom` utility that is needed to update the
firmware. Because it is not available in the default `yum` repositories, we
will enable the _Extra Packages for Enterprise Linux_ (EPEL) repository before
installation.

```bash
sudo yum install epel-release
sudo yum install flashrom
```

Next, we will download the latest version of the firmware that is compatible
with the APU2 device from the PC Engines release website:
<https://pcengines.github.io/>.

```bash
curl -O https://3mdeb.com/open-source-firmware/pcengines/apu2/apu2_v4.11.0.1.rom
```

And finally, we will flash the firmware...

```bash
sudo flashrom -w apu2_v4.11.0.1.rom -p internal:boardmismatch=force
```

**References:**

- <https://pcengines.ch/apu2.htm>
- <https://pcengines.github.io/>
- <https://github.com/pcengines/apu2-documentation/blob/master/docs/firmware_flashing.md>
- <https://github.com/pcengines/apu2-documentation/blob/master/docs/cold_reset.md>
- <https://github.com/elad/openbsd-apu2>
