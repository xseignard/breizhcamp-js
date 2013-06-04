module.exports = function(grunt) {

	// grunt conf
	grunt.initConfig({
		// js linting
		jshint: {
			all: ['src/scripts/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
			options: {
				jshintrc: '.jshintrc'
				//,reporter: 'checkstyle'
			}
		},
		// a dev server
		connect: {
			server: {
				options: {
					port: 8100,
					base: '.'
				}
			}
		},
		// open your prefered browser on the index dev page
		open : {
			dev : {
				path: 'http://localhost:8100/src'
			}
		},
		// check for changes
		watch: {
			// reload web page when a change occurs
			// install livereload browser extension: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
			all: {
				options: { livereload: true },
				files: ['src/**/*.*']
			}
		}
	});


	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');

	// dev task
	grunt.registerTask('dev', ['connect', 'open', 'watch']);
};