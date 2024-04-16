import { CGFobject } from '../../../lib/CGF.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */

// see on top
export class MyStem extends CGFobject {
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
    
        var h = 0.5 / this.stacks; // Divide height equally for both cylinders
        var alphaAng = 2 * Math.PI / this.slices;
    
        // Generate vertices, normals, and indices for the first cylinder
        for (var i = 0; i < this.stacks; i++) {
            var ang = 0;
            var hCurrent = i * h;
            var hNext = (i + 1) * h;
    
            for (var j = 0; j <= this.slices; j++) {
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);
                
                // First cylinder
                this.vertices.push(ca, sa, hCurrent);
                this.vertices.push(ca, sa, hNext);
    
                // Normals for the first cylinder
                this.normals.push(ca, sa, 0);
                this.normals.push(ca, sa, 0);
    
                if (j < this.slices) {
                    // create prism indices for the first cylinder
                    var base = 2 * (i * (this.slices + 1) + j);
                    this.indices.push(base, base + 2, base + 1); 
                    this.indices.push(base + 2, base + 3, base + 1); 
                }
    
                ang += alphaAng;
            }
        }
    
        // Generate vertices, normals, and indices for the second cylinder
        for (var i = 0; i < this.stacks; i++) {
            var ang = 0;
            var hCurrent = i * h + 0.5; // Shift the second cylinder upwards
            var hNext = (i + 1) * h + 0.5; // Shift the second cylinder upwards

            for (var j = 0; j <= this.slices; j++) {
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);

                // Second cylinder
                this.vertices.push(ca, sa, hCurrent);
                this.vertices.push(ca, sa, hNext);

                // Normals for the second cylinder
                this.normals.push(ca, sa, 0);
                this.normals.push(ca, sa, 0);

                if (j < this.slices) {
                    // create prism indices for the second cylinder
                    var base = 2 * ((this.stacks + i) * (this.slices + 1) + j); // Shift indices to start after the first cylinder
                    this.indices.push(base, base + 2, base + 1); 
                    this.indices.push(base + 2, base + 3, base + 1); 
                }

                ang += alphaAng;
            }
        }

    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    getHeight() {
        return this.stacks / (this.stacks + 1); // Assuming each stack has a height of 1 unit
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