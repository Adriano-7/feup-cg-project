import { CGFobject } from '../../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to the MyScene object
 * @param radius - Radius of the sphere
 * @param slices - Number of slices (vertical divisions)
 * @param stacks - Number of stacks (horizontal divisions)
 */
export class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        for (let i = 0; i <= this.stacks; i++) {
            let stackAngle = Math.PI / 2 - (i * Math.PI / this.stacks);
            let xy = Math.cos(stackAngle);
            let z = Math.sin(stackAngle);
    
            for (let j = 0; j <= this.slices; j++) {
                let sliceAngle = j * 2 * Math.PI / this.slices;
                let x = xy * Math.cos(sliceAngle);
                let y = xy * Math.sin(sliceAngle);
    
                this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
                this.normals.push(x, y, z);
                this.texCoords.push(1 - j / this.slices, i / this.stacks);
            }
        }
    
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                let first = (i * (this.slices + 1)) + j;
                let second = first + this.slices + 1;
    
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
