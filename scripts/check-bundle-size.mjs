import { readdirSync, readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const assetsDir = new URL('../dist/assets/', import.meta.url)
const bundles = readdirSync(assetsDir).filter((file) => file.endsWith('.js'))
const limitBytes = 90 * 1024

if (bundles.length === 0) {
  console.error('No JavaScript bundles found. Run npm run build first.')
  process.exit(1)
}

let totalBytes = 0

for (const file of bundles) {
  const bytes = gzipSync(readFileSync(new URL(file, assetsDir))).length
  totalBytes += bytes
  console.log(`${file}: ${(bytes / 1024).toFixed(2)} KiB gzipped`)
}

console.log(`Total: ${(totalBytes / 1024).toFixed(2)} KiB (limit: 90 KiB)`)

if (totalBytes > limitBytes) {
  console.error('JavaScript bundle exceeds the size limit.')
  process.exitCode = 1
}
