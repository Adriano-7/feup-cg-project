import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-2, 0, 0,	//0
			-1, 0, 0,	//1
			0, 0, 0,	//2
			1, 0, 0,	//3
			2, 0, 0,	//4
			-1, 1, 0,	//5
			0, 1, 0,	//6
			1, 1, 0,	//7
			0, 2, 0	//8
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,1,5,
			1,2,5,
			2,6,5,
			2,3,6,
			3,7,6,
			3,4,7,
			5,6,8,
			6,7,8
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}