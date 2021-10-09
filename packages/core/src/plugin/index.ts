import { IDocConfig } from '../types'
import { defineConfig, Plugin, ResolvedConfig } from 'vite'
import { createMarkdownToReactRenderFn } from '../markdown'
import { APP_PATH } from './alias'

export function createVitePressPlugin(
  root: string,
  docConfig: IDocConfig
): Plugin[] {
  let markdownToReact: (src: string, file: string, publicDir: string) => void

  let config: ResolvedConfig

  const plugin: Plugin = {
    name: 'ydoc',

    configResolved(resolvedConfig) {
      config = resolvedConfig
      markdownToReact = createMarkdownToReactRenderFn(docConfig.docDir)
    },

    // @ts-ignore
    config() {
      return defineConfig({
        optimizeDeps: {
          include: ['react', 'react-dom'],
        },
        server: {
          fs: {
            allow: [APP_PATH, docConfig.docDir, process.cwd()],
          },
        },
      })
    },

    transform(code, id) {
      if (id.endsWith('.md')) {
        console.log(markdownToReact(code, id, ''), root, config, '----')
        return ''
      }
    },

    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url!.endsWith('.html')) {
            res.statusCode = 200
            res.end(`
    <!DOCTYPE html>
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Vite App</title>
      </head>
      <body>
        <div id='root'></div>
        <script type='module' src='@fs/${APP_PATH}/main.jsx'></script>
      </body>
    </html>`)
            return
          }
          next()
        })
      }
    },
  }

  return [plugin]
}
