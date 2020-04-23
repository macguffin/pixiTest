
//
'use strict';

module.exports = function (grunt) {
    //  grunt.file.setBase('../')
    // Project configuration.
    var tempManifest = '';
    var InjectMe = '';
    var minifyMe = '';
    var pkg = grunt.file.readJSON('MIWGbuild.json');
    var path = require('path');
    var timestamp = grunt.template.today("yyyy_mm_dd__h-MM-ss");
    var buildstamp = "2_0_1";
    //
    grunt.initConfig({
        pkg: function (_pkg) {
            pkg._____name = pkg._____name.replace(/ /g, '_');
            _pkg._____name = _pkg._____name.replace(/ /g, '_');
            return _pkg
            console.log(' pkg._____name', pkg._____name);
            console.log(' _pkg._____name', _pkg._____name);
        }(grunt.file.readJSON('MIWGbuild.json')),
        replace: {
            //**********************************************************************************************************
            //MANIFEST

            extractTemp_Manifest: {
                //exstact _manifest
                src: ['<%= pkg._____basepath %>/src/IwgIncludes.js'],
                dest: 'bin/temp/includee.txt',
                replacements: [{
                    from: /var.*_manifest.*=.*\[([^\)]+)\]/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        tempManifest = matchedWord.replace(/(var.*_manifest.*=.*\[)|(.*\].*)/igm, '');
                        return regexMatches;   //
                    }
                }]

            },

            writeTemp_Manifest: {
                //write tempManifest to includee.txt
                src: ['bin/temp/includee.txt'],
                overwrite: true,
                replacements: [{
                    from: /([^]+)/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        return tempManifest;   //
                    }
                }]

            },
            cleanTemp_Manifest: {
                //clean includee.txt
                src: ['bin/temp/includee.txt'],
                overwrite: true,
                replacements: [{
                    from: /^\s*[\r\n\s]/gm,
                    to: ''  //

                }]
            },

            //^((?!src).)*$
            makeMinifyME: {
                //these will be used to make the minified file
                src: ['bin/temp/includee.txt'],
                dest: 'bin/temp/minifyMe.txt',
                replacements: [{
                    //^(?=.*?\bimports\b)(?=.*?\bmandatory\b)((?!avoid|illegal).)*$.
                    from: /^.*\b(imports|thirdParty|mp3|oog|png|jpg)\b.*$/gm,
                    to: ''
                }]
            },
            clean_makeMinifyME: {
                //clean includee.txt
                src: ['bin/temp/minifyMe.txt'],
                overwrite: true,
                replacements: [{
                    from: /^\s*[\r\n\s]/gm,
                    to: ''  //

                }]
            },
            make_include_inc: {
                //these will be re-injected into the manifest as they were excluded from the minification process

                src: ['bin/temp/minifyMe.txt'],
                dest: 'include.inc',
                replacements: [{
                    /**
                     /(([A-Z]*[a-z]*?)/).*(\.js)/igm //get js stings
                     */
                    from: /{["']src(.*?)["']}.*/igm,
                    // from: /(([A-Z]*[a-z]*?)\/).*(\.js)/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var src = matchedWord.match(/(([A-Z]*[a-z]*?)\/).*(\.js)/igm)
                        src[0] = "@require " + pkg._____basepath + src[0].replace(/{[Pp][Ll]}/gm, "_" + pkg._____orientation)
                        return src[0];   //
                    }
                }]
            },
            make_include_inc_L: {
                //these will be re-injected into the manifest as they were excluded from the minification process

                src: ['bin/temp/minifyMe.txt'],
                dest: 'include_L.inc',
                replacements: [{
                    /**
                     /(([A-Z]*[a-z]*?)/).*(\.js)/igm //get js stings
                     */
                    from: /{["']src(.*?)["']}.*/igm,
                    // from: /(([A-Z]*[a-z]*?)\/).*(\.js)/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var src = matchedWord.match(/(([A-Z]*[a-z]*?)\/).*(\.js)/igm)
                        src[0] = "@require " + pkg._____basepath + src[0].replace(/{[Pp][Ll]}/gm, "_L")
                        return src[0];   //
                    }
                }]
            },
            make_include_inc_P: {
                //these will be re-injected into the manifest as they were excluded from the minification process

                src: ['bin/temp/minifyMe.txt'],
                dest: 'include_P.inc',
                replacements: [{
                    /**
                     /(([A-Z]*[a-z]*?)/).*(\.js)/igm //get js stings
                     */
                    from: /{["']src(.*?)["']}.*/igm,
                    // from: /(([A-Z]*[a-z]*?)\/).*(\.js)/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var src = matchedWord.match(/(([A-Z]*[a-z]*?)\/).*(\.js)/igm)
                        src[0] = "@require " + pkg._____basepath + src[0].replace(/{[Pp][Ll]}/gm, "_P")
                        return src[0];   //
                    }
                }]
            },

            makeInjectME: {
                //these will be re-injected into the manifest as they were excluded from the minification process

                src: ['bin/temp/includee.txt'],
                dest: 'bin/temp/injectMe.txt',
                replacements: [{
                    from: /^((?!imports|thirdParty|\.mp3|\.oog|\.png|\.jpg).)*$/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        return '';   //
                    }
                }]
            },
            clean_InjectME: {
                //clean includee.txt
                src: ['bin/temp/injectMe.txt'],
                overwrite: true,
                replacements: [{
                    from: /^\s*[\r\n\s]/gm,
                    to: ''  //

                }]
            },
            capture_InjectMe: {
                //write tempManifest to includee.txt
                src: ['bin/temp/injectMe.txt'],
                overwrite: true,
                replacements: [{
                    from: /([^]+)/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        InjectMe = matchedWord;
                        return tempManifest;   //
                    }
                }]

            },

            makeLive_Manifest: {
                //turn minifyMe into minifyMe.json
                src: ['<%= pkg._____basepath %>/src/IwgIncludes.js'],
                dest: 'bin/temp/IwgIncludes.js',
                // destination directory or file
                replacements: [{
                    from: /var.*_manifest.*=.*\[([^\)]+)\]/igm,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        // matchedWord:  "world"
                        // index:  6
                        // fullText:  "Hello world"
                        // regexMatches:  ["ld"]
                        pkg._____name = pkg._____name.replace(/ /g, '_');
                        console.log(' pkg._____name', pkg._____name);
                        var dualLayout = "";
                        if (pkg._____orientation === "DL") {
                            dualLayout = "{pL}";
                        }
                        return 'var _manifest=[' + InjectMe +
                            '{"src":"src/<%= pkg._____name %>' + dualLayout + '.min.js","id":"<%= pkg._____name %>"}]';   //
                    }
                }]
            },
            removeSourceMaps: {
                //turn minifyMe into minifyMe.json
                src: ['bin/temp/<%= pkg._____name %>.js'],
                overwrite: true,
                // destination directory or file
                replacements: [{
                    from: /\/\/\# sourceMappingURL=(.*).map[;]?/g,
                    to: ""
                }]
            }
            //MANIFEST
            //**********************************************************************************************************
        },
        //**********************************************************************************************************
        //MAKE COMBINED GAME FILE
        concatinclude: {

            options: {
                separator: ';\n'
            },
            iwg: {
                files: function () {
                    var files;
                    if (pkg._____orientation === "DL") {
                        files = {
                            'bin/temp/<%= pkg._____name %>_L.js': ['include_L.inc'],
                            'bin/temp/<%= pkg._____name %>_P.js': ['include_P.inc']
                        }
                    } else {
                        files = {
                            'bin/temp/<%= pkg._____name %>.js': ['include.inc']
                        }
                    }
                    return files
                }()
            }
        },
        //**********************************************************************************************************
        //UGLIFY GAME FILE
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*!<%= pkg._____name %> ' + timestamp + ' __version__ <%= pkg._____version %>  : buildProcess_' + buildstamp + '*/\nvar timestamp_iwg=":::: <%= pkg._____name %> ' + timestamp + '\";'
            },
            dist: {
                files: function () {
                    var files;
                    if (pkg._____orientation === "DL") {
                        files = {
                            'bin/temp/<%= pkg._____name %>_L.min.js': ['bin/temp/<%= pkg._____name %>_L.js'],
                            'bin/temp/<%= pkg._____name %>_P.min.js': ['bin/temp/<%= pkg._____name %>_P.js']
                        }
                    } else {
                        files = {
                            'bin/temp/<%= pkg._____name %>.min.js': ['bin/temp/<%= pkg._____name %>.js'],
                        }
                    }
                    return files
                }()
            }
        },
        //**********************************************************************************************************
        //INFO.XML GAME FILE

        //**********************************************************************************************************
        //ZIP GAME FILE
        copy: {
            IWGfolder: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['<%= pkg._____basepath %>/**/imports/**', '<%= pkg._____basepath %>/**/thirdParty/**', '<%= pkg._____basepath %>/**/thirdparty/**'],
                        dest: 'bin/temp/',
                    }

                ]
            },
            baseFile_min: {
                files: [
                    // includes files within path
                    {
                        expand: true, src: [
                            'bin/temp/<%= pkg._____name %>.min.js',
                            'bin/temp/<%= pkg._____name %>_L.min.js',
                            'bin/temp/<%= pkg._____name %>_P.min.js',
                            '<%= pkg._____basepath%>/<%= pkg._____src%>/<%= pkg._____gameCSS %>',
                            'bin/temp/IwgIncludes.js',
                            '<%= pkg._____basepath%>/<%= pkg._____src%>/browserMatrix.json'],
                        dest: 'bin/temp/<%= pkg._____basepath%>/<%= pkg._____src%>', flatten: true
                    },


                ]
            },
            minifiedFolder: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['**'],
                        dest: '<%=pkg._____minifiedUploadPath%>',
                        cwd: 'bin/temp/<%= pkg._____basepath%>'
                    },


                ]
            }
        },

        compress: {
            'make_unminified_source_folder': {
                options: {
                    mode: 'zip',
                    archive: 'bin/temp/<%= pkg._____name %>.zip'
                },
                src: ['<%= pkg._____basepath%>/**'],
                filter: function (filepath) {
                    console.log('added to unminified_source_folder :', filepath);
                    return 'isFile'
                }
            },
            'make_minified_source_folder': {
                options: {
                    mode: 'zip',
                    archive: 'bin/temp/<%= pkg._____name %>_min.zip'
                },
                expand: true,
                cwd: 'bin/temp/<%= pkg._____basepath%>/',
                src: ['<%= pkg._____src%>/**'],
                filter: function (filepath) {
                    console.log('added to minified_source_folder :', filepath);
                    return 'isFile'
                }
            },
            'make_master_Zip': {
                options: {
                    mode: 'zip',
                    archive: 'bin/<%=pkg._____orientation %>_<%= pkg._____name %>_' + timestamp + '.zip'
                },
                expand: true,
                cwd: 'bin/temp/',
                // Files will zip to 'hello.js' and 'world.js'
                src: ['info.xml',
                    '../<%= pkg._____name %>*.html',
                    '<%= pkg._____name %>.zip',
                    '<%= pkg._____name %>_min.zip',
                    '<%= pkg._____name %>*.txt'],
                filter: function (filepath) {
                    console.log('added to GTP zip :', filepath);
                    return 'isFile'
                }
            },
            'make_master_Zip_min_only': {
                options: {
                    mode: 'zip',
                    archive: 'bin/<%=pkg._____orientation %>_<%= pkg._____name %>_' + timestamp + '_gtp.zip'
                },
                expand: true,
                cwd: 'bin/temp/',
                // Files will zip to 'hello.js' and 'world.js'
                src: ['info.xml',
                    '../<%= pkg._____name %>*.html',
                    '<%= pkg._____name %>_min.zip',
                    '<%= pkg._____name %>*.txt'],
                filter: function (filepath) {
                    console.log('added to GTP zip :', filepath);
                    return 'isFile'
                }
            }
        },
        rename: {
            "teamdrive": {
                files: [
                    {
                        src: ['bin/<%=pkg._____orientation %>_<%= pkg._____name %>_' + timestamp + '.zip'],
                        dest: 'bin/<%=pkg._____orientation %>_<%= pkg._____name %>_' + timestamp + '_teamDrive.zip'
                    },
                ]
            },
            "gtp": {
                files: [
                    {
                        src: ['bin/<%=pkg._____orientation %>_<%= pkg._____name %>_' + timestamp + '_gtp.zip'],
                        dest: 'bin/<%=pkg._____orientation %>_<%= pkg._____name %>_' + timestamp + '.zip'
                    },
                ]
            }
        },
        clean: {
            start: {
                src: ["bin/temp/", "bin/minified/", "include.inc", "include_L.inc", "include_P.inc"]
            },
            end: {
                src: ["bin/temp/", "include.inc", "include.inc", "include_L.inc", "include_P.inc"]
            }
        }
    });
    grunt.file.setBase('../')
//https://github.com/yoniholmes/grunt-text-replace
    grunt.loadNpmTasks('grunt-text-replace');
//https://www.npmjs.com/package/grunt-concat-include#includeinc-file
    grunt.loadNpmTasks('grunt-concat-include');
    grunt.loadNpmTasks('grunt-contrib-uglify');
//https://github.com/gruntjs/grunt-contrib-compress
    grunt.loadNpmTasks('grunt-contrib-compress');
//https://github.com/gruntjs/grunt-contrib-copy
    grunt.loadNpmTasks('grunt-contrib-copy');
//https://github.com/gruntjs/grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-clean');
//https://www.npmjs.com/package/grunt-max-filesize
    grunt.loadNpmTasks('grunt-max-filesize');
    grunt.loadNpmTasks('grunt-contrib-rename');
//https://www.npmjs.com/package/grunt-pngmin
// grunt.loadNpmTasks('grunt-pngmin');

    grunt.registerTask('default', [
        'DUAL_LAYOUT_buildlog',
        'clean:start',
        'replace:extractTemp_Manifest',
        'replace:writeTemp_Manifest',
        'replace:cleanTemp_Manifest',
        'replace:makeMinifyME',
        'replace:clean_makeMinifyME',
        'make_include_inc',
        'replace:makeInjectME',
        'replace:clean_InjectME',
        'replace:capture_InjectMe',
        'replace:makeLive_Manifest',
        'addInfo',
        'concatinclude:iwg',
        'replace:removeSourceMaps',
        'uglify',
        'copy:IWGfolder',
        // 'pngmin:optPng_' + grunt.file.readJSON('build/MIWGbuild.json')._____PNGopt,
        'copy:baseFile_min',
        'copy:minifiedFolder',
        'compress:make_unminified_source_folder',
        'compress:make_minified_source_folder',
        'compress:make_master_Zip',
        'testZipSize',
        'clean:end'
    ]);
    grunt.registerTask('make_include_inc', function () {
        if (pkg._____orientation === "DL") {
            grunt.task.run([
                'replace:make_include_inc_L',
                'replace:make_include_inc_P']);
        } else {
            grunt.task.run(['replace:make_include_inc']);
        }
    });
    grunt.registerTask('addInfo', 'default task description', function () {

        var _info = "";
        _info += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        _info += "<htmlindex>";
        _info += "	<headcss>";

        _info += "		<file pathType=\"relativeGlobal\">scripts\/js\/mobile\/" + pkg._____iwg_loader_MAJOR + "\/" + pkg._____iwg_loader_CSS + "<\/file>";
        _info += "		<file pathType=\"relativeGame\">src\/" + pkg._____gameCSS + "<\/file>";
        _info += "	<\/headcss>";
        _info += "	<headjs>";
        if (pkg._____SOUNDJSopt === true) {
            _info += "		<file pathType=\"relativeGlobal\">scripts\/js\/mobile\/" + pkg._____iwg_loader_MAJOR + "\/thirdParty/" + pkg._____SOUNDJSversion + "<\/file>";
        }
        _info += "		<file pathType=\"relativeGlobal\">scripts\/js\/mobile\/" + pkg._____iwg_loader_MAJOR + "\/" + pkg._____iwg_loader_MINOR + "<\/file>";
        _info += "	<\/headjs>";
        _info += "	<bodyhtml>";
        _info += "		<![CDATA[";
        _info += "	           <div id=\"IWGholder\">";
        _info += "  				  <canvas id=\"IWGcanvas\" class=\"IWGcanvas\"><\/canvas>";
        _info += "					<\/div>";
        _info += "					<div id=\"wm\" class=\"warningMessage clearfix\"><\/div>";
        _info += "	        ]]>";
        _info += "	<\/bodyhtml>";
        if (pkg._____customGameWidth !== null) {
            _info += "	<game-width>" + pkg._____customGameWidth + "<\/game-width>";
        }
        if (pkg._____customGameHeight !== null) {
            _info += "	<game-height>" + pkg._____customGameHeight + "<\/game-height>";
        }
        _info += "	<orientation>" + pkg._____orientation + "<\/orientation>";
        _info += "	<type>" + pkg._____ticketLanguage + "<\/type>";
        _info += "<\/htmlindex>";
        if (_info.indexOf("undefined") !== -1) {
            grunt.fail.warn("undefined in info.xml check custom width and height parameters in MIWGbuild.json", [100])
        }
        grunt.file.write('bin/temp/info.xml', _info)
        grunt.file.write('bin/temp/' + pkg._____name + '_' + timestamp + ' __version__' + pkg._____version + '.txt', 'creation timestamp')
    });

    grunt.task.registerTask('DUAL_LAYOUT_buildlog', 'Create a new release build log files on each run.', function () {
        require('logfile-grunt')(grunt, {filePath: 'bin/' + pkg._____name + '_build.log', clearLogFile: true});
    });
    grunt.registerTask('testZipSize', function () {
        var fs = require('fs');
        var stats = fs.statSync('bin/' + pkg._____orientation + '_' + pkg._____name + '_' + timestamp + '.zip');
        console.log(stats.size)
        if (stats.size < 20000000) {
            //normal
            grunt.log.subhead('Upload ' + 'bin/' + pkg._____orientation + '_' + pkg._____name + '_' + timestamp + '.zip to GTH');
        } else {
            //split-build
            grunt.task.run([
                //too big - make zip only rename big zip _teamDrive
                'compress:make_master_Zip_min_only',
                'rename:teamdrive',
                'rename:gtp',
                'writeEndMess'
                //_teamDrive
            ]);
        }
    });
    grunt.registerTask('writeEndMess', function () {
        grunt.log.subhead('Single zip too large - split build created. ' +
            '\nUpload ' + 'bin/' + pkg._____name + '_' + timestamp + '_teamDrive.zip to area on Camelot teamDrive' +
            '\nUpload ' + 'bin/' + pkg._____name + '_' + timestamp + '.zip to GTH');
    });
};
