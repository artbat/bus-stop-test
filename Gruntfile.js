module.exports = function(grunt) {
  'use strict';

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

    karma: {
      unit: {
        options: {
          files: ['server/test/*.js'],
          background: true
        }
      }
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
        reporter: 'nyan'
      },

      all: { 
        src: 'server/test/*.js' 
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('default', ['jshint', 'simplemocha', 'watch']);
  // grunt.registerTask('default', ['jshint', 'karma:unit:run', 'watch']);
};