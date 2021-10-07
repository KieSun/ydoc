export interface ICustomConfig {
  title: string
  description: string
  base: string
}

export interface IDocData {
  title: string
  description: string
  base: string
}

export interface IDocConfig {
  root: string
  docDir: string
  docData: IDocData
  configPath: string
  outDir: string
  pages: string[]
}
