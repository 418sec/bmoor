// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        files: [
			'src/bMoor.js',
			'test/config.js',
			'src/bmoor/build/**.js',
			'src/bmoor/defer/Stack.js',
			'src/bmoor/comm/**.js',
			'src/bmoor/core/**.js',
			'src/bmoor/error/**.js',
			'test/spec/**/*.js'
		],

        // preprocessors: {
        //   'app/scripts/{,*/}*.js': 'coverage'
        // },
        // reporters: ['coverage'],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};