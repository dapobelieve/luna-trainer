const path = require('path')
const fs = require('fs')

const env = process.env.NODE_ENV

const envPath = path.resolve(process.cwd(), `.env.${env}`)

const defaultEnvPath = path.resolve(process.cwd(), '.env')

// console.log(fs.existsSync(envPath))

require('dotenv').config({
  path: fs.existsSync(envPath) ? envPath : defaultEnvPath
})
