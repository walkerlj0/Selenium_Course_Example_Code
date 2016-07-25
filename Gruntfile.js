'use strict';

module.exports = function (grunt) {
    var testFiles = grunt.file.expand('test/*.js');
    testFiles.shift();
    testFiles = testFiles.map(function(testFile) { return testFile.replace(/test\//, ''); });

    grunt.initConfig({
      shell: {
        runTests: {
            command: function(testFile, testOptions) {
              return 'mocha test/'+testFile+' '+testOptions+''
            }
        },
        runTestsOnCI: {
            command: function(testFile, testOptions) {
              return 'mocha test/'+testFile+' '+testOptions+' -R xunit > test-result-'+testFile+'.xml'
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

    var ci = grunt.option('ci') || 'off',
        tag = grunt.option('tag'),
        testOptions = '';

    if (tag) {
      testOptions = '--grep '+tag+'';
    }

    testFiles.forEach(function(testFile) {
      if (ci === 'on') {
        grunt.registerTask(testFile, ['shell:runTestsOnCI:'+testFile+':'+testOptions+'']);
      } else {
        grunt.registerTask(testFile, ['shell:runTests:'+testFile+':'+testOptions+'']);
      }
    });
};
