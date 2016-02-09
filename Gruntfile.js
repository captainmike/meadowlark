module.exports = function(grunt){
  // load plugins
  [
    'grunt-mocha-cli',
    'grunt-contrib-jshint',
  ].forEach(function(task){
    grunt.loadNpmTasks(task);
  });

  // configure plugins
  grunt.initConfig({
    mochacli: {
      all: ['specs/**/*_specs.js']
    },
    jshint: {
      app: ['lib/**/*.js'],
      tests: ['specs/**/*_specs.js'],
      options: {esversion: 6}
    }
  });

  // register tasks
  grunt.registerTask('default', ['mochacli', 'jshint']);
};
