# Dev Kit

Automate and enhance your workflow with Dev Kit.

## Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Autoprefixer support                   | Prefix CSS with ease. (Run `npm run watch` or `npm run build` for production)                                                                                                      |
| Performance optimization               | Minify and concatenate JavaScript, CSS, HTML and images to help keep your pages lean. (Run `npm run build` to create an optimised versions of your assets)                                                                                                |
| ES2015 via Babel 6.0                   | Optional ES2015 support using [Babel](https://babeljs.io/). To enable ES2015 support uncomment the line `.pipe(babel())` in the [gulpfile.js](gulpfile.js) file. ES2015 source code will be automatically transpiled to ES5 for wide browser support.  |
| Built-in HTTP Server                   | A built-in server for previewing your site locally while you develop and iterate                                                                                                                                                                            |
| Live Browser Reloading                 | Reload the browser in real-time anytime an edit is made without the need for an extension. (Run `npm run watch` and edit your files)                                                                                                                           |
| Cross-device Synchronization           | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io). (Run `npm run watch` and open up the IP provided on other devices on your network)                       |

## Browser Support

At present, Dev Kit officially supports the last two versions of the following browsers:

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

This is not to say that it cannot be used with browsers older than those reflected, but merely that Dev Kit's focus will be on ensuring our layouts work great in the above.
