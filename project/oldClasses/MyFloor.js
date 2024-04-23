import { CGFobject } from '../../../lib/CGF.js';

export class MyFloor extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0.5, 0,  // V0
            -0.5, -0.5, 0,  // V1
            0.5,-0.5, 0,  // V2
             0.5, 0.5, 0   // V3
        ];

        this.indices = [
            0, 1, 2,
            2,3,4,
            3,4,1,
            3,4,2
        ];

        // Since it's a flat surface, all normals are the same
        this.normals = [
            0, 1, 0,   // All vertices have the same normal
            0, 1, 0,   // Repeated for each vertex
            0, 1, 0,
            0, 1, 0
        ];

        // Define texture coordinates
        this.texCoords = [
            0, 1,   // V0 texture coordinates (bottom-left corner)
            1, 1,   // V1 texture coordinates (bottom-right corner)
            0, 0,   // V2 texture coordinates (top-left corner)
            1, 0    // V3 texture coordinates (top-right corner)
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
