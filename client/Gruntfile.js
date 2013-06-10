module.exports = function(grunt) {

  // grunt conf
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // some metadata
    distDir: 'dist',
    meta: {
      // banner that wil be used in files
      banner:
      '/**\n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed <%= pkg.license %>\n' +
      ' */\n',
      reportsDir: 'reports'
    },

    // sources definition
    src: {
      js: ['src/app/**/*.js'], 
      tpl: ['src/app/**/*.tpl.html'],
      tpljs: ['<%= distDir %>/tmp/**/*.js'],
      index: 'src/index.html',
      assets: 'src/assets',
      unit: ['test/unit/**/*.test.js'],
      e2e: ['test/e2e/**/*.e2e.js']
    },
    // delete files and folders
    clean: {
      // delete dist folder and reports one
      defaults: ['<%= distDir %>', '<%= meta.reportsDir %>'],
      // delete artifacts produced during build
      postBuild: [
        '<%= distDir %>/assets/<%= pkg.name %>.annotated.js',
        '<%= distDir %>/tmp'
      ]
    },
    // concat js files of our app
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= src.js %>', '<%= src.tpljs %>'],
        dest: '<%= distDir %>/assets/<%= pkg.name %>.js'
      }
    },
    // use ng-min to annotate the sources before minifying
    ngmin: {
      dist: {
        src: ['<%= distDir %>/assets/<%= pkg.name %>.js'],
        dest: '<%= distDir %>/assets/<%= pkg.name %>.annotated.js'
      }
    },
    // wrap angular templates in js files 
    // and create a module that will add them into the angular $templateCache
    html2js: {
      app: {
        options: {
          module: 'bzh.geektic.templates'
        },
        src: ['<%= src.tpl %>'],
        base: 'src/app',
        dest: '<%= distDir %>/tmp/tpl.js'
      }
    },
    // minify the app and vendor libs
    uglify: {
      dist: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= distDir %>/assets/<%= pkg.name %>.min.js': [ '<%= distDir %>/assets/<%= pkg.name %>.annotated.js' ]
        }
      },
      vendor: {
        files: [
          {
            expand: true,
            cwd: '<%= distDir %>/tmp/vendor',
            src: ['*.js'],
            dest: '<%= distDir %>/assets/vendor',
            ext: '.js'
         }
        ]
      }
    },
    // copy assets
    copy: {
      assets: {
        files: [{src: ['**'], dest: '<%= distDir %>/assets/', cwd: 'src/assets', expand: true}]
      },
      gumby: {
        files: [{src: ['css/gumby.css', 'fonts/**'], dest: '<%= distDir %>/assets/styles/gumby', cwd: 'components/gumby', expand: true}]
      },
      nonBower: {
        files: [{src: ['ScrollToPlugin.js'], dest: '<%= distDir %>/tmp/vendor', cwd: 'components/tweenMax/src/uncompressed/plugins/', expand: true}]
      }
    },
    // copy bower deps
    bower: {
      dev: {
        dest: '<%= distDir %>/tmp/vendor'
      }
	},
    // js linting
    jshint: {
      all: ['src/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
      options: {
        jshintrc: '.jshintrc'
        //,reporter: 'checkstyle'
      }
    },
    // karma runner testing
    karma: {
      options: {
        configFile: 'conf/karma.conf.js'
      },
      dev: {
        // spawn karma in a child process in order to be non blocking
        background: true,
        browsers: ['Chrome', 'Firefox']
      },
      unit: {
        singleRun: true,
        browsers: ['Chrome'],
        reporters: ['junit', 'coverage'],
        preprocessors: {
          'src/**/*.js': 'coverage'
        },
        junitReporter: {
          outputFile: '<%= meta.reportsDir %>/TEST-xunit.xml'
        },
        coverageReporter: {
          type: 'lcovonly',
          dir: '<%= meta.reportsDir %>/coverage',
          file: 'coverage.xml'
        }
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
        command: 'cd tools;./merge_lcov ../<%= meta.reportsDir %>/coverage'
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
        files: ['src/app/**/*.js', 'test/unit/**/*.js'],
        tasks: ['karma:dev:run']
      }
    }
  });


  // task loading
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell');
  
  // task to process src/index.html and return the regular index.html and the one for e2e testing (index-e2e.html)
  grunt.registerTask('index', 'Process index.html template', function () {
    grunt.file.copy('src/index.html', 'dist/index.html', { process: grunt.template.process });
    grunt.config.set('e2e', true);
    grunt.file.copy('src/index.html', 'dist/index-e2e.html', { process: grunt.template.process });
    grunt.config.set('e2e', false);
  });
  // tasks to set dev/prod flag
  grunt.registerTask('devFlag', 'dev flag', function () {
    grunt.config.set('dev', true);
    grunt.config.set('prod', false);

  });
   grunt.registerTask('prodFlag', 'prod flag', function () {
    grunt.config.set('prod', true);
    grunt.config.set('dev', false);
  });

  // TODO : dev task
  
  // run e2e scenario
  grunt.registerTask('e2e', ['shell:e2e']);
  // run sonar
  grunt.registerTask('sonar', ['shell:mergeCov', 'shell:sonar']);
  // build
  grunt.registerTask('build', ['clean:defaults', 'html2js', 'jshint', 'concat', 'ngmin:dist', 'copy', 'bower', 'uglify', 'index', 'clean:postBuild']);
  // dev build
  grunt.registerTask('dev-build', ['devFlag', 'build', 'karma:unit']);
  // prod build
  grunt.registerTask('prod-build', ['prodFlag', 'build', 'karma:unit', 'e2e']);
  // ci task
  grunt.registerTask('ci', ['dev-build', 'sonar']);

};