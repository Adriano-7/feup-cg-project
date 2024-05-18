import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';
import { MyCube } from '../../primitives/MyCube.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.rStem = 3;
        this.margin = 0.2;
        this.bigH = 0.3;
        this.smallH = 0.1;

        this.box1 = new MyCube(scene, this.rStem);
        this.box2 = new MyCube(scene, this.rStem);
        this.box3 = new MyCube(scene, this.rStem);
        this.topBox = new MyCube(scene, this.rStem);
        this.bottomBox = new MyCube(scene, this.rStem);
        this.bar1 = new MyCube(scene, this.rStem);
        this.bar2 = new MyCube(scene, this.rStem);
        this.bar3 = new MyCube(scene, this.rStem);

        this.textureHive = new CGFtexture(scene, "textures/wood.jpeg");
        this.hiveMaterial = new CGFappearance(scene);
        this.hiveMaterial.setEmission(1, 1, 1, 1);
        this.hiveMaterial.setTexture(this.textureHive);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textureInsideBottom = new CGFtexture(scene, "textures/hive.jpeg");
        this.insideBottomMaterial = new CGFappearance(scene);
        this.insideBottomMaterial.setEmission(1, 1, 1, 1);
        this.insideBottomMaterial.setTexture(this.textureInsideBottom);
        this.insideBottomMaterial.setTextureWrap('REPEAT', 'REPEAT');


    }

    display() {
        // Box
        this.scene.pushMatrix();
        this.scene.scale(5, 5, 5);
        this.hiveMaterial.apply();

        // Bottom Box
        this.scene.pushMatrix();
        this.scene.scale(0.9, this.smallH, 1.1);
        this.scene.translate(0, 2, 0.2);
        this.insideBottomMaterial.apply();
        this.bottomBox.display();
        this.scene.popMatrix();
        this.hiveMaterial.apply();

        // Main Box 1
        this.scene.pushMatrix();
        this.scene.scale(0.9, this.bigH, 1);
        this.scene.translate(0, 4, 0);
        this.box1.display();
        this.scene.popMatrix();

        // Main Box 2
        this.scene.pushMatrix();
        this.scene.scale(0.9, this.bigH, 1);
        this.scene.translate(0, 7, 0.1);
        this.box2.display();
        this.scene.popMatrix();

        // Main Box 3
        this.scene.pushMatrix();
        this.scene.scale(0.9, this.bigH, 1);
        this.scene.translate(0, 10, 0);
        this.box3.display();
        this.scene.popMatrix();

        // Top Box
        this.scene.pushMatrix();
        this.scene.scale(1.1, this.bigH - this.smallH, 1.1);
        this.scene.translate(0, 18, 0.1);
        this.topBox.display();
        this.scene.popMatrix();


        // Bar 1
        this.scene.pushMatrix();
        this.scene.scale(this.smallH, this.margin, 1.1);
        this.scene.translate(-12, 3, 0.2);
        this.bar1.display();
        this.scene.popMatrix();

        // Bar 1
        this.scene.pushMatrix();
        this.scene.scale(this.smallH, this.margin, 1.1);
        this.scene.translate(12, 3, 0.2);
        this.bar2.display();
        this.scene.popMatrix();

        // Bar 1
        this.scene.pushMatrix();
        this.scene.scale(0.9, this.margin, this.smallH);
        this.scene.translate(0, 3, -14);
        this.bar3.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }

}