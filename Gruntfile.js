module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'node_modules/leaflet/dist/leaflet-src.js',
          'src/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      tasks: ['concat']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat']);

};
