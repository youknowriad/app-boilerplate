module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // validate js files
        jshint: {
            all: ['app/**/*.js', 'angular-data/**/*.js']
        },

        // Less build
        less: {
            all: {
                options: {
                    yuicompress: true
                },
                files: {
                    "public/css/main.css": "app/less/main.less"
                }
            }
        },

        // Copy assets
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'app', src: ['index.html'], dest: 'public'},
                    {expand: true, cwd: 'app/partials', src: ['**'], dest: 'public/partials'},
                    {expand: true, cwd: 'bower_components/semantic/build/less/fonts', src: ['**'], dest: 'public/fonts'},
                    {expand: true, cwd: 'bower_components/semantic/build/less/images', src: ['**'], dest: 'public/images'}
                ]
            }
        },

        // Concat Files
        concat: {

            application: {
                src: ['app/**/*.js'],
                dest: 'public/js/app.js'
            },

            vendors: {
                src: [

                    'bower_components/jquery/jquery.min.js',
                    'bower_components/angular/angular.min.js',

                    'bower_components/semantic/build/less/**/*.js',

                    'angular-data/module.js',
                    'angular-data/**/*.js'
                ],
                dest: 'public/js/vendor.js'
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
