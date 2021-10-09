#!/usr/bin/env node
import chalk from 'chalk'
import minimist from 'minimist'
import { createServer } from '@ydoc/core'

const argv: any = minimist(process.argv.slice(2))

console.log(chalk.cyan(`ydoc v${require('../package.json').version}`))

const command = argv._[0]

if (!command || command === 'dev') {
  // 启动个 server
  createServer(process.cwd())
    .then((server) => server.listen())
    .then((server) => {
      console.log()
      server.printUrls()
    })
    .catch((err) => {
      console.error(chalk.red(`failed to start server. error:\n`), err)
      process.exit(1)
    })
}
