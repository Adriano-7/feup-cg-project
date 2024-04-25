import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyFlower } from '../MyFlower/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = [];
        this.margin = 40;
        this.radius = 0;

        // Pink
        this.c1 = new CGFappearance(this.scene);
        this.c1.setAmbient(1, 0.608, 0.812, 1);
        this.c1.setDiffuse(1 * 0.4, 0.608 * 0.4, 0.812 * 0.4, 1);
        this.c1.setSpecular(1, 0.608, 0.812, 1);
        this.c1.setShininess(10.0);

        // Yellow
        this.c2 = new CGFappearance(this);
        this.c2.setAmbient(1*0.8, 1*0.8, 0, 1); 
        this.c2.setDiffuse(1, 1, 0, 1);
        this.c2.setSpecular(1, 1, 0, 1); 
        this.c2.setShininess(10.0); 

        // Green Material
        this.c3 = new CGFappearance(this);
        this.c3.setAmbient(0, 1*0.8, 0, 1);
        this.c3.setDiffuse(0*0.4, 1*0.4, 0*0.4, 1);
        this.c3.setSpecular(0, 1, 0, 1);
        this.c3.setShininess(10.0);

        this.createGarden();
    }

    getRandomRStem() {
        return 1 + Math.floor(Math.random() * 2);
    }

    createGarden() {
        // Create the flower instances with desired parameters
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const randomRStem = Math.floor(Math.random() * 2 + 1);
                const randomHStem = randomRStem + Math.floor(Math.random()*25 + 4);
                const randomRReceptable = 2 * randomRStem + Math.floor(Math.random() * 7);
                const randomRExt = 3 * randomRReceptable + Math.floor(Math.random() * 12);
                const randomNPetals = Math.floor(Math.random() * 19 + 8);
                console.log("randomRExt for flower at position (" + i + ", " + j + "): " + randomRExt);
                const flower = new MyFlower(
                    this.scene,
                    randomRExt,
                    randomNPetals,
                    this.c1,
                    randomRReceptable,
                    this.scene.cReceptable,
                    randomRStem,
                    randomHStem,
                    this.scene.cStem,
                    this.scene.cLeaf
                );
                flower.randomRExt = randomRExt;
                flower.randomHStem = randomHStem;
                this.flowers.push(flower);
            }
        }
    }

    display() {
        // Display the flowers in a grid with adjusted spacing
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flowerIndex = i * this.numCols + j;
                const flower = this.flowers[flowerIndex];
                const radius = flower.randomRExt;
                const height = flower.randomHStem;
                console.log("flower at position (" + i + ", " + j + "): " + height);
                this.scene.pushMatrix();
                const x = i * (2 * radius + this.margin) - 2 * radius;
                const z = j * (2 * radius + this.margin) - 2 * radius;
                this.scene.translate(x, 2*height, z);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}
