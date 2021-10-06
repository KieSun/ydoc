import path from 'path'
import * as fs from 'fs'
import { IDocConfig } from '../types'

export async function resolveConfig(root: string) {
  const customConfig = await getCustomConfig(root)
  const docData = await getDocData(customConfig)
  const docDir = path.resolve(root, customConfig.docDir || './docs')
  console.log(docData, docDir)
}

export async function getCustomConfig(root: string) {
  const configPath = path.resolve(root, 'ydoc.config.js')
  const hasCustomConfig = fs.existsSync(configPath)
  return hasCustomConfig ? require(configPath) : {}
}

export async function getDocData(config: IDocConfig) {
  return {
    title: config.title || 'Ydoc',
    description: config.description || 'A Ydoc site',
    base: config.base ? config.base.replace(/([^/])$/, '$1/') : '/',
  }
}
