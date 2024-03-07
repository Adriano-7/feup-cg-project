import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPrism extends CGFobject {
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

        var h = 1/this.stacks;
        for(var i = 0; i < this.stacks; i++){
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;
            
            for(var j = 0; j < this.slices; j++){
                var hCurrent = i*h
                var hNext = (i+1)*h

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);
    
                this.vertices.push(ca,-sa,hNext);
                this.vertices.push(ca,-sa,hCurrent);
                this.vertices.push(caa,-saa,hCurrent);
                this.vertices.push(caa,-saa,hNext);
    
                var normal= [
                    saa-sa,
                    caa-ca,
                    0
                ];
    
                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;
    
                // 4 vertex
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                // create prism indices
                var base = 4*j + 4*i*this.slices
                this.indices.push(base + 2, base + 1, base);
                this.indices.push(base + 3, base + 2, base);
    
                ang+=alphaAng;
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


