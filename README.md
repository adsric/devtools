# DevTools

> A set of web developer tools for development.

1. Tools are managed and powered with npm scripts.
2. cli packages without the need for unnecessary abstractions.

As such the main artery of DevTools will be the **[package.json](tools/package.json)**.

* The `"browserlist"` in `package.json` for some tools provides a list of browsers to support for packages.
* More configurations can be passed if the package supports such methods.


## Get started

* First, ensure that Node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
  * If this a new project (without a `package.json` file), start by running `npm init`. This will ask a few questions and use your responses to build a basic `package.json` file. Next, copy what you need of the the selected recipe `"devDependencies"` object into your `package.json`.
  * If this is an existing project, copy what you need of the the selected tool `"devDependencies"` into your `package.json`.
* Now, copy any commands you want from the the selected tool `"scripts"` object into your `package.json` `"scripts"` object.
* Finally, use `npm install` to install all of the dependencies into your project.

You're ready to go! Run any command by typing `npm run command` (where "command" is the name of the command in the `"scripts"` object).


## Tools

The growing list of tools:

1. [Bundle css and js with Parceljs](tools/parceljs)
2. [Compile + Minify css with PostCSS](tools/postcss)
