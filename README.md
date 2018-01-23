# npm tasks ✔️

> A npm task runner powered with cli scripts

Use cli packages directly without unnecessary abstractions like Gulp and Grunt.

* Provides common recipes for automation
* Runs commands locally

## Table of Contents

* [Setup](#setup)
* [Packages](#packages)
* [Tasks](#tasks)

## Setup

* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
  * If this a new project (without a `package.json` file), start by running `npm init`. This will ask a few questions and use your responses to build a basic `package.json` file. Next, copy what you need of the `"devDependencies"` object into your `package.json`.
  * If this is an existing project, copy what you need of the` "devDependencies"` into your `package.json`.
* Now, copy any tasks you want from the `"scripts"` object into your `package.json` `"scripts"` object.
* Finally, use `npm run setup` to install all of the dependencies and folder structure into your project.

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `dev`. It will start a new server, open up a browser and watch for any CSS or JS changes in the `src` directory; once it compiles those changes, the browser will automatically inject the changed file(s)!

## Packages

The list of the packages used for the tasks available.

* [autoprefixer](https://github.com/postcss/autoprefixer)
* [babel](https://github.com/babel/babel)
* [babel-cli](https://github.com/babel/babel/tree/master/packages/babel-cli)
* [babel-loader](https://github.com/babel/babel-loader)
* [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
* [browser-sync](https://github.com/Browsersync/browser-sync)
* [cssnano](https://github.com/ben-eb/cssnano)
* [hashmark](https://github.com/keithamus/hashmark)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)
* [onchange](https://github.com/Qard/onchange)
* [postcss-cli](https://github.com/code42day/postcss-cli)
* [rimraf](https://github.com/isaacs/rimraf)
* [svg-sprite](https://github.com/jkphl/svg-sprite)
* [uglify-js](https://github.com/mishoo/UglifyJS2)
* [webpack](https://github.com/webpack/webpack)

## Tasks

Below are the tasks available.

> note: `run-s` will run tasks in series, while `run-p` runs them in parallel

> see: browserlist in package.json for browser support

| cmd | recipe | description |
|:---:|:---|:---|
| `babel-js` | `babel src/js --out-dir .tmp` | Compile browser-compatible JavaScript from next generation |
| `browser-sync` |  `browser-sync start --server --files '**/*.css, **/*.js, !node_modules/**/*' --port 7777 --proxy 'localhost' --browser 'FirefoxDeveloperEdition'` | Browser sync file changes on edit |
| `clean` | `rimraf dist/{*.css,**/*.css,*.js,**/*.js}` | Delete compiled files |
| `hash` | `hashmark -l 12 -r 'dist/**/*.{css,js}' '{dir}/{name}.{hash}{ext}` | Append a md5 hash to the compiled files (using webpack remove js ext) |
| `minify:css` | `postcss -u cssnano -d dist -b .tmp .tmp/*.css .tmp/**/*.css && rimraf .tmp` | Minify CSS files |
| `prefix:css` | `postcss -u autoprefixer -d .tmp -b src/css src/css/*.css src/css/**/*.css` | Add vendor prefixes to CSS files |
| `svg-sprite` | `svg-sprite --symbol --symbol-dest=dist --symbol-sprite=sprite.svg --symbol-inline src/icons/*.svg` | Compile a svg sprite from svg files |
| `uglify:js` | `uglifyjs .tmp/file1.js .tmp/file2.js -c -m -o dist/bundle.js && rimraf .tmp` | Takes a bunch of JavaScript files, parse the files in sequence and apply any compression options into a bundle file |
| `watch:css` | `onchange \"src/css\" -- run-s build:css` | Watches for any .css file changes, then runs the cmd `build:css` |
| `watch:js` | `onchange \"src/js\" -- run-s webpack:dev` | Watches for any .js file changes, then runs the cmd `webpack:dev` |
| `watch` | `run-p browser-sync watch:*` | Runs the cmd `browser-sync`, `watch:css` and `watch:js` |
| `webpack:dev` | `NODE_ENV=development webpack` | Bundle JavaScript with Webpack |
| `webpack:build` | `NODE_ENV=production webpack` | Bundle and Uglify JavaScript with Webpack |
| `build:css` | `run-s prefix:css minify:css` | Combines the cmd's  `prefix:css` and `minify:css` into a single cmd |
| `build:js` | `run-s webpack:build` | Alias to run  `webpack:build` |
| `build` | `run-s build:* hash` | Run all `build` cmd's and append a md5 hash |
| `dev` | `run-s build:css webpack:dev watch` |  Alias to run `build:css`, `webpack:dev` and `watch` cmd's |
