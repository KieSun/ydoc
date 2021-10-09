import MarkdownIt from 'markdown-it'

export const createMarkdownToReactRenderFn = (docDir: string) => {
  const md = createMarkdownRenderer(docDir)
  return (src: string, file: string, publicDir: string) => {
    console.log(src, file, publicDir, md)
  }
}

export const createMarkdownRenderer = (docDir: string) => {
  console.log(docDir)
  const md = MarkdownIt({
    html: true,
    linkify: true,
  })
  return md
}
