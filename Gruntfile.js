module.exports = function(grunt) {
  

  // Load grunt NPM tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  // Grunt config
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
      all: {
        files: '<%= jshint.all %>',
        tasks: [
          'jshint',
          'simplemocha'
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
    }
  });


  // Grunt tasks
  grunt.registerTask('default', [
    'jshint', 
    'simplemocha', 
    'concurrent:target'
  ]);
  

};