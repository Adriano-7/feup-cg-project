import { CGFappearance, CGFobject } from '../../../lib/CGF.js';
import { MyFlower } from '../MyFlower/MyFlower.js';
import { MyFloor } from '../../oldClasses/MyFloor.js'; // Adjust the path as needed

export class MyGarden extends CGFobject {
    constructor(scene) {
        super(scene);
        this.flower = null; 
        this.floor = null;
        this.hStem = 8; // Declare hStem as a property of the class
        this.createGarden();
    }

    createGarden() {
        // Create the flower instance with desired parameters
        this.flower = new MyFlower(
            this.scene,
            12, // rExt
            20,  // nPetals
            this.scene.cPetals, // cPetals
            4,   // rReceptable
            this.scene.cReceptable, // cReceptable
            1,   // rStem
            this.hStem,   // hStem - Access using this.hStem
            this.scene.cStem, // cStem
            this.scene.cLeaf,  // cLeaf
        );

        // Create the floor instance
        this.floor = new MyFloor(this.scene);

        // Define the floor material
        this.cFloor = new CGFappearance(this.scene);
        this.cFloor.setAmbient(0, 1, 0, 1);
        this.cFloor.setDiffuse(0, 1, 0, 1);
        this.cFloor.setSpecular(0, 1, 0, 1);
        this.cFloor.setShininess(10.0);
    }

    display() {
        // Display the flower
        this.scene.pushMatrix();
        this.scene.translate(0, this.hStem, 0); // Translate upwards by hStem units
        this.flower.display();
        this.scene.popMatrix();

        // Apply transformations and material to the floor
        this.scene.pushMatrix();
        this.scene.scale(5, 1, 5); // Scale the floor 5 times bigger
        this.cFloor.apply(); // Apply the floor material
        this.floor.display(); // Display the floor
        this.scene.popMatrix();
    }
}
