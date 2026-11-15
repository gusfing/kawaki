# ═══════════════════════════════════════════════════════════════════════════ #
# KAWAKI STUDIOS - DESIGN SYSTEM MIGRATION SCRIPT (PowerShell)               #
# Automatically updates all HTML pages with new design system                 #
# ═══════════════════════════════════════════════════════════════════════════ #

param(
    [switch]$DryRun = $false,
    [string]$PublicDir = ".\public"
)

# Script settings
$ProgressPreference = "SilentlyContinue"
$updated = 0
$skipped = 0
$failed = 0

function Add-MasterCSS {
    param([string]$FilePath)

    # Read file content
    $content = Get-Content $FilePath -Raw

    # Check if already has master CSS
    if ($content -match "kawaki-master\.css") {
        Write-Host "[SKIP] $(Split-Path $FilePath -Leaf)" -ForegroundColor Yellow
        $script:skipped++
        return $true
    }

    # Find the closing </title> tag and add CSS after it
    $cssLink = @"

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- KAWAKI MASTER DESIGN SYSTEM -->
    <link rel="stylesheet" href="/assets/css/kawaki-master.css">
"@

    # Replace pattern: </title> → </title> + CSS
    $newContent = $content -replace '(</title>)', "`$1$cssLink"

    if ($newContent -eq $content) {
        Write-Host "[FAIL] $(Split-Path $FilePath -Leaf)" -ForegroundColor Red
        $script:failed++
        return $false
    }

    if (-not $DryRun) {
        Set-Content -Path $FilePath -Value $newContent -Encoding UTF8
    }

    Write-Host "[UPDATE] $(Split-Path $FilePath -Leaf)" -ForegroundColor Green
    $script:updated++
    return $true
}

function Start-Migration {
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Yellow
    Write-Host "Kawaki Studios Design System Migration" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Yellow
    Write-Host ""

    # Validate environment
    if (-not (Test-Path $PublicDir)) {
        Write-Host "✗ Error: '$PublicDir' directory not found!" -ForegroundColor Red
        Write-Host "Please run this script from the project root." -ForegroundColor Red
        exit 1
    }

    if (-not (Test-Path "$PublicDir\assets\css\kawaki-master.css")) {
        Write-Host "✗ Error: Master CSS not found!" -ForegroundColor Red
        Write-Host "Expected: $PublicDir\assets\css\kawaki-master.css" -ForegroundColor Red
        exit 1
    }

    Write-Host "✓ Master CSS found" -ForegroundColor Green
    Write-Host "✓ Public directory found" -ForegroundColor Green

    if ($DryRun) {
        Write-Host "[DRY RUN] No changes will be made" -ForegroundColor Yellow
    }

    Write-Host ""
    Write-Host "Processing HTML files..." -ForegroundColor Yellow
    Write-Host ""

    # Find and process all HTML files
    Get-ChildItem -Path $PublicDir -Filter "*.html" -Recurse | ForEach-Object {
        Add-MasterCSS $_.FullName
    }

    # Summary
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "Migration Complete!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "Updated: $updated" -ForegroundColor Green
    Write-Host "Skipped: $skipped" -ForegroundColor Yellow
    Write-Host "Failed: $failed" -ForegroundColor Red
    Write-Host ""

    if ($DryRun) {
        Write-Host "DRY RUN complete. Run without -DryRun flag to apply changes." -ForegroundColor Yellow
    }

    if ($failed -eq 0) {
        Write-Host "✓ All files processed successfully!" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "✗ Some files failed. Check them manually." -ForegroundColor Red
        exit 1
    }
}

# Run migration
Start-Migration
