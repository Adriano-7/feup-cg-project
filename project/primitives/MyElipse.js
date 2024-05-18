import { CGFobject } from '../../../lib/CGF.js';

export class MyEllipse extends CGFobject {
    constructor(scene, numSegments) {
        super(scene);
        this.numSegments = numSegments;
        this.initEllipse();
    }

    initEllipse() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angleIncrement = (2 * Math.PI) / this.numSegments;

        // Define vertices for the ellipse
        for (let i = 0; i < this.numSegments; i++) {
            const angle = i * angleIncrement;
            const x = Math.cos(angle);
            const y = Math.sin(angle);
            this.vertices.push(x, y, 0); // Assuming z = 0 for simplicity

            // Normals point along the z-axis
            this.normals.push(0, 0, 1);

            // Texture coordinates
            this.texCoords.push((x + 1) / 2, 1 - (y + 1) / 2); // Map x and y to [0,1]
        }

        // Define indices for the triangles
        for (let i = 0; i < this.numSegments - 1; i++) {
            this.indices.push(0, i + 1, i + 2);
        }
        this.indices.push(0, this.numSegments, 1); // Closing the loop

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
