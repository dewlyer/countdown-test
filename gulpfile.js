(function(){

    'use strict';
    var pkg =  require('./package.json'),
        gulp = require('gulp'),
        rename = require('gulp-rename'),
        jade = require('gulp-jade'),
        sass = require('gulp-sass'),
        cleancss = require('gulp-clean-css'),
        jshint = require('gulp-jshint'),
        //browserSync = require('browser-sync'),
        requirejs = require('gulp-requirejs-optimize');

    gulp.task('html', function(){
        gulp.src('src/jade/*.jade')
            .pipe(jade({
                pretty: true,
                data: {
                    debug: false,
                    name: pkg.name,
                    keywords: pkg.keywords,
                    description: pkg.description,
                    src: require('./source.json')
                }
            }))
            .pipe(gulp.dest('demo'));
    });

    gulp.task('css', function(){
        gulp.src('src/sass/**/*.scss')
            .pipe(sass({linefeed: 'crlf'}).on('error', sass.logError))
            .pipe(cleancss({compatibility: 'ie8', keepSpecialComments: 0}))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename({
                suffix: ".min",
                extname: ".css"
            }))
            .pipe(gulp.dest('dist/css'))
    });

    gulp.task('jshint', function(){
        gulp.src(['gruntfile.js', 'src/js/main.js', 'src/js/app.js', 'src/js/countdown/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    gulp.task('requirejs', ['jshint'], function(){
        gulp.src('src/js/**/*.js')
            .pipe(requirejs({
                baseUrl: './src/js',
                paths: {
                    jquery: 'empty:'
                },
                optimize: "uglify",
                optimizeCss: "none",
                removeCombined: true,
                mainConfigFile: "./src/js/main.js"
            }))
            .pipe(gulp.dest('./dist/js'));
    });

    gulp.task('default', ['html', 'css', 'jshint', 'requirejs']);

}());