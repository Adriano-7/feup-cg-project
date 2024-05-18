import { CGFobject } from '../../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; // Added texture coordinates

        var h = 1 / this.stacks;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.stacks; i++) {
            var ang = 0;
            var hCurrent = i * h;
            var hNext = (i + 1) * h;

            for (var j = 0; j <= this.slices; j++) {
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);
                var sn = Math.sin(ang + alphaAng);
                var cn = Math.cos(ang + alphaAng);

                this.vertices.push(ca, sa, hCurrent);
                this.vertices.push(ca, sa, hNext);

                // 2 vertex
                this.normals.push(ca, sa, 0);
                this.normals.push(ca, sa, 0);

                // Added texture coordinates
                this.texCoords.push(j / this.slices, hCurrent);
                this.texCoords.push(j / this.slices, hNext);

                if (j < this.slices) {
                    // create prism indices
                    var base = 2 * (i * (this.slices + 1) + j);
                    this.indices.push(base, base + 2, base + 1);
                    this.indices.push(base + 2, base + 3, base + 1);
                }

                ang += alphaAng;
            }
        }

        for (let i = 0; i < this.slices; i++) {
            this.vertices.push(0, 0, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(0.5, 0.5);

            let ang = i * alphaAng;
            let sa = Math.sin(ang);
            let ca = Math.cos(ang);

            this.vertices.push(ca, sa, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(ca / 2 + 0.5, -sa / 2 + 0.5);

            ang = (i + 1) * alphaAng;
            sa = Math.sin(ang);
            ca = Math.cos(ang);

            this.vertices.push(ca, sa, 0);
            this.normals.push(0, 0, -1);
            this.texCoords.push(ca / 2 + 0.5, -sa / 2 + 0.5);

            let base = this.vertices.length / 3 - 3;
            this.indices.push(base, base + 2, base + 1);
        }

        // Top
        for (let i = 0; i < this.slices; i++) {
            this.vertices.push(0, 0, 1);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5, 0.5);

            let ang = i * alphaAng;
            let sa = Math.sin(ang);
            let ca = Math.cos(ang);

            this.vertices.push(ca, sa, 1);
            this.normals.push(0, 0, 1);
            this.texCoords.push(ca / 2 + 0.5, sa / 2 + 0.5);

            ang = (i + 1) * alphaAng;
            sa = Math.sin(ang);
            ca = Math.cos(ang);

            this.vertices.push(ca, sa, 1);
            this.normals.push(0, 0, 1);
            this.texCoords.push(ca / 2 + 0.5, sa / 2 + 0.5);

            let base = this.vertices.length / 3 - 3;
            this.indices.push(base, base + 1, base + 2);
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }


    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}