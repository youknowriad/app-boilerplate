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
                    "public/css/main.css": "src/less/main.less"
                }
            }
        },

        // Copy assets
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src', src: ['index.html'], dest: 'public'},
                    {expand: true, cwd: 'src/partials', src: ['**'], dest: 'public/partials'},
                    {expand: true, cwd: 'bower_components/semantic/build/packaged/fonts/*', src: ['**'], dest: 'public/fonts'},
                    {expand: true, cwd: 'bower_components/semantic/build/packaged/images/*', src: ['**'], dest: 'public/images'}
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
                    'bower_components/semantic/build/packaged/javascript/semantic.min.js',

                    'bower_components/jquery/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                ],
                dest: 'public/js/vendor.js'
            },

            vendors_stylesheets: {
                src: [
                    'bower_components/semantic/build/packaged/css/semantic.min.css'
                ],
                dest: 'public/css/vendor.css'
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'public',
                    keepalive: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['less', 'copy', 'concat', 'jshint']);
    grunt.registerTask('dev', ['less', 'copy', 'concat']);
    grunt.registerTask('server', ['connect']);
};
