(function() {
  'use strict';
  module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jade: {
        compile: {
          options: {
            pretty: true,
            data: {
              name: '<%= pkg.name %>',
              keywords: '<%= pkg.keywords %>',
              description: '<%= pkg.description %>',
              path: '../dist'
            }
          },
          files: {
            "demo/index.html": ["src/jade/index.jade"]
          }
        }
      },
      sass: {
        dist: {
          options: {
            style: 'expanded'
          },
          files: [{
            expand: true,
            cwd: 'src/sass',
            src: ['*.scss'],
            dest: 'dist/css',
            ext: '.css'
          }]
        }
      },
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: [{
            expand: true,
            cwd: 'dist/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css',
            ext: '.min.css'
          }]
        }
      },
      jshint: {
        all: ['Gruntfile.js', 'src/js/main.js'],
        app: {
          src: ['src/js/app.js', 'src/js/countdown/*.js']
        }
      },
      requirejs: {
        compile: {
          options: {
            //appDir: './',
            dir: './dist/js',
            baseUrl: './src/js',
            paths: {
              jquery: 'empty:'
            },
            optimize: "uglify",
            optimizeCss: "none",
            removeCombined: true,
            fileExclusionRegExp: /^\.|^build|^dist|^node_modules|\.scss$|\.map$/,
            mainConfigFile: "./src/js/main.js",
            modules: [
              {
                name: 'app',
                exclude: [
                  "jquery"
                ]
              },
              {
                name: 'countdown/constructor'
              },
              {
                name: 'countdown/defaults'
              },
              {
                name: 'countdown/prototype'
              }
            ]
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['jade', 'sass', 'cssmin', 'jshint', 'requirejs']);

  };
}());
