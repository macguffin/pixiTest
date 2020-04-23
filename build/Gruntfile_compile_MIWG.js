'use strict';
//sets up monopoly mill IWG_live so that it can be minified.
//sub games minified at this point and put in the imports folder along with the layout json

//once this has been run you can run the usual build process on IWG_live to get the zip for upload to the GTP
/**


 //var timestamp = grunt.template.today("yyyy_mm_dd__h-MM-ss");
 'use strict';
 */
var version = "v3.1 Webpack - Dual Layout";
module.exports = function (grunt) {
    grunt.file.setBase('../');

    grunt.registerTask('default', [
        'DUAL_LAYOUT_collect_all_miwg_files', 'copy'
    ]);
    grunt.initConfig({
        copy: {
            imports: {
                expand: true,
                cwd: 'GAME/IWG_DEV/src/imports',
                src: '**',
                dest: 'GAME/IWG/src/imports',
            },
            css: {
                expand: true,
                cwd: 'GAME/IWG_DEV/src/',
                src: '*.css',
                dest: 'GAME/IWG/src/',
            }
        }
    });
    grunt.task.registerTask('DUAL_LAYOUT_collect_all_miwg_files', 'Create a new release build log files on each run.', function () {
        //read IWGincludes
        var __includes = grunt.file.read("GAME/IWG_DEV/src/IwgIncludes.js").replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,"");
        console.log(__includes)
        var __index = grunt.file.read("GAME/IWG_DEV/index.html");
        //use reg exp to get all files between {}
        var fileString = __includes.match(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm);
        console.log("fileString",fileString)

        var includes_file_list = __includes.match(/{["']src(.*?)["']}/g);
        var i;
        //start with a clean folder
        grunt.file.delete('GAME/IWG', {
            // Enable deleting outside the current working directory. This option may
            // be overridden by the --force command-line option.
            force: true
        });
        //add index and ticket etc
        grunt.file.copy('GAME/IWG_DEV/index.html', 'GAME/IWG/index.html');
        grunt.file.copy('GAME/IWG_DEV/ticket.xml', 'GAME/IWG/ticket.xml');
        grunt.file.copy('GAME/IWG_DEV/src/browserMatrix.json', 'GAME/IWG/src/browserMatrix.json');
        for (i in includes_file_list) {
            //this gives us {"src": "src/FILE.js", "id": "FILEID"} use following regexp to get just "src/FILE.js"
            // console.log(includes_file_list[i])
            var file = includes_file_list[i].match(/(["'])(?:(?=(\\?))\2.)*?\1/g)[1];
            //make the copy from and copy to locations
            if (/{[Pp][Ll]}/.test(file)) {
                var dev_loc_L;
                var dev_loc_P;
                var iwg_loc_L
                var iwg_loc_P
                dev_loc_L = file.replace('src', 'GAME/IWG_DEV/src').replace(/"/g, '').replace(/{[Pp][Ll]}/, "_L");
                dev_loc_P = file.replace('src', 'GAME/IWG_DEV/src').replace(/"/g, '').replace(/{[Pp][Ll]}/, "_P");
                iwg_loc_L = file.replace('src', 'GAME/IWG/src').replace(/"/g, '').replace(/{[Pp][Ll]}/, "_L");
                iwg_loc_P = file.replace('src', 'GAME/IWG/src').replace(/"/g, '').replace(/{[Pp][Ll]}/, "_P");
                grunt.file.copy(dev_loc_L, iwg_loc_L);
                grunt.file.copy(dev_loc_P, iwg_loc_P);
            } else {
                var dev_loc;
                var iwg_loc
                  if (/http:\/\/localhost:9000/.test(file)) {
                    // dev_loc = file.replace('http://localhost:9000', '../IWG_DEV/src').replace(/"/g, '');
                    //  iwg_loc = file.replace('http://localhost:9000', '../IWG').replace(/"/g, '');
                } else {
                    dev_loc = file.replace('src', 'GAME/IWG_DEV/src').replace(/"/g, '');
                    iwg_loc = file.replace('src', 'GAME/IWG/src').replace(/"/g, '');


                }
                // grunt.file.copy(dev_loc, iwg_loc);
                //copy and remove sourcemap
                grunt.file.copy(dev_loc, iwg_loc,
                    {
                        process: function (content, srcpath) {
                            return content.replace(/\/\/\# sourceMappingURL=(.*).map[;]?/g, "");
                        },
                    }
                );
            }
            //change path to loader in index
            __index = __index.replace('http://127.0.0.1:8080', 'http://www.macguffinandshemp.com/dev/client/camelot/');
            __index = __index.replace('params.isWager = false;', 'params.isWager = true;');
            grunt.file.write('GAME/IWG/index.html', __index);
            __index = __index.replace('params.isWager = true;', 'params.isWager = false;');
            grunt.file.write('GAME/IWG/index_trial.html', __index);
            //http://www.macguffinandshemp.com/dev/client/camelot
            //change local CDN paths in iwgIncludes
            __includes = __includes.replace('http://127.0.0.1:8080/', '');
            __includes = __includes.replace('http://localhost:9000/', 'src/');
        }
        __includes = __includes.replace(/\/\/.*/gm, "");
        __includes = __includes.replace(/^\s*\n/gm, "");

        grunt.file.write('GAME/IWG/src/IwgIncludes.js', __includes);
        console.warn("\n\n\n\n\n")
        console.warn("************************************************")
        console.warn("no notes")
        console.warn("************************************************")

    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};
