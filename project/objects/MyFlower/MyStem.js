import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../oldClasses/MyCylinder.js';

export class MyStem extends CGFobject {
    constructor(scene, rStem, hStem) {
        super(scene);
        this.rStem = rStem;
        this.height = hStem;
        this.cylinder1 = new MyCylinder(scene, 100, 20);
        this.cylinder2 = new MyCylinder(scene, 100, 20);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.height); // Adjust translation based on flower size
        this.scene.scale(1, 1, this.height); // Use this.height to access the class property
        this.cylinder2.display();
        this.scene.popMatrix();

        // Additional transformations on the first cylinder (stem)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2*this.height); // Adjust translation based on flower size
        this.scene.scale(this.rStem, this.rStem, this.height); // Use this.height to access the class property
        this.cylinder1.display();
        this.scene.popMatrix();
    }
}
