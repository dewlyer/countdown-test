module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass',
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
      all: ['Gruntfile.js', 'js/main.js'],
      app: {
        src: ['js/app.js', 'js/countdown/*.js']
      }
    },
    requirejs: {
      compile: {
        options: {
          //appDir: './',
          baseUrl: './js',
          dir: './dist/js',
          //out: "./dist/js/r.min.js",
          paths: {
              jquery: 'jquery/1.9.1/jquery.min'
          },
          //allowSourceOverwrites: true,
          optimize: "uglify",
          optimizeCss: "none",
          removeCombined: true,
          fileExclusionRegExp: /^\.|^build|^dist|^node_modules|\.scss$|\.map$/,
          mainConfigFile: "js/main.js",
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'requirejs']);

};
