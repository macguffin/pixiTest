import {core} from "../../../../../_IWG_template/GAME/IWG_DEV/src/gameIndex";
import {SPRITESHEET} from "../vendor/camelot/SPRITESHEET";

export let iwg: Iwg;

export function initIWG(): void {
    //initialise Iwg
    console.log("game load complete");
    iwg = new Iwg();
}

/**
 * initialise IWG
 */
export class Iwg {
    //set up game
    constructor() {
        SPRITESHEET("SS_0", "SS_json_0");
        console.log("spriteSheets converted to pixi sprites", PIXI.utils.TextureCache);
        //once you have rendered your Splash screen kill loader
        core.IWG.ame("killLoader");
    }
}
