# BrowserSync → npm run

A recipe to synchronise browser testing.

| cmd | recipe | description |
|:---:|:---|:---|
| `browser-sync` | `browser-sync start --server --files '**/*.css, **/*.js, !node_modules/**/*' --port 7777 --proxy 'localhost' --browser 'FirefoxDeveloperEdition'` | Browser sync file changes on edit to the browser |
