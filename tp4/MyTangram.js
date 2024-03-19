import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
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

        //Pink Material
        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(1 * 0.4, 0.608 * 0.4, 0.812 * 0.4, 1);
        this.pink.setDiffuse(1 * 0.2, 0.608 * 0.2, 0.812 * 0.2, 1);
        this.pink.setSpecular(1, 0.608, 0.812, 1);
        this.pink.setShininess(10.0);

        //Blue Material
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0, 0.608 * 0.4, 1 * 0.4, 1);
        this.blue.setDiffuse(0, 0.608 * 0.2, 1 * 0.2, 1);
        this.blue.setSpecular(0, 0.608, 1, 1);
        this.blue.setShininess(10.0);

        //Yellow Material
        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1 * 0.4, 1 * 0.4, 0, 1);
        this.yellow.setDiffuse(1 * 0.2, 1 * 0.2, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);

        //Red Material
        this.red = new CGFappearance(scene);
        this.red.setAmbient(1 * 0.4, 0.106 * 0.4, 0.106 * 0.4, 1);
        this.red.setDiffuse(1 * 0.2, 0.106 * 0.2, 0.106 * 0.2, 1);
        this.red.setSpecular(1, 0.106, 0.106, 1);

        //Green Material
        this.green = new CGFappearance(scene);
        this.green.setAmbient(0 * 0.4, 1 * 0.4, 0 * 0.4, 1);
        this.green.setDiffuse(0 * 0.2, 1 * 0.2, 0 * 0.2, 1);
        this.green.setSpecular(0, 1, 0, 1);
        this.green.setShininess(10.0);

        //Tangram Material
        this.tangramMaterial = new CGFappearance(scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(2.7, -3.4, 0);


        //MyTriangle - Pink
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //MyTriangleBig (1) - Blue
        this.scene.pushMatrix();
        this.blue.apply();
        this.trianglebig.display();
        this.scene.popMatrix();

        //MyTriangleBig (2) - Blue
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -1.4, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.blue.apply();
        this.trianglebig.display();
        this.scene.popMatrix();

        //MyParallelogram - Yellow
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(-Math.PI * 3 / 4, 0, 0, 1);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //MyTriangleSmall (1) - Red
        this.scene.pushMatrix();
        this.scene.translate(0.7, -2.1, 0);
        this.scene.rotate(Math.PI * 3 / 4, 0, 0, 1);
        this.red.apply();
        this.trianglesmall.display();
        this.scene.popMatrix();

        //MyTriangleSmall (2) - Red
        this.scene.pushMatrix();
        this.scene.translate(2.12, -2.1, 0);
        this.scene.rotate(Math.PI * 3 / 4, 0, 0, 1);
        this.red.apply();
        this.trianglesmall.display();
        this.scene.popMatrix();

        //MyDiamond - Tangram texture
        this.scene.pushMatrix();
        this.scene.translate(0, -3.5, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.tangramMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.trianglesmall.enableNormalViz();
        this.trianglebig.enableNormalViz();
    }
}