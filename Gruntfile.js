module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  // configure plugins
  grunt.initConfig({
    clean: {
      build: {
        src: ['public/']
      }
    },

    browserify: {
      dev: {
        files: {
          'public/app.js': ['assets/javascripts/**/*.js']
        }
      },

      dist: {
        files: {
          'tmp/app.js': ['assets/javascripts/**/*.js']
        }
      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
        },
        files: {
          'public/app.min.js': ['tmp/app.js']
        }
      }
    },

    sass: {
      options: {
        includePaths: ['node_modules/bootstrap/scss'],
      },

      dev: {
        options: {
          sourceMap: false,
          outputStyle: 'expanded',
        },
        files: {
          'public/app.css': 'assets/stylesheets/main.scss'
        }
      },

      dist: {
        options: {
          sourceMap: true,
          outputStyle: 'compressed',
        },
        files: {
          'public/app.min.css': 'assets/stylesheets/main.scss'
        }
      }
    },

    copy: {
      dist: {
        files: [{expand: true, cwd: 'assets/images/', src: '*', dest: 'public/images/'}]
      }
    }
  });

  // register tasks
  grunt.registerTask('build:dev', ['clean', 'copy', 'browserify:dev', 'sass:dev']);
  grunt.registerTask('build:prod', ['clean', 'copy', 'browserify:dist', 'uglify', 'sass:dist']);
};
