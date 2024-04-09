import { CGFobject } from '../../../lib/CGF.js';
/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [

        ];

        //Counter-clockwise reference of vertices
        this.indices = [

        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

