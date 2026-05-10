---
title: How to SSH to a Windows Machine — OpenSSH Server Setup
description: Set up OpenSSH Server on Windows 10 or Windows 11 and SSH from Windows to Windows or from Linux. Step-by-step with firewall, key auth, and PowerShell as default shell.
date: 2026-05-10
author: Termio Team
tags: [Windows, SSH, OpenSSH, Server]
---

You can absolutely SSH **to** a Windows machine — not just from one. Since Windows 10 1809, Microsoft has shipped **OpenSSH Server** as a Windows Optional Feature, which means any Windows 10 or Windows 11 machine can act as an SSH host with a few minutes of setup.

This guide covers how to enable SSH on Windows as a server, how to SSH from Windows to Windows, how to connect from Linux or macOS, and the gotchas that catch people in real environments.

## Why SSH to a Windows machine?

Common reasons:

- **Remote administration** of a Windows server or workstation without RDP.
- **Running scripts** from a CI runner or automation host onto a Windows target.
- **Tunneling and port forwarding** through a Windows machine on a private network.
- **File transfer** with SCP or SFTP between Windows and Linux hosts.
- **Mixed Windows + Linux teams** standardizing on SSH for everything.

If you only need an interactive desktop, RDP is still the right tool. For automation, scripted workflows, and command-line operations, SSH wins.

## Step 1 — Install OpenSSH Server on Windows

OpenSSH Server is built into Windows 10 (1809+) and Windows 11, but it is not installed by default.

**Option A — From PowerShell (run as Administrator):**

```
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Confirm it installed:

```
Get-WindowsCapability -Online -Name OpenSSH.Server*
```

**Option B — From the GUI:**

Open **Settings → Apps → Optional features → Add a feature**, search for *OpenSSH Server*, and install.

## Step 2 — Start the SSH service and enable autostart

By default the service is installed but not running. Start it and configure it to launch on boot:

```
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic
```

Verify it is listening:

```
Get-Service sshd
```

Status should be `Running`. By default sshd listens on TCP port 22.

## Step 3 — Open the firewall

Windows Setup creates a firewall rule named `OpenSSH-Server-In-TCP` automatically. Confirm it is enabled:

```
Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" | Format-List Name, DisplayName, Enabled, Profile
```

If it is missing or disabled, add it explicitly:

```
New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server (sshd)" `
  -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

If the Windows machine is on a corporate network, you may also need to allow SSH on the **Domain** profile, not just **Private**.

## Step 4 — Pick a default shell (PowerShell vs cmd)

When a client connects, sshd opens the default shell. Out of the box that is `cmd.exe`, which is rarely what you want in 2026. Switch the default to PowerShell:

```
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell `
  -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" `
  -PropertyType String -Force
```

Restart sshd to apply:

```
Restart-Service sshd
```

If you prefer **PowerShell 7**, point `DefaultShell` at `C:\Program Files\PowerShell\7\pwsh.exe` instead.

## Step 5 — Set up key-based authentication

Password SSH works, but key-based auth is faster and safer. On the **client** machine (Linux, macOS, or another Windows), generate a key if you do not have one:

```
ssh-keygen -t ed25519 -C "you@example.com"
```

Then copy the public key to the Windows server. Where it goes depends on the user account:

- **Regular user**: `C:\Users\<username>\.ssh\authorized_keys`
- **Administrator user**: `C:\ProgramData\ssh\administrators_authorized_keys`

The administrator path is intentional — Windows treats admin SSH access as elevated and stores the key in a system-wide file with stricter ACLs.

The fastest way from a Linux or macOS client:

```
ssh-copy-id you@windows-host
```

From a Windows client, since `ssh-copy-id` is not bundled, you can do it manually with PowerShell:

```
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | `
  ssh you@windows-host "powershell -Command 'Add-Content -Path C:\Users\you\.ssh\authorized_keys -Value $input'"
```

For an **administrator account**, fix permissions on `administrators_authorized_keys`. From an elevated PowerShell on the server:

```
icacls.exe "C:\ProgramData\ssh\administrators_authorized_keys" /inheritance:r `
  /grant "Administrators:F" /grant "SYSTEM:F"
```

If permissions are too loose, sshd silently refuses key auth — this is the single most common reason key auth "doesn't work" on Windows.

## Step 6 — Connect from Windows to Windows

From your client Windows machine, simply:

```
ssh you@windows-host
```

That works regardless of whether the client is Windows 10, Windows 11, or running from PowerShell, Command Prompt, or a GUI Windows SSH client like [Termio](/ssh-client-for-windows/).

A typical `~/.ssh/config` entry:

```
Host fileserver
  HostName fileserver.lan
  User admin
  IdentityFile ~/.ssh/id_ed25519
```

Then `ssh fileserver` and you land in PowerShell on the remote Windows host.

## Step 7 — Connect from Linux or macOS

Identical to any other SSH host:

```
ssh you@windows-host
```

If you need SCP or SFTP, both work as long as `OpenSSH-Server` is the only listener on port 22:

```
scp report.csv you@windows-host:C:/Users/you/Documents/
sftp you@windows-host
```

For SFTP file paths, use forward slashes or escaped backslashes. Windows OpenSSH translates them correctly.

## Step 8 — Harden the SSH configuration

The default `sshd_config` on Windows lives at `C:\ProgramData\ssh\sshd_config`. Sensible hardening:

```
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
LoginGraceTime 30
ClientAliveInterval 60
ClientAliveCountMax 3
```

After editing, restart the service:

```
Restart-Service sshd
```

If you change the listening port, update the firewall rule and any `~/.ssh/config` entries on clients.

## Common problems and fixes

**`Permission denied (publickey)` even though the key is in place.**
Almost always wrong file permissions on `authorized_keys` (or `administrators_authorized_keys`). Tighten ACLs as shown in Step 5.

**Connection times out.**
Firewall is blocking inbound TCP 22 — check `Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP"` and your network profile (Domain, Private, or Public).

**`ssh: connect to host port 22: Connection refused`.**
The sshd service is not running. Start it: `Start-Service sshd`.

**Connecting drops you into `cmd.exe`.**
You skipped Step 4. Set the `DefaultShell` registry key and restart sshd.

**Path issues with `scp`/`sftp`.**
Use `/` separators in remote paths or escape `\`. `C:/Users/you/file.txt` is the safe form.

**`ssh-agent` not running on the server.**
Optional but recommended:

```
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
```

## SSH from Windows to Windows with a GUI client

Once OpenSSH Server is running on the target Windows machine, any SSH client can connect. If you manage more than one Windows host, a GUI Windows SSH client makes the workflow much faster than re-typing `ssh host` from PowerShell.

[Termio](/ssh-client-for-windows/) is a free, local-first **Windows SSH client** that lets you save Windows-to-Windows connections in folders, group them by environment, store credentials in Windows Credential Manager, and open multiple sessions in split panes. For learning more about the Windows SSH client picture in general, see [How to use SSH on Windows](/blog/how-to-use-ssh-on-windows/).

## Final take

SSH to a Windows machine is a first-class workflow in 2026. Install OpenSSH Server, start the service, fix the firewall, set PowerShell as the default shell, and lock it down with key authentication. After that, SSH from Windows to Windows looks identical to SSH from Linux to Linux — the same `ssh`, `scp`, `sftp`, and `~/.ssh/config` you already know.

Pair the server side with a good Windows SSH client and you have a setup that scales from one machine to a fleet without ever touching RDP.
