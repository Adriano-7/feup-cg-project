import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyReceptable
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the circle
 * @param slices - Number of slices (vertices) in the circle
 */
export class MyReceptable extends CGFobject {
    constructor(scene, radius, slices) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var angleIncrement = (2 * Math.PI) / this.slices;

        // Center vertex
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);

        // Generate vertices for the circle
        for (var i = 0; i < this.slices; i++) {
            var angle = i * angleIncrement;
            var x = this.radius * Math.cos(angle);
            var y = this.radius * Math.sin(angle);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1); // Normals pointing upwards

            // Create triangles connecting center vertex with current and next vertices
            if (i < this.slices - 1) {
                this.indices.push(0, i + 1, i + 2);
            } else {
                // Last triangle connecting with first vertex
                this.indices.push(0, i + 1, 1);
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
