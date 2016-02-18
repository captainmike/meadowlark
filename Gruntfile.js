module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  // configure plugins
  grunt.initConfig({
    jshint: {
      options: {esversion: 6},
      app: ['lib/**/*.js'],
      tests: ['specs/**/*_specs.js']
    },

    mochacli: {
      all: ['specs/**/*_specs.js']
    },

    clean: {
      build: {
        src: ['public/']
      }
    },

    sass: {
      options: {
        includePaths: ['node_modules/bootstrap/scss'],
      },

      dev: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded',
        },
        files: {
          'public/app.css': 'assets/stylesheets/main.scss'
        }
      },

      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed',
        },
        files: {
          'public/app.css': 'assets/stylesheets/main.scss'
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
  grunt.registerTask('default', ['mochacli', 'jshint']);
  grunt.registerTask('build:dev', ['clean', 'copy:dist', 'sass:dev']);
  grunt.registerTask('build:prod', ['clean', 'copy:dist', 'sass:dist']);
};
