export function SPRITESHEET(imageID: string, jsonID: string): void {
    const myBaseTexture: PIXI.BaseTexture = new PIXI.BaseTexture(window.com.camelot.core.iwgLoadQ.getResult(imageID));
    const meta: any = window.com.camelot.core.iwgLoadQ.getResult(jsonID).meta;
    const frames: any = window.com.camelot.core.iwgLoadQ.getResult(jsonID).frames;
    const textures: any = {};
    const resolution: any = PIXI.utils.getResolutionOfUrl(window.com.camelot.core.iwgLoadQ._loadItemsById[imageID].src);
    let polyPack: boolean = false;
    for (const i in frames) {
        if (frames.hasOwnProperty(i)) {
            const rect: { x: number, y: number, w: number, h: number } = frames[i].frame;
            const frame: any = frames[i];
            if (rect) {
                let size: any = null;
                let trim: any = null;
                let vertices: Float32Array;
                let uvs: Float32Array;
                let indices: Uint16Array;
                if (frames[i].rotated) {
                    size = new PIXI.Rectangle(rect.x, rect.y, rect.h, rect.w);
                } else {
                    size = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);
                }
                //  Check to see if the sprite is trimmed
                if (frames[i].trimmed) {
                    trim = new PIXI.Rectangle(
                        frames[i].spriteSourceSize.x / resolution,
                        frames[i].spriteSourceSize.y / resolution,
                        frames[i].sourceSize.w / resolution,
                        frames[i].sourceSize.h / resolution
                    );
                }
                // flip the width and height!
                if (frames[i].rotated) {
                    const temp: number = size.width;
                    size.width = size.height;
                    size.height = temp;
                }
                //     size.x /= resolution;
                //     size.y /= resolution;
                //    size.width /= resolution;
                //    size.height /= resolution;

                if (frame.vertices) {
                    polyPack = true;
                    vertices = new Float32Array(frame.vertices.length * 2);
                    for (let i = 0; i < frame.vertices.length; i++) {
                        vertices[i * 2] = Math.floor(frame.vertices[i][0]) / resolution;
                        vertices[i * 2 + 1] = Math.floor(frame.vertices[i][1]) / resolution;
                    }
                    uvs = new Float32Array(frame.verticesUV.length * 2);
                    for (let i: number = 0; i < frame.verticesUV.length; i++) {
                        uvs[i * 2] = frame.verticesUV[i][0] / meta.size.w;
                        uvs[i * 2 + 1] = frame.verticesUV[i][1] / meta.size.h;
                    }

                    indices = new Uint16Array(frame.triangles.length * 3);
                    for (let i = 0; i < frame.triangles.length; i++) {
                        indices[i * 3] = frame.triangles[i][0];
                        indices[i * 3 + 1] = frame.triangles[i][1];
                        indices[i * 3 + 2] = frame.triangles[i][2];
                    }
                }
                textures[i] = new PIXI.Texture(myBaseTexture, size, size.clone(), trim, frames[i].rotated);
                if (polyPack) {
                    textures[i].polygon = {vertices, uvs, indices};
                }
                PIXI.Texture.addToCache(textures[i], i);
            }
        }
    }
}
