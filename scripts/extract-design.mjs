// Unpacks the design bundle ("SHOWROOMZ 랜딩 페이지.html") into _design/.
// Usage: node scripts/extract-design.mjs ["<path to bundle html>"]
// Output (gitignored): _design/<NN>-<uuid>/{page.html,template.html,assets/…},
// _design/index.json (board titles/sizes) and _design/FONT-LICENSES.txt.
import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, "..")
const src =
  process.argv[2] ?? path.resolve(root, "..", "SHOWROOMZ 랜딩 페이지.html")
const out = path.join(root, "_design")

const EXT = {
  "text/html": "html",
  "text/css": "css",
  "text/javascript": "js",
  "application/javascript": "js",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "font/woff2": "woff2",
  "font/woff": "woff",
  "font/ttf": "ttf",
}

function scriptBlock(html, type) {
  const open = `<script type="${type}">`
  const i = html.indexOf(open)
  if (i < 0) return null
  const j = html.indexOf("</script>", i)
  return html.slice(i + open.length, j).trim()
}

function decode(entry) {
  const buf = Buffer.from(entry.data, "base64")
  return entry.compressed ? zlib.gunzipSync(buf) : buf
}

function unpack(html, dir, pages) {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, "page.html"), html)
  const manifestText = scriptBlock(html, "__bundler/manifest")
  const templateText = scriptBlock(html, "__bundler/template")
  const manifest = manifestText ? JSON.parse(manifestText) : {}
  let template = templateText ? JSON.parse(templateText) : ""
  const assets = []
  for (const [uuid, entry] of Object.entries(manifest)) {
    if (pages.has(uuid)) continue
    const bytes = decode(entry)
    const ext = EXT[entry.mime] ?? "bin"
    const name = `${uuid}.${ext}`
    fs.mkdirSync(path.join(dir, "assets"), { recursive: true })
    fs.writeFileSync(path.join(dir, "assets", name), bytes)
    assets.push({ uuid, mime: entry.mime, bytes: bytes.length, file: name })
    template = template.split(uuid).join(`assets/${name}`)
  }
  fs.writeFileSync(path.join(dir, "template.html"), template)
  fs.writeFileSync(
    path.join(dir, "assets.json"),
    JSON.stringify(assets, null, 2) + "\n"
  )
  return { manifest, template, assets }
}

const html = fs.readFileSync(src, "utf8")
fs.rmSync(out, { recursive: true, force: true })
const pageOrder = JSON.parse(scriptBlock(html, "__bundler/page_order"))
const pages = new Set(pageOrder)
const { manifest, template } = unpack(html, path.join(out, "00-root"), pages)

// The bundle carries the Google Fonts license notice in a leading comment.
const license = html.match(/<!--\s*(Some of the files packed[\s\S]*?)-->/)
if (license) {
  fs.writeFileSync(
    path.join(out, "FONT-LICENSES.txt"),
    license[1].trim() + "\n"
  )
}

// Board titles come from the root template's <section class="board"><h2>.
const titles = {}
for (const m of template.matchAll(
  /<h2>([^<]*)<\/h2><iframe src="about:blank#([0-9a-f-]{36})"[^>]*width="(\d+)" height="(\d+)"/g
)) {
  titles[m[2]] = { title: m[1], width: +m[3], height: +m[4] }
}

const index = []
pageOrder.forEach((uuid, i) => {
  const text = decode(manifest[uuid]).toString("utf8")
  const meta = titles[uuid] ?? { title: uuid }
  const dir = path.join(out, `${String(i + 1).padStart(2, "0")}-${uuid}`)
  const { assets } = unpack(text, dir, pages)
  // Nested frames reference other root pages by about:blank#<uuid>.
  const frames = [...text.matchAll(/about:blank#([0-9a-f-]{36})/g)].map(
    m => m[1]
  )
  index.push({ n: i + 1, uuid, ...meta, dir, frames, assets: assets.length })
})
fs.writeFileSync(
  path.join(out, "index.json"),
  JSON.stringify(index, null, 2) + "\n"
)
console.log(JSON.stringify(index, null, 2))
