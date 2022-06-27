module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { },
      dist: {
        src: [
          'node_modules/leaflet/dist/leaflet-src.js',
          'node_modules/leaflet.photon/leaflet.photon.js',
          'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.js',
          'vendor/**/*.js',
          'src/address-box.js',
          'src/**/*.js',
          '!src/tiny-route-selector.js'
        ],
        dest: 'dist/latest/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'node_modules/leaflet/dist/leaflet.css',
          'node_modules/leaflet.photon/leaflet.photon.css',
          'node_modules/leaflet.locatecontrol/dist/L.Control.Locate.css',
          'src/**/*.css',
          '!src/tiny.css'
        ],
        dest: 'dist/latest/<%= pkg.name %>.css'
      },
      tinyjs: {
        src: [
          'node_modules/@tarekraafat/autocomplete.js/dist/autoComplete.js',
          'node_modules/flatpickr/dist/flatpickr.js',
          'node_modules/flatpickr/dist/l10n/de.js ',
          'src/tiny-route-selector.js'
        ],
        dest: 'dist/latest/tiny-widget.js'
      },
      tinycss: {
        src: [
          'node_modules/@tarekraafat/autocomplete.js/dist/css/autoComplete.02.css',
          'node_modules/flatpickr/dist/flatpickr.css',
          'src/tiny.css'
        ],
        dest: 'dist/latest/tiny-widget.css'
      }
    },
    copy: {
      main: {
        src: 'src/demo.html',
        dest: 'dist/index.html',
      },
      bootstrap: {
        src: 'src/bootstrap.min.css',
        dest: 'dist/bootstrap.min.css',
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
        src: ['node_modules/leaflet/dist/images/*', 'images/*' ],
        dest: 'dist/latest/images/'
      },
      images_versioned: {
        expand: true,
        flatten: true,
        src: ['node_modules/leaflet/dist/images/*', 'images/*' ],
        dest: 'dist/<%= pkg.version %>/images/'
      },
      tinyjs: {
        src: 'dist/latest/tiny-widget.js',
        dest: 'dist/<%= pkg.version %>/tiny-widget.js'
      },
      tinycss: {
        src: 'dist/latest/tiny-widget.css',
        dest: 'dist/<%= pkg.version %>/tiny-widget.css'
      },
      tinydemo: {
        src: 'src/tiny.html',
        dest: 'dist/tiny.html'
      },
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.css', 'src/**/*.html', 'src/**/*.html', 'images/*', 'test/**/*.js'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['concat', 'copy']);

};
