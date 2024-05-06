import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyEllipsoid } from "../../primitives/MyEllipsoid.js";
import { MySphere } from "../../primitives/MySphere.js";
import { MyCylinder } from "../../primitives/MyCylinder.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
    constructor(scene, textureHead, textureBody, textureAbdomen) {
        super(scene);
        this.head = new MySphere(scene, 16, 16);
        this.antenna = new MyCylinder(scene, 16, 16);
        this.leg = new MyCylinder(scene, 16, 16);
        this.torax = new MyEllipsoid(scene, 16, 16, [1.3, 1.2, 1.7]);
        this.abdomen = new MyEllipsoid(scene, 16, 16, [1.2, 1.2, 1.3]);
        this.wing = new MyEllipsoid(scene, 16, 16, [0.7, 0.1, 0.4]);
        this.eye = new MyEllipsoid(scene, 16, 16, [1.4, 3, 2.5]);

        this.headMaterial = new CGFappearance(scene);
        this.headMaterial.setEmission(1, 1, 1, 1);
        this.headMaterial.setTexture(textureHead);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyMaterial = new CGFappearance(scene);
        this.bodyMaterial.setEmission(1, 1, 1, 1);
        this.bodyMaterial.setTexture(textureBody);
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.abdomenMaterial = new CGFappearance(scene);
        this.abdomenMaterial.setEmission(1, 1, 1, 1);
        this.abdomenMaterial.setTexture(textureAbdomen);
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.position = [0, 3, 0];
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);

        this.scene.pushMatrix();
        this.headMaterial.apply();

        // Display the 1st right leg
        this.scene.pushMatrix();
        this.scene.translate(0.8, -0.5, 0.3);
        this.scene.rotate(3 * Math.PI / 6, 1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.01, -1.1, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.4);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 1st  left leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -0.5, 0.3);
        this.scene.rotate(-3 * Math.PI / 6, -1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.01, -1.1, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.4);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 2nd right leg
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1, 1);
        this.scene.rotate(3 * Math.PI / 6, 1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.01, -1.7, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 2nd left leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1, 1);
        this.scene.rotate(-3 * Math.PI / 6, -1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.01, -1.7, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 3rd right leg
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1.3, 1.7);
        this.scene.rotate(3 * Math.PI / 6, 1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.01, -2, 1.7);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 3rd left leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1.3, 1.7);
        this.scene.rotate(-3 * Math.PI / 6, -1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.01, -2, 1.7);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the right wing
        this.scene.pushMatrix();
        this.scene.translate(1.8, -0.2, 1.2);
        this.scene.rotate(Math.PI / 12, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        // Display the left wing
        this.scene.pushMatrix();
        this.scene.translate(-1.8, -0.2, 1.2);
        this.scene.rotate(Math.PI / 12, 1, 0, 0);
        this.wing.display();
        this.scene.popMatrix();

        //Display the head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.head.display();
        this.scene.popMatrix();

        // Display the abdomen
        this.abdomenMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.6, 2.5);
        this.abdomen.display();
        this.scene.popMatrix();

        this.bodyMaterial.apply();

        // Display the right antenna
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0.8, -2.3);
        this.scene.rotate(Math.PI / 4, Math.PI / 4, 1, 0);
        this.scene.scale(0.02, 0.02, 0.8);
        this.antenna.display();
        this.scene.popMatrix();

        // Display the left antenna
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0.8, -2.3);
        this.scene.rotate(-Math.PI / 4, -Math.PI / 4, 1, 0);
        this.scene.scale(0.02, 0.02, 0.8);
        this.antenna.display();
        this.scene.popMatrix();

        // Display the torax
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 1.5);
        this.scene.rotate(Math.PI / 12, 1, 0, 0);
        this.torax.display();
        this.scene.popMatrix();

        // Display the right eye   
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0.1, -1.7);
        this.scene.rotate(1, 1, Math.PI / 2, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.eye.display();
        this.scene.popMatrix();

        // Display the left eye
        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0.1, -1.7);
        this.scene.rotate(1, 1, -Math.PI / 2, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    updatePosition(position) {
        this.position = position;
    }
}