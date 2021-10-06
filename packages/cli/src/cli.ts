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
}
