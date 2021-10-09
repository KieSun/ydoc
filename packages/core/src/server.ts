import { createServer as createViteServer } from 'vite'
import react from '@vitejs/plugin-react'
import { resolveConfig } from './config'
import { createVitePressPlugin } from './plugin'

export async function createServer(root: string) {
  const config = await resolveConfig(root)
  return createViteServer({
    root: config.docDir,
    base: config.docData.base,
    plugins: [
      ...createVitePressPlugin(root, config),
      react({
        include: [/\.tsx$/, /\.ts$/, /\.md$/],
      }),
    ],
    alias: [
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: require.resolve('react/jsx-dev-runtime'),
      },
      {
        find: /^react$/,
        replacement: require.resolve('react'),
      },
      {
        find: /^react-dom$/,
        replacement: require.resolve('react-dom'),
      },
    ],
    server: {},
  })
}
