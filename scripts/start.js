#!/usr/bin/env node

const { execSync } = require('child_process')
const cmdOpts = { stdio: 'inherit' }

console.log('[pi-tiler][server] Server up and running...')

execSync("while sleep 2; do echo \"Time: $(date -Iseconds).\" >> file.log; done", cmdOpts)
