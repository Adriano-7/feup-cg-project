import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
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

        // height
        for (var i = 0; i < this.stacks; i++) {
            var h = i/this.stacks;
            var hNext = (i+1)/this.stacks;
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;

            for (var j = 0; j<this.slices; j++) {
                
                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca,-sa,hNext);
                this.vertices.push(ca,-sa,h);
                this.vertices.push(caa,-saa,h);
                this.vertices.push(caa,-saa,hNext);
    
                // triangle normal computed by cross product of two edges
                var normal= [
                    saa-sa,
                    ca*saa-sa*caa,
                    caa-ca
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

                // Criar Prismas 
                this.indices.push(4*j + 4*i*this.slices + 2, 4*j + 4*i*this.slices + 1,4*j + 4*i*this.slices);
                this.indices.push(4*j + 4*i*this.slices + 3, 4*j + 4*i*this.slices + 2,4*j + 4*i*this.slices);

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


