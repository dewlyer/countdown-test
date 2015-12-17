module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          appDir: './',
          dir: './dist',
          optimize: "uglify",
          optimizeCss: "standard",
          mainConfigFile: "./js/main.js",
          removeCombined: true,
          fileExclusionRegExp: /^\.|^build|^dist|^node_modules|\.scss$|\.map$/,
          //baseUrl: 'js',
          //paths: {
          //    jquery: 'jquery/1.9.1/jquery.min'
          //},
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs']);

};