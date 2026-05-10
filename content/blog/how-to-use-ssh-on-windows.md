---
title: How to Use SSH on Windows — A 2026 Guide
description: Use SSH on Windows in 2026 — built-in OpenSSH client, PowerShell, WSL, and GUI Windows SSH clients. Step-by-step setup with examples.
date: 2026-05-10
author: Termio Team
tags: [Windows, SSH, OpenSSH, WSL, PowerShell]
---

If you have ever wondered how to use SSH on Windows, the short answer in 2026 is: you have more options than ever. Modern Windows ships with a built-in OpenSSH client. WSL gives you the full Linux SSH stack. And a modern GUI Windows SSH client like Termio can sit on top of all of that.

This guide walks through the full picture — when to use each option, how to set them up, and how to stop juggling tools when SSH is part of a real Windows workflow.

## Does Windows have a built-in SSH client?

Yes. Since the Windows 10 1809 update (October 2018), Microsoft ships **OpenSSH** as a Windows Optional Feature. Windows 11 includes it out of the box. That means `ssh user@host` works directly from PowerShell or Command Prompt with no third-party install required.

To check whether SSH is already enabled in Windows, open PowerShell and run:

```
ssh -V
```

You should see something like `OpenSSH_for_Windows_9.x`. If the command is not recognized, the Optional Feature is not installed yet.

To enable SSH on Windows from PowerShell (run as Administrator):

```
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Or through the GUI: **Settings → Apps → Optional features → Add a feature → OpenSSH Client**.

## How to use SSH on Windows from PowerShell

Once the OpenSSH client is installed, basic SSH on Windows works exactly like SSH on Linux or macOS.

```
ssh user@server.example.com
ssh -p 2222 user@server.example.com
ssh -i C:\Users\you\.ssh\id_ed25519 user@server.example.com
```

The first time you connect to a host, OpenSSH asks you to accept its host key fingerprint. Future connections check it automatically.

For repeated connections to many hosts, edit `C:\Users\you\.ssh\config`:

```
Host prod
  HostName prod.example.com
  User deploy
  IdentityFile ~/.ssh/id_ed25519
  Port 22

Host staging
  HostName staging.example.com
  User deploy
  IdentityFile ~/.ssh/id_ed25519
```

Then `ssh prod` and `ssh staging` just work. This is the same `~/.ssh/config` syntax as Linux and macOS — the Windows OpenSSH client honors it identically.

## Generating SSH keys on Windows

Password SSH still works, but key authentication is faster, safer, and the default for any production setup. To generate an SSH key on Windows, use `ssh-keygen` from PowerShell:

```
ssh-keygen -t ed25519 -C "you@example.com"
```

Press Enter to accept the default path (`C:\Users\you\.ssh\id_ed25519`) and optionally set a passphrase. The public key is in `id_ed25519.pub` — copy that to `~/.ssh/authorized_keys` on the remote host.

To copy the key to a remote Linux server in one command (works in PowerShell with newer OpenSSH builds):

```
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## Using ssh-agent on Windows

`ssh-agent` keeps your decrypted private keys in memory so you do not have to type the passphrase every time. Windows ships with a Windows Service for ssh-agent — enable and start it from an elevated PowerShell:

```
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

After this, `ssh prod` connects without prompting for the passphrase.

## Using SSH from WSL on Windows

If you have **Windows Subsystem for Linux** installed, every WSL distribution ships with the full Linux openssh-client. Inside WSL, `ssh`, `scp`, `rsync`, `ssh-keygen`, and `ssh-agent` work exactly as they do on a real Linux machine.

A common question is whether to use the Windows OpenSSH client or the WSL one. Practical answer:

- **Use the Windows OpenSSH client** for sessions started from PowerShell, Windows Terminal, VS Code, or Windows GUI tools.
- **Use the WSL SSH client** when you are already inside a WSL shell — for example, running deploy scripts from a WSL Ubuntu prompt.
- **Share keys between them** by symlinking `~/.ssh` in WSL to `/mnt/c/Users/you/.ssh`, or by copying keys once and keeping them in sync.

## When the built-in CLI is not enough

The built-in OpenSSH client on Windows is great for one-off connections. It struggles when:

- You manage **dozens of hosts** and editing `~/.ssh/config` becomes tedious.
- You want **split panes** for SSH, WSL, and PowerShell side by side without managing tabs across multiple Windows Terminal windows.
- You need a real **connection manager** with folders, tags, and per-connection scripts.
- You want **credential storage** beyond ssh-agent — passwords or per-connection notes that survive reboots and integrate with Windows Credential Manager.
- You collaborate with a team and need to share host lists without giving everyone access to a cloud account.

That is where a GUI Windows SSH client adds real value.

## GUI Windows SSH clients in 2026

The big options:

- **PuTTY** — the classic. Lightweight, free, but feels dated. No split panes, no modern session organizer, no native Windows Credential Manager integration.
- **MobaXterm** — bundles X server, SFTP, and an SSH client. The free Home Edition is limited to 12 saved sessions; serious use needs the paid Pro tier.
- **Bitvise SSH Client** — solid, free for personal use, but Windows-only and feels enterprise-shaped.
- **Windows Terminal + OpenSSH** — Microsoft's official terminal hosting the built-in OpenSSH client. No SSH connection manager.
- **Termio** — a free, local-first **Windows SSH client** with split panes, an SSH connection manager, WSL and PowerShell integration, AI copilot, and Windows Credential Manager support. No account required.

For a deeper comparison, see [PuTTY alternatives for Windows in 2026](/blog/putty-alternatives-for-windows-2026/).

## A practical SSH-on-Windows setup that actually works

A reliable Windows SSH workflow looks something like this:

1. Use the **built-in OpenSSH client** for `~/.ssh/config`, key generation, and `ssh-agent`.
2. Install **WSL** for any Linux-native tooling (Ansible, Terraform, kubectl, scripts).
3. Install **Termio** as the GUI SSH client for Windows, so you have a connection manager, split panes, and credential storage on top of the OpenSSH foundation.
4. Store workspace structure in **Git** — connections, folders, scripts — while credentials stay in Windows Credential Manager per user.
5. Use **key-based authentication** everywhere, with a passphrase + ssh-agent for unattended convenience.

This gets you the speed of the CLI, the power of WSL, and the ergonomics of a GUI Windows SSH client without locking yourself into a proprietary cloud sync.

## Common questions about using SSH on Windows

**Is SSH built into Windows 11?**
Yes. Windows 11 ships with OpenSSH installed by default — you can run `ssh user@host` from PowerShell immediately.

**Can I use SSH on Windows 7 or Windows 8?**
Officially no — those versions do not ship with OpenSSH. You can install a third-party SSH client like PuTTY or Bitvise. Better: upgrade to Windows 10 or Windows 11 if you can.

**Does the Windows OpenSSH client support SSH config files?**
Yes. It reads `~/.ssh/config` (which on Windows lives at `C:\Users\you\.ssh\config`) with the same syntax as Linux and macOS.

**Can I SSH from Windows to another Windows machine?**
Yes — install OpenSSH Server on the target Windows host, open port 22 in Windows Defender Firewall, and connect normally. See our guide on [how to SSH to a Windows machine](/blog/how-to-ssh-to-a-windows-machine/).

**Where does SSH store known_hosts on Windows?**
At `C:\Users\you\.ssh\known_hosts`. The same place keys live.

## Final take

SSH on Windows in 2026 is no longer a second-class experience. The built-in OpenSSH client covers most everyday needs. WSL gives you the full Linux SSH ecosystem. And a modern Windows SSH client like [Termio](/ssh-client-for-windows/) ties it all together with a connection manager, split panes, and Windows Credential Manager — for free, with no account, no cloud sync, and no usage limits.

Pick the layer that matches your workflow and stop juggling tools.
