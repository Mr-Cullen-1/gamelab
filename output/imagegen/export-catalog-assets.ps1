$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
$specs = (Get-Content -LiteralPath (Join-Path $root 'catalog-banner-manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json).games
$generated = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'catalog-generation-progress.json') -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($spec in $specs) {
  $item = $generated | Where-Object id -eq $spec.id
  foreach ($variant in @('wide','compact')) {
    $width = 800; $height = 800; $suffix = 'compact'
    if ($variant -eq 'wide') { $width = 1600; $height = 870; $suffix = 'banner' }
    $source = [Drawing.Image]::FromFile($item.$variant)
    $bitmap = New-Object Drawing.Bitmap($width,$height)
    $graphics = [Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.DrawImage($source,0,0,$width,$height)
      $bitmap.Save((Join-Path $root ($spec.file+'-'+$suffix+'.png')),[Drawing.Imaging.ImageFormat]::Png)
    } finally { $graphics.Dispose(); $bitmap.Dispose(); $source.Dispose() }
  }
}
Write-Output ('Exported '+($specs.Count*2)+' PNG assets.')
