import { createServer as createViteServer } from 'vite'
import { resolveConfig } from './config'
import { createVitePressPlugin } from './plugin'

export async function createServer(root: string) {
  const config = await resolveConfig(root)
  return createViteServer({
    root: config.docDir,
    base: config.docData.base,
    plugins: createVitePressPlugin(root, config),
    server: {},
  })
}
