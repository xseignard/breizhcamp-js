module.exports = function(grunt) {

	// grunt conf
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			// banner that wil be used in files
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + 
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + 
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + 
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
			distDir: 'dist/',
			reports: 'reports'
		},
		
		clean: ['<%= meta.distDir %>', '<%= meta.reports %>'],

		// js linting
		jshint: {
			all: ['src/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
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
		// karma runner testing
		karma: {
			options: {
				configFile: 'conf/karma.conf.js'
			},
			ci: {
				singleRun: true,
				browsers: ['Chrome'],
				reporters: ['junit', 'coverage'],
				preprocessors: {
					'src/**/*.js': 'coverage'
				},
				junitReporter: {
					outputFile: 'reports/TEST-xunit.xml'
				},
				coverageReporter: {
					type: 'lcovonly',
					dir: 'reports/coverage',
					file: 'coverage.xml'
				}
			},
			dev: {
				// spawn karma in a child process in order to be non blocking
				background: true,
				browsers: ['Chrome', 'Firefox']
			},
			e2e: {
				configFile: 'conf/karma.e2e.conf.js'
			}

		},
		// custom shell commands
		shell: {
			e2e: {
				command: 'node tools/web-server.js&grunt karma:e2e;killall node',
				options: {
					stdout: true
				}
			},
			mergeCov: {
				command: 'cd tools;./merge_lcov ../reports/coverage'
			},
			sonar: {
				command: 'PATH="$PWD/tools/sonar-runner-2.2.1/bin:$PATH" sonar-runner',
				options: {
					stdout: true
				}
			}
		},
		// check for changes
		watch: {
			// reload web page when a change occurs
			// install livereload browser extension: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
			all: {
				options: { livereload: true },
				files: ['src/**/*.*']
			},
			// re-run tests when code change
			karma: {
				files: ['src/app/**/*.js', 'test/app/unit/**/*.js'],
				tasks: ['karma:dev:run']
			}
		}
	});


	// task loading
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-shell');


	// dev task
	grunt.registerTask('dev', ['karma:dev', 'watch']);
	// run e2e tasks
	grunt.registerTask('e2e', ['clean', 'shell:e2e']);
	// ci task
	grunt.registerTask('ci', ['clean', 'jshint', 'karma:ci', 'shell:e2e', 'shell:mergeCov', 'shell:sonar']);
	// preview
	grunt.registerTask('preview', ['connect', 'open', 'watch']);
};