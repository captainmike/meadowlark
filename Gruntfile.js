module.exports = function(grunt){
  // load plugins
  [
    'grunt-mocha-cli',
  ].forEach(function(task){
    grunt.loadNpmTasks(task);
  });

  // configure plugins
  grunt.initConfig({
    mochacli: {
      all: ['specs/**/*.js']
    }
  });

  // register tasks
  grunt.registerTask('default', ['mochacli']);
};
