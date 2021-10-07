import path from 'path'
import * as fs from 'fs'
import fg from 'fast-glob'
import { IDocData, IDocConfig, ICustomConfig } from '../types'

export async function resolveConfig(root: string) {
  const customConfig = await getCustomConfig(root)
  const docData = await getDocData(customConfig)
  const docDir = path.resolve(root, customConfig.docDir || './docs')
  const pages = (
    await fg(['**.md'], {
      cwd: docDir,
      ignore: ['**/node_modules'],
    })
  ).sort()
  const config: IDocConfig = {
    root,
    docDir,
    docData,
    pages,
    configPath: path.resolve(root, 'ydoc.config.js'),
    outDir: path.resolve(root, 'dist'),
  }

  return config
}

export async function getCustomConfig(root: string) {
  const configPath = path.resolve(root, 'ydoc.config.js')
  const hasCustomConfig = fs.existsSync(configPath)
  return hasCustomConfig ? require(configPath) : {}
}

export async function getDocData(config: ICustomConfig): Promise<IDocData> {
  return {
    title: config.title || 'Ydoc',
    description: config.description || 'A Ydoc site',
    base: config.base ? config.base.replace(/([^/])$/, '$1/') : '/',
  }
}
