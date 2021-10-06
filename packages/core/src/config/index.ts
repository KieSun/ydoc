import path from 'path'
import * as fs from 'fs'

export async function resolveConfig(root: string) {
  const customConfig = await getCustomConfig(root)
  console.log(customConfig)
}

export async function getCustomConfig(root: string) {
  const configPath = path.resolve(root, 'ydoc.config.js')
  const hasCustomConfig = fs.existsSync(configPath)
  return hasCustomConfig ? require(configPath) : {}
}
