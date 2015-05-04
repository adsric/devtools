# Scaffolding Workflow (WIP)

## My tools and workflow for building fast and accessible cross-device web applications

Scaffolding is a set of tools that combine to form the workflow I use on
projects. This workflow is designed to help deliver modern web experiences that
are accessible to the widest range of devices possible.

This workflow utilizes the following tools, all of which are independent themselves.

- [NodeJS](https://nodejs.org): for easily building fast, scalable network applications.
- [GulpJS](http://gulpjs.com): to automate and enhance the workflow.
- [Bower](http://bower.io): A package manager for front-end dependencies.
- [Jekyll](http://jekyllrb.com): A static website generator.

## Setup

1. Run the following: `$ npm install` to install node dependencies
2. Run the following: `$ bower install` to install front-end dependencies

## Automation commands

These are the stand out commands available:-

`$ gulp serve`

Builds project and launches a local server

`$ gulp`

Builds production ready code for project

`$ gulp styles:fallback`

Optional helper for generating fallback IE < 9 styles

## License

The code is available under the [MIT license](LICENSE.md).
