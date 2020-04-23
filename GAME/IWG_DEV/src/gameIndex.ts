import {initIWG} from "./lib/IWGroot";
// Clear after module reload

export let core: any;
(function (window: any): void {
    window.com.camelot = window.com.camelot || {};
    window.com.camelot.core = window.com.camelot.core || {};
    core = window.com.camelot.core;
    //receive the IWGInit call from loader and make a new IWG class
    window.com.camelot.core.IWGInit = (): void => {
        initIWG();
    };

}(window));
