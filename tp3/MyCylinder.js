import {CGFobject} from '../lib/CGF.js';
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

        var x = 0;

        var h = 1/this.stacks;
        for(var i = 0; i < this.stacks; i++){
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;
            var normalAng = 0;
            var hCurrent = i*h
            var hNext = (i+1)*h


            for(var j = 0; j < this.slices; j++){
                var sa=Math.sin(ang);
                var ca=Math.cos(ang);
                var sn=Math.sin(normalAng);
                var cn=Math.cos(normalAng);

                this.vertices.push(ca,sa,hCurrent);
                this.vertices.push(ca,sa,hNext);

                normalAng = j * alphaAng;

                // 2 vertex
                this.normals.push(cn, sn, 0);
                this.normals.push(cn, sn, 0);
                

                var base = 4*j + 4*i*this.slices

                // create prism indices
                var base = 2*i*this.slices
                this.indices.push(base + x%(2*this.slices), base + (x+2)%(2*this.slices), base + (x+3)%(2*this.slices));
				this.indices.push(base + (x+3)%(2*this.slices), base + (x+1)%(2*this.slices), base + x%(2*this.slices));

                x += 2;
                ang += alphaAng;
            }
    

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


