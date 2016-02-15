module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  // configure plugins
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'expanded',
        includePaths: ['node_modules/bootstrap/scss']
      },
      dist: {
        files: {
          'public/app.css': 'assets/stylesheets/main.scss'
        }
      }
    },
    mochacli: {
      all: ['specs/**/*_specs.js']
    },
    jshint: {
      options: {esversion: 6},
      app: ['lib/**/*.js'],
      tests: ['specs/**/*_specs.js']
    }
  });

  // register tasks
  grunt.registerTask('default', ['mochacli', 'jshint']);
};
