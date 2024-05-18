import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene, vertices) {
        super(scene);
        this.vertices = vertices;
        this.initBuffers();
    }

    initBuffers() {
        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];

        // Define normals for both sides of the triangle
        this.normals = [
            0, 0, 1, // Front face normal (upward)
            0, 0, 1,
            0, 0, 1,

            0, 0, -1, // Back face normal (downward)
            0, 0, -1,
            0, 0, -1,
        ];

        // Define texture coordinates
        this.texCoords = [
            0, 1,
            1, 1,
            0.5, 0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}