# npm run

Using npm run as a task runner powered with npm scripts, uses cli packages without the need for unnecessary
abstractions like Gulp and Grunt.

The repository provides [recipes](recipes) in which turns your `package.json` into a task runner.

## Usage

* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
  * If this a new project (without a `package.json` file), start by running `npm init`. This will ask a few questions and use your responses to build a basic `package.json` file. Next, copy what you need of the the selected recipe `"devDependencies"` object into your `package.json`.
  * If this is an existing project, copy what you need of the the selected recipe `"devDependencies"` into your `package.json`.
* Now, copy any commands you want from the the selected recipe `"scripts"` object into your `package.json` `"scripts"` object.
* Finally, use `npm run setup` to install all of the dependencies and folders into your project.

You're ready to go! Run any command by typing `npm run command` (where "command" is the name of the command in the `"scripts"` object).

## Notes

The `"browserlist"` in `package.json` provides a browser support list for Autoprefixer and Babel.
