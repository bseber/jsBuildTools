

var gulp       = require ('gulp');
var browserify = require ('browserify');
var babelify   = require ('babelify');
var source     = require ('vinyl-source-stream');
var del        = require ('del');
var connect    = require ('gulp-connect');
var livereload = require ('gulp-livereload');
var open       = require ('gulp-open');
var less       = require ('gulp-less');
var mocha      = require ('gulp-mocha');

var cfg = {
    src: './app/',
    dest: './dist/'
};


gulp.task ('clean', function () {
    // cleanup should be synchronous so other tasks
    // have a clean working directory
    return del.sync (cfg.dest);
});

gulp.task ('connect', function () {
    connect.server ({
        root: cfg.dest,
        port: 9001,
        livereload: true
    });

    gulp.src (cfg.dest + 'index.html')
        .pipe (open ('', {url: 'http://localhost:9001'}))
});

gulp.task ('watch', function () {
    gulp.watch (cfg.src + '/index.html', ['copy_html']);
    gulp.watch (cfg.src + '/less/**/*.less', ['less']);
    gulp.watch (cfg.src + '/js/**/*.js', ['browserify']);
});

gulp.task ('copy', function () {
    return gulp.src (cfg.src + 'index.html')
        .pipe (gulp.dest (cfg.dest))
        .pipe (connect.reload ());
});

gulp.task ('less', function () {
    return gulp.src (cfg.src + 'less/main.less')
        .pipe (less ())
        .pipe (gulp.dest (cfg.dest))
        .pipe (connect.reload ());
});


gulp.task ('browserify', function () {
    return browserify (cfg.src + 'js/app.js', {debug: true})
        .transform (babelify)
        .bundle ()
        .pipe (source ('app.js'))
        .pipe (gulp.dest (cfg.dest))
        .pipe (connect.reload ());
});

gulp.task ('mocha', function () {
    return gulp.src ('./test/**/*.spec.js')
        .pipe (mocha ({reporter: 'nyan'}));
});
gulp.task ('mocha:dev', function () {
    gulp.watch ([cfg.src + 'js/**/*.js', './test/**/*.spec.js'], ['mocha']);
});


gulp.task ('serve', [
    'connect',
    'watch'
]);

gulp.task ('build', [
    'clean',
    'copy',
    'less',
    'browserify'
]);


// last cmd, otherwise top requires are failing .__.
// cannot be placed in specs, as only one instance is allowed to be installed
// (specs are reloaded after file change)
require('babel/register');
