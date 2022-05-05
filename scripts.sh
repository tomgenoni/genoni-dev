#!/bin/bash

### A more convenient way to write scripts
### See: https://james-forbes.com/?/posts/alternative-to-npm-scripts

# Add npm binaries to path
PATH=./node_modules/.bin:$PATH

### Init

function init() {
    rm -rf dist && \
    mkdir -p dist/asset/js/ && \
    mkdir -p dist/asset/image/ && \
    mkdir -p dist/asset/css/ && \
    echo '✔ init'
}

### Clean

function clean() {
    rm -rf tmp && \
    echo '✔ clean'
}

### CSS

function css:scss() {
    echo 'css:'
    node-sass -q src/asset/scss/root.scss tmp/root.css && \
    echo '  ✔ scss'
}

function css:postcss() {
    postcss tmp/root.css --no-map --use css-mqpacker cssnano -o dist/asset/css/root.css && \
    echo '  ✔ postcss'
}

# Can only run after 'content' is complete because it needs the HTML
function css:purgecss() {
    purgecss --config config/purgecss.config.js -o dist/asset/css/ && \
    echo '  ✔ purgecss'
}

function css:dev() {
    css:scss && css:postcss
}

function css:prod() {
    css:dev && css:purgecss
}

### Process JS & Copy

function copy:js() {
    ## Files are copied but to minify in production add below to minify()
    cp src/asset/js/*.js dist/asset/js/ && \
    cp node_modules/lazysizes/lazysizes.min.js dist/asset/js/ && \
    cp node_modules/instant.page/instantpage.js dist/asset/js/ && \
    echo '  ✔ js'
}

function copy:font() {
    cp -a src/asset/font/. dist/asset/font/
    echo '  ✔ font'
}

function copy:image() {
    cp -a src/asset/image/. dist/asset/image/
    echo '  ✔ image'
}

function copy() {
    echo 'copy:' && \
    copy:js && copy:font && copy:image
}

### Content

function content() {
    node app/content.js && \
    echo '✔ content'
}

### Minify

function minify() {
    echo 'minify:' && \
    # Minify html
    html-minifier --input-dir ./dist/ --output-dir ./dist/ --file-ext html --collapse-whitespace --minify-css true && \
    echo '  ✔ html'
    # Minify js, leave name same so it works for both dev & prod
    node-minify -c uglify-es -i ./dist/asset/js/instantpage.js -o ./dist/asset/js/instantpage.js -s &&\
    echo '  ✔ js'
}

### Watch & serve

function watch() {
    concurrently \
    "chokidar 'src/asset/scss/**/*.scss' -c 'yarn css:dev'" \
    "chokidar 'src/post/**/*.md' 'src/**/*.njk' -c 'yarn content'" \
    "chokidar 'src/**/*.svg' 'src/**/*.jpg' 'src/**/*.png' 'src/**/*.js' -c 'yarn copy'" \
    "browser-sync start -s 'dist' -f 'dist' --reload-delay 500"
}

### Development

function start() {
    init && content && css:dev && copy && watch
}

### Build

function build() {
    init && content && css:prod && copy && minify && sitemap:build && sitemap:copy && clean
}

### Sitemap

# Build this manually.
function sitemap:build() {
    echo 'sitemap:' && \
    node app/sitemap.js
    echo '  ✔ created'
}

# Copies the sitemap into the `dist` directory on build.
function sitemap:copy() {
    cp ./src/sitemap.xml ./dist/sitemap.xml
    echo '  ✔ copied'
}

# Run a function name in the context of this script
eval "$@"
