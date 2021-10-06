import { resolveConfig } from './config'

export async function createServer(root: string) {
  const config = await resolveConfig(root)
  console.log(config)
}
