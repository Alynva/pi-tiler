# pi-tiler

# TODO

## `init` command

1. `npx pi-tiler init`
   1. "Checking environment... (tested only in PI4B)"
   1. "You are ready to start?"
   1. "Copying global files to home folder..."
      ```
		~/.pi-tiler/.env
		├── PI_TILER_GIT_URL					# repository to pull updates
		├── PI_TILER_GIT_TOKEN					# for private repositories
		├── PI_TILER_PATH						# defaults to "~/my-pi-tiler"
		└── PI_TILER_APPS_GIT_TOKEN.{appName}	# tokens to use when pulling private apps
		~/.pi-tiler/startup.js					# runs "cd $path && npm ci && npm start"
	  ```
   1. "Installing multi-user terminal session manager (screen)..."
   1. "Configuring startup at boot time..."
   1. "Do you have a repository with the configuration? (yes/no)"
   1. No: "We recommend that you create a remote repository, so it can be easily restored if you have any problems. Do you want to skip this? (yes/no)"
   1. No>Yes: "The repository will be created locally, in the future if you want to make a backup, set the remote origin and push it."
   1. No>No | Yes: "What is the git URL?"
   1. No>No | Yes: "If it is private, set the pull+push token: (if its public, you can leave empty)"
   1. "What name do you want to call it? It will be place at your home folder. (my-pi-tiler)"
   1. "Initialization finished. Do you want to start the pi-tiler server now? (yes/no)"
   1. No: "Ok, bye."
   1. Yes: `~/.pi-tiler/startup.js`

1. `npx pi-tiler start`
   1. "Looking for configuration file `./variables/pi-tiler-config.json`..."
	  1. Not found: "pi-tiler not configured yet."
	  1. Not found: "Do you want to define custom arguments to ngrok? (yes/no)"
	  1. Not found: "Set the password to open the dashboard:"
	  1. Not found: "Writing configurations to file..."
	  1. "pi-tiler is enabled."
	  1. "Starting ngrok with options: {...}"
	  1. "Looking for apps..."
	  1. "Found 2 apps, but only 1 is enabled."
	  1. "Starting enabled apps..."
	  1. "Startup finished."
	  1. "Dashboard URL: ..."
	  1. "Dashboard password: ..."