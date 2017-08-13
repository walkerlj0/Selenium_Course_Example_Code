'use strict';

module.exports = function (grunt) {
    var testFiles = grunt.file.expand('test/*.js');
    testFiles.shift();
    testFiles = testFiles.map(function(testFile) {
      return testFile.replace(/test\//, '');
    });

    grunt.initConfig({
      shell: {
        runTests: {
          command: function(testFile) {
            return 'mocha test/'+testFile+'';
          }
        }
      },
      parallel: {
        assets: {
          options: {
            grunt: true
          },
          tasks: testFiles
        }
      }
    });

    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('default', ['parallel']);

    testFiles.forEach(function(testFile) {
        grunt.registerTask(testFile, ['shell:runTests:'+testFile+'']);
    });
};
