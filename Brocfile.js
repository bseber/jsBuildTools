
var pickFiles       = require ('broccoli-static-compiler')
var mergeTrees      = require ('broccoli-merge-trees')
var compileLess     = require ('broccoli-less-single')
var browserify      = require ('broccoli-browserify-cache');
var watchify        = require ('broccoli-watchify')
var copy            = require ('broccoli-copy')
var babelify        = require ('babelify')


var cfg = {
    src: './app',
    dest: '.'
};


var app = cfg.src;
app = pickFiles (app, {
    srcDir: '/',
    files: ['**/*.js', 'index.html'],
    destDir: '.'
});


var styles = cfg.src
styles = pickFiles(styles, {
    srcDir: '/',
    files: ['**/*.less'],
    destDir: '.'
})

var sourceTrees = [app, styles];


var appJs = watchify (cfg.src, {
    browserify: {
        entries: ['./js/app.js'],
        debug: true,
        transform: [babelify]
    },
    outputFile: 'app.js',
    cache: true
});

var appCss = compileLess (sourceTrees, 'less/main.less', 'main.css')

var appHtml = copy (sourceTrees, {
    extensions: ['html']
});

// merge js, css and public file trees, and export them
module.exports = mergeTrees([appJs, appCss, appHtml])