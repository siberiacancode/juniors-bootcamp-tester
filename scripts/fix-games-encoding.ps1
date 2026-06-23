$inputPath = 'C:\Users\dmitr\.codex\attachments\2f6b5cbf-4e74-4aad-bb5f-cc84aecf7556\pasted-text.txt'
$outputPath = 'C:\Users\dmitr\Desktop\projects\juniors-bootcamp-tester\fixed-games.ts'

$text = Get-Content -LiteralPath $inputPath -Raw -Encoding UTF8

function Fix-Mojibake([string] $value) {
  $bytes = [System.Text.Encoding]::GetEncoding(1251).GetBytes($value)
  return [System.Text.Encoding]::UTF8.GetString($bytes)
}

$fixed = Fix-Mojibake $text

Set-Content -LiteralPath $outputPath -Value $fixed -Encoding UTF8
