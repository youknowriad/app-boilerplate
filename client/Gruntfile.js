module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // validate js files
        jshint: {
            all: ['src/js/**/*.js']
        },

        // Less build
        less: {
            all: {
                options: {
                    yuicompress: true
                },
                files: {
                    "../public/css/main.css": "src/less/main.less"
                }
            }
        },

        // Copy assets
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src', src: ['index.html'], dest: '../public'},
                    {expand: true, cwd: 'src/partials', src: ['**'], dest: '../public/partials'}
                ]
            }
        },

        // Concat Files
        concat: {

            application: {
                src: [
                    'src/js/app.js',
                    'src/js/service/*.js',
                    'src/js/controller/*.js',
                    'src/js/*.js'
                ],
                dest: '../public/js/app.js'
            },

            vendors: {
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',

                    'bower_components/angular-datastore/src/module.js',
                    'bower_components/angular-datastore/src/**/*.js'
                ],
                dest: '../public/js/vendor.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['less', 'copy', 'concat', 'jshint']);
    grunt.registerTask('dev', ['less', 'copy', 'concat']);
};
