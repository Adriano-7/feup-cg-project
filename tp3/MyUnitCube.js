import { CGFobject } from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5,  0.5, //A
             0.5, -0.5,  0.5, //B
            -0.5,  0.5,  0.5, //C
             0.5,  0.5,  0.5, //D
            -0.5, -0.5, -0.5, //E
             0.5, -0.5, -0.5, //F
            -0.5,  0.5, -0.5, //G
             0.5,  0.5, -0.5, //H
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            //ABCD
            0, 1, 3,
            0, 3, 2,

            //BFHD
            1, 5, 7,
            3, 1, 7,

            //FEGH
            5, 4, 6,
            5, 6, 7,

            //EACG
            4, 0, 2,
            4, 2, 6,

            //CDHG
            2, 3, 7,
            2, 7, 6,

            //ABFE
            0, 1, 5,
            0, 5, 4
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}