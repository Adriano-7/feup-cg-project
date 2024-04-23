import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyEllipsoid } from "../../primitives/MyEllipsoid.js";
import { MySphere } from "../../primitives/MySphere.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.head = new MySphere(scene, 16, 16);
        this.body = new MyEllipsoid(scene, 16, 16, [1.4, 1.2, 1.8]);
        this.texture = texture;

        this.material = new CGFappearance(scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();

        // Display the body
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.head.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}