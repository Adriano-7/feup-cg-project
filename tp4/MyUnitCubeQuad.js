import { CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, topTexture = null, frontTexture = null, rightTexture = null, backTexture = null, leftTexture = null, bottomTexture = null) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.topTexture = topTexture;
        this.frontTexture = frontTexture;
        this.rightTexture = rightTexture;
        this.backTexture = backTexture;
        this.leftTexture = leftTexture;
        this.bottomTexture = bottomTexture;
    }

    display() {
        //top face
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        if (this.topTexture) {
            this.topTexture.bind();
        }
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //front face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        if (this.frontTexture) {
            this.frontTexture.bind();
        }
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //right face
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        if (this.rightTexture) {
            this.rightTexture.bind();
        }
        this.quad.display();
        this.scene.popMatrix();

        //back face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        if (this.backTexture){
            this.backTexture.bind();
        }
        this.quad.display();
        this.scene.popMatrix();

        //left face
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        if (this.leftTexture){
            this.leftTexture.bind();
        }
        this.quad.display();
        this.scene.popMatrix();

        //bottom face
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        if (this.bottomTexture) {
            this.bottomTexture.bind();
        }
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}