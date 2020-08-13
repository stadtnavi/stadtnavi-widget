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
    copy: {
      main: {
        src: 'src/demo.html',
        dest: 'dist/index.html',
      },
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.html', 'test/**/*.js'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'copy']);

};
