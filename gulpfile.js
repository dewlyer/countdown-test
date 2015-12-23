(function(){

    'use strict';
    var gulp = require('gulp'),
        rename = require('gulp-rename'),
        jade = require('gulp-jade'),
        sass = require('gulp-sass'),
        cssmin = require('gulp-minify-css'),
        jshint = require('gulp-jshint'),
        requirejs = require('gulp-requirejs-optimize');

    gulp.task('html', function(){
        gulp.src('src/jade/*.jade')
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest('demo'));
    });

    gulp.task('css', function(){
        gulp.src('src/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cssmin({
                compatibility: 'ie8'
            }))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename({
                suffix: ".min",
                extname: ".css"
            }))
            .pipe(gulp.dest('dist/css'))
    });

    gulp.task('jshint', function(){
        gulp.src(['Gruntfile.js', 'src/js/main.js', 'src/js/app.js', 'src/js/countdown/*.js'])
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