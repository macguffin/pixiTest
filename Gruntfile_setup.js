module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('IWG_SETUP.json');
    var path = require('path')
    //webpack PROJECT_PATH
    var IwgIncludes_ORIENTATION = "_" + pkg.ORIENTATION;
    switch (IwgIncludes_ORIENTATION) {
    case "L":
        IwgIncludes_ORIENTATION = "_L";
        break;
    case "P":
        IwgIncludes_ORIENTATION = "_P";
        break
    case"DL":
        IwgIncludes_ORIENTATION = "{pL}";
        break;
    }
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.initConfig({
        clean: {
            gitjunk: {
                src: ["gitjunk"]
            },
            readme: {
                src: ["README.md"]
            },
        },
        mkdir: {
            all: {
                options: {
                    create: ['_assets', 'GAME/IWG', 'GAME/IWG_DEV/src/imports/audio', 'GAME/IWG_DEV/src/imports/font', 'GAME/IWG_DEV/src/imports/fx','GAME/IWG_DEV/src/imports/s2d']
                },
            },
        },
        rename: {
            main: {
                files: [
                    //rename files based on SETUP.json
                    {src: "./%ignore%", dest: "./.gitignore"},
                    //docs
                    {src: "_assets/spine/%GAME_NAME%_P.spine", dest: "_assets/spine/" + pkg.GAME_NAME + "_P.spine"},
                    //IWG
                    {src: "GAME/IWG_DEV/src/%CSS_NAME%.css", dest: "GAME/IWG_DEV/src/" + pkg.CSS_NAME + ".css"},
                    //docs
                    {src: "docs/%GAME_NAME% Submission form.docx", dest: "docs/" + pkg.GAME_NAME + " Submission form.docx"},
                ]
            }
        },
        replace: {
            webpack_config: {
                options: {
                    patterns: [
                        {
                            match: /@@DEV_BASE_PATH/g,
                            replacement: pkg.DEV_BASE_PATH
                        }, {
                            match: /@@PROJECT_PATH/g,
                            replacement: path.resolve()
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['./webpack.config.js'], dest: './'}
                ]
            },
            iwgIncludes: {
                options: {
                    patterns: [
                        //includes
                        {
                            match: /@@_orientation/g,
                            replacement: IwgIncludes_ORIENTATION
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['./GAME/IWG_DEV/src/IwgIncludes.js'], dest: './GAME/IWG_DEV/src/'}
                ]
            },
            index: {
                options: {
                    patterns: [
                        {
                            match: /@@GAME_TITLE/g,
                            replacement: pkg.GAME_TITLE
                        },
                        {
                            match: /@@CSS_NAME/g,
                            replacement: pkg.CSS_NAME
                        },
                        {
                            match: /@@ORIENTATION/g,
                            replacement: pkg.ORIENTATION
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['./GAME/IWG_DEV/index.html'], dest: './GAME/IWG_DEV/'}
                ]
            },
            MIWGbuild: {
                options: {
                    patterns: [
                        {
                            match: /@@CSS_NAME/g,
                            replacement: pkg.CSS_NAME
                        },
                        {
                            match: /@@GAME_NAME/g,
                            replacement: pkg.GAME_NAME
                        }, {
                            match: /@@_orientation/g,
                            replacement: pkg.ORIENTATION
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['./build/MIWGbuild.json'], dest: './build/'}
                ]
            },
        }
    });
    grunt.registerTask('default', ['mkdir', 'rename', 'replace']);
};
