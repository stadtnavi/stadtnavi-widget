module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { },
      dist: {
        src: [
          'node_modules/leaflet/dist/leaflet-src.js',
          'node_modules/leaflet.photon/leaflet.photon.js',
          'src/**/*.js'
        ],
        dest: 'dist/latest/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'node_modules/leaflet/dist/leaflet.css',
          'node_modules/leaflet.photon/leaflet.photon.css',
          'src/**/*.css'
        ],
        dest: 'dist/latest/<%= pkg.name %>.css'
      }
    },
    copy: {
      main: {
        src: 'src/demo.html',
        dest: 'dist/index.html',
      },
      version: {
        src: 'dist/latest/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.version %>/<%= pkg.name %>.js'
      },
      css: {
        src: 'dist/latest/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.version %>/<%= pkg.name %>.css'
      },
      images_latest: {
        expand: true,
        flatten: true,
        src: 'node_modules/leaflet/dist/images/*',
        dest: 'dist/latest/images/'
      },
      images_versioned: {
        expand: true,
        flatten: true,
        src: 'node_modules/leaflet/dist/images/*',
        dest: 'dist/<%= pkg.version %>/images/'
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
