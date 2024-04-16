import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        // Define vertices for the two triangles forming the petal
        this.vertices = [
            // Triangle 1
            0, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2
            
            // Triangle 2
            0, -3, 0,	//0
			1, -1, 0,	//1
			-1, -1, 0,	//2
        ];

        this.indices = [
            // Triangle 1
            0, 1, 2,

            // Triangle 2
            3, 4, 5
        ];

        // Normals 
        this.normals = [
            0, 0, 1,    // Normal for Triangle 1
            0, 0, 1,    // Normal for Triangle 1
            0, 0, 1,    // Normal for Triangle 1

            0, 0, 1,    // Normal for Triangle 2
            0, 0, 1,    // Normal for Triangle 2
            0, 0, 1     // Normal for Triangle 2
        ];

        // Define the primitive type to be drawn
        this.primitiveType = this.scene.gl.TRIANGLES;

        // Initialize WebGL buffers
        this.initGLBuffers();
    }
}
