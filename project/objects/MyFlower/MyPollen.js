import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyEllipsoid } from "../../primitives/MyEllipsoid.js";

export class MyPollen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.pollen = new MyEllipsoid(scene, 16, 8, [1, 0.5, 1]);
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;

        // Create a suitable material and texture for the pollen
        this.pollenTexture = new CGFtexture(scene, 'images/pollen.jpg');
        this.pollenMaterial = new CGFappearance(scene);
        this.pollenMaterial.setEmission(1, 1, 1, 1);
        this.pollenMaterial.setTexture(this.pollenTexture);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.pollenMaterial.apply();

        this.pollen.display();

        this.scene.popMatrix();
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setRotation(angle) {
        this.rotation = angle;
    }
}