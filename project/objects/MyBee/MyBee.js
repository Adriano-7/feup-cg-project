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
    constructor(scene, texture) {
        super(scene);
        this.head = new MySphere(scene, 16, 16);
        this.antenna = new MyCylinder(scene, 16, 16);
        this.torax = new MyEllipsoid(scene, 16, 16, [1.4, 1.2, 1.3]);
        this.abdomen = new MyEllipsoid(scene, 16, 16, [1.4, 1.2, 3.0]);
        this.texture = texture;

        this.material = new CGFappearance(scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();

        //Display the head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.head.display();
        this.scene.popMatrix();

        // Display the left antenna
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0.8, -2.3);
        this.scene.rotate(Math.PI / 4, Math.PI / 4, 1, 0);
        this.scene.scale(0.02, 0.02, 0.8);
        this.antenna.display();
        this.scene.popMatrix();

        // Display the right antenna
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0.8, -2.3);
        this.scene.rotate(-Math.PI / 4, -Math.PI / 4, 1, 0);
        this.scene.scale(0.02, 0.02, 0.8);
        this.antenna.display();
        this.scene.popMatrix();

        // Display the torax
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.torax.display();
        this.scene.popMatrix();

        // Display the abdomen
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 1.5);
        this.scene.rotate(Math.PI / 12, 1, 0, 0);
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}