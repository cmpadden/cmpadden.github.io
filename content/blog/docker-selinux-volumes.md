---
title: "Docker Volume Permissions with SELinux"
date: '2019-12-26'
draft: false
tags: ["docker", "selinux"]
categories: ["linux"]
---

Unfamiliar with running Docker on a SELinux enabled system, I found myself
running into a bunch of file permission errors while creating volumes.

<!--more-->

```txt
mkdir: can't create directory '/data': Permission denied
```

---

```bash
$ docker info --format '{{json .SecurityOptions}}'
[
  "name=seccomp,profile=/etc/docker/seccomp.json",
  "name=selinux"
]
```

It turns out that this can be resolved by appending the `:z` flag to the volume
mappings in the `docker-compose.yml` file, indicating that the volume content
is shared.

```
services:
  server:
    volumes:
      - ./data:/data:z
```

From the Docker documentation:

> The `z` option tells Docker that two containers share the volume content. As
> a result, Docker labels the content with a shared content label. Shared
> volume labels allow all containers to read/write content.

**References**

- [Docker Docs: Docker Info][1]
- [Docker Docs: Mounting Volumes][2]

[1]: https://docs.docker.com/engine/reference/commandline/info/
[2]: https://docs.docker.com/engine/reference/commandline/run/#mount-volumes-from-container---volumes-from
