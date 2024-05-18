import { CGFobject } from '../../lib/CGF.js';

export class MyCuboid extends CGFobject {
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
    
        var h = 1 / this.stacks;
        var alphaAng = (2 * Math.PI) / 10; // Angle for a decagon (10 sides)
    
        for (var i = 0; i < this.stacks; i++) {
            var ang = 0;
            var hCurrent = i * h;
            var hNext = (i + 1) * h;
    
            for (var j = 0; j < 10; j++) { // 10 sides for a decagon
                var sa = Math.sin(ang);
                var ca = Math.cos(ang);

                var x = ca;
                var y = sa;
                var z = hCurrent;

                this.vertices.push(x, y, z);

                x = ca;
                y = sa;
                z = hNext;

                this.vertices.push(x, y, z);

                // Compute normals
                var nx = Math.cos(ang + alphaAng / 2); // Normal for a decagon
                var ny = Math.sin(ang + alphaAng / 2);

                this.normals.push(nx, ny, 0);
                this.normals.push(nx, ny, 0);

                if (j < 9) { // If not the last side
                    // create prism indices
                    var base = 20 * i + 2 * j; // Each side has 2 vertices
                    this.indices.push(base, base + 2, base + 1); 
                    this.indices.push(base + 2, base + 3, base + 1); 
                } else { // Last side, connect to the first side
                    // create prism indices
                    var base = 20 * i + 18; // Index of the last vertex of the last side
                    this.indices.push(base, base - 18, base - 19); 
                    this.indices.push(base, base + 1, base - 19); 
                }
    
                ang += alphaAng;
            }
        }
    
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }

    translate(x, y, z) {
        for (let i = 0; i < this.vertices.length; i += 3) {
            this.vertices[i] += x;
            this.vertices[i + 1] += y;
            this.vertices[i + 2] += z;
        }
        this.initGLBuffers();
    }


    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        // No need to update the number of slices for a decagonal prism
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
