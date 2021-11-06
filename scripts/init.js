const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const question = require('../utils/question')
const { MODIFIERS } = question
const globalEnv = require('../utils/globalEnv')

async function checkSoftwareAndHardware() {
	console.log('Checking your environment... (tested only in PI4B)')
}

async function ready() {
	const message = `You are ready to start? (${MODIFIERS.Underscore}yes${MODIFIERS.Reset}/no)`
	const answer = await question(message, {
		defAns: "yes",
		validate: a => ['yes', 'y', 'no', 'n'].includes(a),
	})

	if (['no', 'n'].includes(answer)) {
		console.log('Ok, bye.')
		process.exit()
	}
}

async function copyFiles() {
	console.log('Copying global files to `~/.pi-tiler/`...')
	const globalPath = '~/.pi-tiler'

	if (!fs.existsSync(globalPath)) fs.mkdirSync(globalPath, { recursive: true })

	for (const file of fs.readdirSync('../globalFiles')) {
		const source = path.join('..', 'globalFiles', file)
		const target = path.join(globalPath, file)
		fs.copyFileSync(source, target)
	}
}

async function installSessionManager() {
	console.log('Installing multi-user terminal session manager (screen)...')
}

async function configBootStartup() {
	console.log('Configuring startup at boot time...')
}

async function askForRepo() {
	const message1 = `Do you have a repository with the configuration? (${MODIFIERS.Underscore}yes${MODIFIERS.Reset}/no)`
	const answer1 = await question(message1, {
		defAns: "yes",
		validate: a => ['yes', 'y', 'no', 'n'].includes(a),
	})

	let askForUrl = false
	if (['no', 'n'].includes(answer1)) {
		const message2 = `We recommend that you create a remote repository, so it can be easily restored if you have any problems. Do you want to skip this? (yes/${MODIFIERS.Underscore}no${MODIFIERS.Reset})`
		const answer2 = await question(message2, {
			defAns: "no",
			validate: a => ['yes', 'y', 'no', 'n'].includes(a),
		})

		if (['yes', 'y'].includes(answer2)) {
			console.log('The repository will be created locally, in the future if you want to make a backup, set the remote origin and push it.')
		} else {
			askForUrl = true
		}
	} else {
		askForUrl = true
	}

	if (askForUrl) {
		const message3 = `What is the git URL?`
		const answer3 = await question(message3, {
			validate: a => !!a,
		})
		const message4 = `If it is private, set the pull+push token: (if its public, you can leave empty)`
		const answer4 = await question(message4)

		globalEnv.save({
			PI_TILER_GIT_URL: answer3,
			PI_TILER_GIT_TOKEN: answer4,
		})
	}
}

async function createFolder() {
	const message = `What name do you want to call it? It will be place at your home folder. (${MODIFIERS.Underscore}my-pi-tiler${MODIFIERS.Reset})`
	const answer = await question(message, {
		defAns: "my-pi-tiler",
		validate: a => !!a,
	})

	const finalPath = path.join("~", answer)

	globalEnv.save({
		PI_TILER_PATH: finalPath,
	})
}

async function startNow() {
	console.log('Initialization finished.')
	const message = `Do you want to start the pi-tiler server now? (${MODIFIERS.Underscore}yes${MODIFIERS.Reset}/no)`
	const answer = await question(message, {
		defAns: "yes",
		validate: a => ['yes', 'y', 'no', 'n'].includes(a),
	})

	if (['no', 'n'].includes(answer)) {
		console.log('Ok, you can start it running `~/.pi-tiler-startup.js` or restarting your system.')
		console.log('Bye.')
		process.exit()
	} else {
		require('~/.pi-tiler/startup.js')
	}
}

const steps = [
	checkSoftwareAndHardware,
	ready,
	copyFiles,
	installSessionManager,
	configBootStartup,
	askForRepo,
	createFolder,
	startNow,
]

async function askQuestions() {
	for (const step of steps) await step()
}

askQuestions().catch((e) => console.error(e))
