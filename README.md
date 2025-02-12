## Update Node Version
* Ensure you have nvm installed to manage node versions, install it if it is missing with 
   * `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash`

You can check that it is installed by running `command -v nvm` 

Running either of the above commands downloads a script and runs it. The script clones 
the nvm repository to ~/.nvm, and attempts to add the source lines from the snippet
 below to the correct profile file (~/.bashrc, ~/.bash_profile, ~/.zshrc, or ~/.profile). 
 If you find the install script is updating the wrong profile file, set the $PROFILE env var 
 to the profile file’s path, and then rerun the installation script.

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Verify Installation
To verify that nvm has been installed, do: `command -v nvm`

which should output nvm if the installation was successful. Please note that which nvm will not work, 
since nvm is a sourced shell function, not an executable binary.

### Install Node v.20
Install node v.20 with `nvm install 20`
Enable it with `nvm use 20`

## Install 

* Checkout the repository and do an `npm i`
* Run the app with `npm run dev`
* Open the browser to the url displayed which should be `http://localhost:5173/` but 
  could be different on your machine.
