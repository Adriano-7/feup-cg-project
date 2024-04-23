import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../primitives/MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - CGFtexture object for the panorama
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 30, 30, true);
        this.texture = texture;

        this.material = new CGFappearance(scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.cameraPosition = scene.camera.position;
        this.setPosition(this.cameraPosition[0], this.cameraPosition[1], this.cameraPosition[2]);
    }

    display() {
        // Activate material with texture
        this.material.apply();

        // Draw the sphere with radius 200 units
        this.scene.pushMatrix();
        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();
    }

    setPosition(x, y, z) {
        this.scene.translate(x, y, z);
    }
}