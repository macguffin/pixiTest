/// <reference path="soundjs/soundjs.d.ts" />

/// <reference path="pixi/pixi.d.ts" />

interface Window {
    _nsString: any;
    com: any;
}

declare module com.camelot.iwg {
    var IWGapp: any;
    var IWGEM: any;
    var MEVENT: any;
    //var F:any
}
declare module com.camelot.core {
    var IWG: any;
    var IWGEVENT: any;
    var IWGCore_closegame: any;
    var iwgLoadQ: any;
    // var IWGCore_bank:any;
    // var ame:any;

    function IWGInit(): any;

}
