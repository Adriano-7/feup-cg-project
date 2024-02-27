import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.trianglebig = new MyTriangleBig(scene);


    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(2.7, -3.4, 0);


        //MyTriangle
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        //MyTriangleBig (1)
        this.scene.pushMatrix();
        this.trianglebig.display();
        this.scene.popMatrix();

        //MyTriangleBig (2)
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -1.4, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.trianglebig.display();
        this.scene.popMatrix();

        //MyParallelogram
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(-Math.PI * 3 / 4, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //MyTriangleSmall (1)
        this.scene.pushMatrix();
        this.scene.translate(0.7, -2.1, 0);
        this.scene.rotate(Math.PI * 3 / 4, 0, 0, 1);
        this.trianglesmall.display();
        this.scene.popMatrix();

        //MyTriangleSmall (2)
        this.scene.pushMatrix();
        this.scene.translate(2.12, -2.1, 0);
        this.scene.rotate(Math.PI * 3 / 4, 0, 0, 1);
        this.trianglesmall.display();
        this.scene.popMatrix();

        //MyDiamond
        this.scene.pushMatrix();
        this.scene.translate(0, -3.5, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }
}