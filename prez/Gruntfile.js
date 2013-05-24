module.exports = function(grunt) {

	// task to generate the slides
	grunt.registerTask('slides', 'generates slides from markdown', function() {
		var generation = 'cd scripts;python render.py',
		exec = require('child_process').exec,
		done = this.async();

		process.stdout.write('Generating slides...\n');
		var cmd = exec(generation);
		cmd.stdout.on('data', function (data) {
			grunt.log.writeln(data);
		});
		cmd.stderr.on('data', function (data) {
			grunt.log.errorlns(data);
		});
		cmd.on('exit', function (code) {
			if (code !== 0) throw new Error(item + ' failed');
			done();
		});
	});

	// grunt conf
	grunt.initConfig({
		watch: {
			// re-generate slides when a change occurs
			slides: {
				files: ['slides/*.*','scripts/*.*'],
				tasks: ['slides']
			},
			// reload web page when a change occurs
			// install livereload browser extension: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
			// if chrome, be sure to enable “Allow access to file URLs” checkbox in Tools > Extensions > LiveReload after installation.
			web: {
				options: { livereload: true },
				files: ['index.html',
						'slide_config.js',
						'theme/**/*.*',
						'js/**/*.*',
						'images/**/*.*']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
};