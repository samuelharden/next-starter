# Forwards Windows LAN:<port> to the WSL dev server so a phone on the same Wi-Fi can open the site.
# Run elevated. `yarn dev:lan` does that via gsudo.
# Your values live in scripts/lan.config (next to this file).

$ErrorActionPreference = 'Stop'

function Read-LanConfig {
  $path = Join-Path $PSScriptRoot 'lan.config'
  if (-not (Test-Path $path)) {
    throw "Missing $path"
  }

  $config = @{
    LAN_PORT = '3000'
    LAN_HOST = ''
    WSL_DISTRO = ''
  }

  foreach ($line in Get-Content $path) {
    $trimmed = $line.Trim()
    if ($trimmed -eq '' -or $trimmed.StartsWith('#')) { continue }
    $parts = $trimmed.Split('=', 2)
    if ($parts.Count -ne 2) { continue }
    $config[$parts[0].Trim()] = $parts[1].Trim()
  }

  return $config
}

function Get-WslAddress([string] $Distro) {
  $wslArgs = @()
  if ($Distro) { $wslArgs += @('-d', $Distro) }
  $wslArgs += @('hostname', '-I')
  $raw = (& wsl.exe @wslArgs | Out-String)
  $ip = ($raw -split '\s+' | Where-Object { $_ -match '^\d{1,3}(\.\d{1,3}){3}$' } | Select-Object -First 1)
  if (-not $ip) {
    throw "Could not read the WSL IPv4. In PowerShell run: wsl.exe hostname -I. If the distro is not the default, set WSL_DISTRO in scripts/lan.config (wsl -l -q lists names)."
  }
  return $ip.Trim()
}

function Get-LanAddress([string] $Override) {
  if ($Override) { return $Override }

  $skip = 'vEthernet|WSL|Hyper-V|Loopback|Default Switch|Bluetooth'
  $pick = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object {
      $_.IPAddress -match '^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)' -and
      $_.InterfaceAlias -notmatch $skip
    } |
    Sort-Object InterfaceMetric |
    Select-Object -First 1

  if (-not $pick) {
    throw "No LAN IPv4 found. Set LAN_HOST in scripts/lan.config. On Windows run ipconfig and copy the Wi-Fi IPv4 (not 127.0.0.1, not vEthernet WSL)."
  }

  return $pick.IPAddress
}

$config = Read-LanConfig
$port = [int] $config.LAN_PORT
if ($port -lt 1 -or $port -gt 65535) {
  throw "LAN_PORT in scripts/lan.config must be 1-65535."
}

$wslIp = Get-WslAddress $config.WSL_DISTRO
$lanIp = Get-LanAddress $config.LAN_HOST

cmd /c "netsh interface portproxy delete v4tov4 listenaddress=0.0.0.0 listenport=$port >nul 2>&1"
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=$port connectaddress=$wslIp connectport=$port | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw "portproxy failed. Run this script elevated (yarn dev:lan uses gsudo)."
}

$ruleName = "next-starter-dev-lan-$port"
$existing = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
if (-not $existing) {
  New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Action Allow -Protocol TCP -LocalPort $port | Out-Null
}

Write-Host ""
Write-Host "Phone URL: http://${lanIp}:$port"
Write-Host "Forward:   0.0.0.0:$port -> ${wslIp}:$port (WSL)"
Write-Host "Same Wi-Fi as this PC. If the page does not load, set LAN_HOST in scripts/lan.config."
Write-Host ""
