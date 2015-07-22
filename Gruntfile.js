module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    'clean': {
      test: [
        'test/fixtures/out/'
      ]
    },

    'jshint': {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    'electron-redhat-installer': {
      'options': {
        productDescription: 'Just a test.',
        arch: 'x86',
        rename: function (dest) {
          return dest + '<%= name %>.<%= arch %>.rpm';
        }
      },

      'app-with-asar': {
        src: 'test/fixtures/app-with-asar/',
        dest: 'test/fixtures/out/'
      },

      'app-without-asar': {
        options: {
          arch: 'x86_64',

          icon: 'test/fixtures/icon.png',
          bin: 'resources/cli/bar.sh',
          categories: [
            'Utility'
          ]
        },
        src: 'test/fixtures/app-without-asar/',
        dest: 'test/fixtures/out/'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first lint everything, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'electron-redhat-installer', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);
};
