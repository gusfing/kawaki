# Kawaki Studios Design System Deployment Script
# Adds master CSS and fonts to all HTML files

param([switch]$DryRun = $false)

$PublicDir = ".\public"
$updated = 0
$skipped = 0
$failed = 0

Write-Host "======================================"
Write-Host "Kawaki Design System Deployment"
Write-Host "======================================"
Write-Host ""

if (-not (Test-Path $PublicDir)) {
    Write-Host "ERROR: public directory not found"
    exit 1
}

if (-not (Test-Path "$PublicDir\assets\css\kawaki-master.css")) {
    Write-Host "ERROR: master CSS not found"
    exit 1
}

Write-Host "Master CSS: OK"
Write-Host "Public dir: OK"

if ($DryRun) {
    Write-Host "[DRY RUN MODE - No changes will be made]"
}

Write-Host ""
Write-Host "Processing files..."
Write-Host ""

$cssLink = @"

    <!-- FONTS -->
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- KAWAKI MASTER DESIGN SYSTEM -->
    <link rel="stylesheet" href="/assets/css/kawaki-master.css">
"@

Get-ChildItem -Path $PublicDir -Filter "*.html" -Recurse | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    if ($content -match "kawaki-master\.css") {
        Write-Host "[SKIP] $($_.Name)"
        $script:skipped++
    } else {
        $newContent = $content -replace "(</title>)", "`$1$cssLink"

        if ($newContent -eq $content) {
            Write-Host "[FAIL] $($_.Name)"
            $script:failed++
        } else {
            if (-not $DryRun) {
                Set-Content -Path $file -Value $newContent -Encoding UTF8
            }
            Write-Host "[UPDATE] $($_.Name)"
            $script:updated++
        }
    }
}

Write-Host ""
Write-Host "====== RESULTS ======"
Write-Host "Updated: $updated"
Write-Host "Skipped: $skipped"
Write-Host "Failed: $failed"
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN completed. Run without -DryRun to apply changes."
} else {
    Write-Host "Deployment complete!"
}

exit $failed
