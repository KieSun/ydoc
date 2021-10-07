import { IDocConfig } from '../types'
import { Plugin } from 'vite'

export function createVitePressPlugin(
  root: string,
  config: IDocConfig
): Plugin[] {
  console.log(root, config)
  const plugin: Plugin = {}

  return [plugin]
}
