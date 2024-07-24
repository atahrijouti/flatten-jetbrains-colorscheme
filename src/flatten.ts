import { readFile, writeFile } from "node:fs/promises"
import xml2js from "xml2js"
import { parseThemeJson, Theme } from "./helpers.js"

const childFile = await readFile("resources/child_theme.icls", "utf8")
const parentFile = await readFile("resources/parent_theme.icls", "utf8")

const parser = new xml2js.Parser()

const parsedParent = parseThemeJson(
  (await parser.parseStringPromise(parentFile)) as Theme,
)

const parsedChild = parseThemeJson((await parser.parseStringPromise(childFile)) as Theme)

Object.keys(parsedChild).forEach((key) => {
  parsedParent[key] = parsedChild[key]
})

await writeFile("out/flattened.json", JSON.stringify(parsedParent, null, 2))
