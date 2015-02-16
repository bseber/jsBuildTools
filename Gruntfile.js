
var babelify = require ('babelify');


module.exports = function (grunt) {

    grunt.loadNpmTasks ('grunt-browserify');
    grunt.loadNpmTasks ('grunt-contrib-less');
    grunt.loadNpmTasks ('grunt-contrib-copy');
    grunt.loadNpmTasks ('grunt-contrib-watch');
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-mocha-test');

    var cfg = {
        src: 'app/',
        dest: 'dist/'
    };

    grunt.initConfig ({

        clean: {
            build: ['dist/']
        },

        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: cfg.src + 'js/*.js',
                tasks: ['mochaTest', 'browserify']
            },
            html: {
                files: cfg.src + 'index.html',
                tasks: ['copy']
            },
            less: {
                files: cfg.src + 'less/**.less',
                tasks: ['less']
            }
        },

        copy: {
            html: {
                src: cfg.src + 'index.html',
                dest: cfg.dest + 'index.html'
            }
        },

        less: {
            development: {
                files: {
                    'dist/main.css': cfg.src + 'less/main.less'
                }
            }
        },

        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        debug    : true,
                        transform: [babelify]
                    }
                },
                src: cfg.src + 'js/app.js',
                dest: cfg.dest + 'app.js'
            }
        },

        mochaTest: {
            test: {
                src: ['test/**/*.spec.js']
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: cfg.dest,
                    livereload: true,
                    open: true
                }
            }
        }
    });

    grunt.registerTask ('serve', [
        'connect',
        'watch'
    ]);

    grunt.registerTask ('build', [
        'clean',
        'copy',
        'less',
        'browserify'
    ]);

    grunt.registerTask ('default', [
        'build'
    ]);
};