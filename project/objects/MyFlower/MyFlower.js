import { CGFappearance, CGFobject } from '../../../lib/CGF.js';
import { MyPetals } from './MyPetals.js';
import { MyReceptable } from './MyReceptable.js';
import { MyStem } from './MyStem.js';

/**
 *  MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, rExt, nPetals, cPetals, rReceptable, cReceptable, rStem, hStem, cStem, cLeaf) {
        super(scene);

        let lPetals = rExt - rReceptable
        let nLayers = 1;

        // Create petal and receptacle objects
        this.petals = new MyPetals(scene, rExt, nPetals, lPetals, nLayers);
        this.receptacle = new MyReceptable(scene, rReceptable);
        this.stem = new MyStem(scene, rStem, hStem);

        this.cPetals = cPetals;
        this.cReceptable = cReceptable
        this.cStem = cStem
        this.cLeaf = cLeaf

        // Display colors
        this.cPetals.apply();
        this.cReceptable.apply();
        this.cStem.apply();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        // Display petals
        this.scene.pushMatrix();
        this.cPetals.apply();
        this.petals.display();
        this.scene.popMatrix();

        // Display receptacle
        this.scene.pushMatrix();
        this.cReceptable.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        // Display stem
        this.scene.pushMatrix();
        this.cStem.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}