import { CGFobject } from '../../lib/CGF.js';

export class MyCube extends CGFobject {
    constructor(scene, size) {
        super(scene);
        this.size = size; // Size of the cube
        this.initBuffers();
    }
    setTexCoords(texCoords) {
        this.texCoords = texCoords;
        this.initBuffers(); // Reinitialize buffers with new texture coordinates
    }

    initBuffers() {
        this.vertices = [
            // Front face
            -this.size / 2, -this.size / 2, this.size / 2, // 0
            this.size / 2, -this.size / 2, this.size / 2, // 1
            this.size / 2, this.size / 2, this.size / 2, // 2
            -this.size / 2, this.size / 2, this.size / 2, // 3
            // Back face
            -this.size / 2, -this.size / 2, -this.size / 2, // 4
            this.size / 2, -this.size / 2, -this.size / 2, // 5
            this.size / 2, this.size / 2, -this.size / 2, // 6
            -this.size / 2, this.size / 2, -this.size / 2, // 7
            // Top face
            -this.size / 2, this.size / 2, this.size / 2, // 8
            this.size / 2, this.size / 2, this.size / 2, // 9
            this.size / 2, this.size / 2, -this.size / 2, // 10
            -this.size / 2, this.size / 2, -this.size / 2, // 11
            // Bottom face
            -this.size / 2, -this.size / 2, this.size / 2, // 12
            this.size / 2, -this.size / 2, this.size / 2, // 13
            this.size / 2, -this.size / 2, -this.size / 2, // 14
            -this.size / 2, -this.size / 2, -this.size / 2, // 15
            // Right face
            this.size / 2, -this.size / 2, this.size / 2, // 16
            this.size / 2, this.size / 2, this.size / 2, // 17
            this.size / 2, this.size / 2, -this.size / 2, // 18
            this.size / 2, -this.size / 2, -this.size / 2, // 19
            // Left face
            -this.size / 2, -this.size / 2, this.size / 2, // 20
            -this.size / 2, this.size / 2, this.size / 2, // 21
            -this.size / 2, this.size / 2, -this.size / 2, // 22
            -this.size / 2, -this.size / 2, -this.size / 2, // 23
        ];

        this.indices = [
            // Front face
            0, 1, 2,
            0, 2, 3,
            // Back face
            4, 6, 5,
            4, 7, 6,
            // Top face
            8, 9, 10,
            8, 10, 11,
            // Bottom face
            12, 14, 13,
            12, 15, 14,
            // Right face
            16, 18, 17,
            16, 19, 18,
            // Left face
            20, 22, 21,
            20, 23, 22,

            // Adding the reverse (clockwise) order
            // Front face
            2, 1, 0,
            3, 2, 0,
            // Back face
            5, 6, 4,
            6, 7, 4,
            // Top face
            10, 9, 8,
            11, 10, 8,
            // Bottom face
            13, 14, 12,
            14, 15, 12,
            // Right face
            17, 18, 16,
            18, 19, 16,
            // Left face
            21, 22, 20,
            22, 23, 20,
        ];

        this.normals = [
            // Front face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Back face
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // Top face
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // Bottom face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // Right face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // Left face
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
        ];



        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}