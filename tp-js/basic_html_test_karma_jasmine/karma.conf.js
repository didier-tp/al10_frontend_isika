// Karma configuration
module.exports = function(config) {
  config.set({
    
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
	  'js/calcul.js',
      'test/*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
        'test/*.js': [ 'browserify' ]
    },
    plugins: [
        require ('karma-browserify'),
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-spec-reporter'),
        require('karma-jasmine-html-reporter')
    ],
    
	// 'kjhtml' correspond au plugin karma-jasmine-html-reporter
    reporters: ['spec','kjhtml'],
	
	// web server port
    port: 9876,
	
	// enable / disable colors in the output (reporters and logs)
    colors: true,
    
	// level of logging , possible values: config.XY
    // avec XY = LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DISABLE,
	
	// enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
	
	// start these browsers
    browsers: ['Chrome'],
	
    client: {
       clearContext: false
    },
    
	// Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
	
	// Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })}