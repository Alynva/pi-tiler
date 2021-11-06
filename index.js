#!/usr/bin/env node

console.log("Welcome to pi-tiler!")

const task = {
	"init": "./scripts/init.js",
	"start": "./scripts/start.js",
}[process.argv[2]]

if (!task) {
	console.error("Invalid task:", process.argv[2])
	return
}

require(task)
