#!/usr/bin/env node

const { execSync, spawn } = require('child_process')

const config = require('./config.json')
const path = config.PI_TILER_PATH

const cmdPrefix = `cd ${path}`
const cmdCi = `npm ci`
const cmdStart = `npm start`

const firstCmd = [cmdPrefix, cmdCi].join(' && ')
const secondCmd = [cmdPrefix, cmdStart].join(' && ')
const cmdOpts = { stdio: 'inherit' }

console.log('[pi-tiler][startup] Checking dependencies...')
execSync(firstCmd, cmdOpts)

console.log('[pi-tiler][startup] Starting server...')
const child = spawn('npm', ['start'], { cwd: path })

child.stdout.on('data', data => {
	const text = data.toString().trim()
	console.log(text)

	if (text == '[pi-tiler][server] Server up and running...') {
		console.log('[pi-tiler][startup] Startup completed.')
		process.exit()
	}
})

setTimeout(() => {
	console.log('[pi-tiler][startup] Server start timed out.')
	child.kill()
	process.exit(1)
}, 1 * 60 * 1000)
