var settings = {};

module.exports = function(grunt) {
  settings.loadNpmTasks(grunt);
  settings.registerTasks(grunt);
  settings.config(grunt);
};
  

settings.loadNpmTasks = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};


settings.registerTasks = function (grunt) {
 grunt.registerTask('default', [
    'jshint', 
    'simplemocha', 
    'docco',
    'concurrent:target'
  ]);
};


settings.config = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'server/*.js',
        'server/test/*.js'
      ]
    },

    nodeunit: {
      all: ['server/test/*.js']
    },

    watch: {
      docs: {
        files: 'docs/**',
        tasks: [
          'docco'
        ]
      },
      all: {
        files: '<%= jshint.all %>',
        tasks: [
          'jshint',
          'simplemocha',
          'docco'
        ]
      }
    },

    simplemocha: {
      options: {
        reporter: 'spec'
      },

      all: { 
        src: 'server/test/*.js' 
      }
    },

    nodemon: {
      dev: {}
    },

    concurrent: {
      target: {
        options: {
          logConcurrentOutput: true
        },
        tasks: [
          'nodemon', 
          'watch'
        ]
      }
    },

    docco: {
      readme: {
        src: ['docs/ABOUT.md'],
        options: {
          output: 'client/',
          layout: 'linear',
          css: 'docs/css/styles.css',
          extension: '.litcoffee'
        }
      }
    }
  });
};


  
