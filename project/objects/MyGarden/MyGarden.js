import { CGFobject } from '../../../lib/CGF.js';
import { MyFlower } from '../MyFlower/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols; 
        this.flowers = [];
        this.rExt = 12;
        this.rReceptable = 4;
        this.rStem = 1;
        this.margin = 30;
        this.hStem = 8; 
        this.createGarden();
    }

    createGarden() {
        // Create the flower instances with desired parameters
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const randomRReceptable = 3 + Math.floor(Math.random() * 7); 
                const randomRExt = 3*randomRReceptable + Math.floor(Math.random() * 12);
                const randomRStem = 1 + Math.floor(Math.random() * 2); 
                const randomNPetals = 8 + Math.floor(Math.random() * 19); 
                const randomHSteam = 8 + Math.floor(Math.random()*11);
                const flower = new MyFlower(
                    this.scene,
                    randomRExt,
                    randomNPetals,
                    this.scene.cPetals,
                    randomRReceptable,
                    this.scene.cReceptable,
                    this.rStem,
                    this.hStem,
                    this.scene.cStem,
                    this.scene.cLeaf
                );
                this.flowers.push(flower); 
            }
        }
    }

    display() {
        // Display the flowers in a grid with adjusted spacing
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flowerIndex = i * this.numCols + j; // Calculate the index of the flower in the array
                const flower = this.flowers[flowerIndex];
                this.scene.pushMatrix();
                const x = i * (2 * this.rExt + this.margin) - 2 * this.rExt;
                const z = j * (2 * this.rExt + this.margin) - 2 * this.rExt;
                this.scene.translate(x, 0, z); // Adjust position based on grid spacing
                this.scene.translate(0, this.hStem, 0); // Translate upwards by hStem units
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}
