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
        this.smallMargin = 0.2;

        // Pink
        this.c10 = new CGFappearance(this.scene);
        this.c10.setAmbient(1, 0.608, 0.812, 1);
        this.c10.setDiffuse(1 * 0.4, 0.608 * 0.4, 0.812 * 0.4, 1);
        this.c10.setSpecular(1, 0.608, 0.812, 1);
        this.c10.setShininess(10.0);

        this.c11 = new CGFappearance(this.scene);
        this.c11.setAmbient(1, 0.608 - this.smallMargin, 0.812, 1);
        this.c11.setDiffuse(1 * 0.4, 0.608 * 0.4, 0.812 * 0.4, 1);
        this.c11.setSpecular(1, 0.608, 0.812, 1);
        this.c11.setShininess(10.0);

        this.c12 = new CGFappearance(this.scene);
        this.c12.setAmbient(1, 0.608 + this.smallMargin, 0.812, 1);
        this.c12.setDiffuse(1 * 0.4, 0.608 * 0.4, 0.812 * 0.4, 1);
        this.c12.setSpecular(1, 0.608, 0.812, 1);
        this.c12.setShininess(10.0);

        // Yellow
        this.c20 = new CGFappearance(this.scene);
        this.c20.setAmbient(0.8, 0.8, 0, 1);
        this.c20.setDiffuse(1, 1, 0, 1);
        this.c20.setSpecular(1, 1, 0, 1);
        this.c20.setShininess(10.0);

        this.c21 = new CGFappearance(this.scene);
        this.c21.setAmbient(0.8, 0.8 - this.smallMargin, 0, 1);
        this.c21.setDiffuse(1, 1, 0, 1);
        this.c21.setSpecular(1, 1, 0, 1);
        this.c21.setShininess(10.0);

        this.c22 = new CGFappearance(this.scene);
        this.c22.setAmbient(0.8, 0.8 + this.smallMargin, 0, 1);
        this.c22.setDiffuse(1, 1, 0, 1);
        this.c22.setSpecular(1, 1, 0, 1);
        this.c22.setShininess(10.0);


        // Green Material
        this.c30 = new CGFappearance(this.scene);
        this.c30.setAmbient(0, 0.8, 0, 1);
        this.c30.setDiffuse(0, 0.4, 0.4, 1);
        this.c30.setSpecular(0, 1, 0, 1);
        this.c30.setShininess(10.0);

        this.c31 = new CGFappearance(this.scene);
        this.c31.setAmbient(0, 0.8 - this.smallMargin, 0, 1);
        this.c31.setDiffuse(0, 0.4, 0, 1);
        this.c31.setSpecular(0, 1, 0, 1);
        this.c31.setShininess(10.0);

        this.c32 = new CGFappearance(this.scene);
        this.c32.setAmbient(0, 0.8 + this.smallMargin, 0, 1);
        this.c32.setDiffuse(0, 0.4, 0, 1);
        this.c32.setSpecular(0, 1, 0, 1);
        this.c32.setShininess(10.0);

        this.createGarden();
    }

    createGarden() {
        // Create the flower instances with desired parameters
        const colorOptionsPetals = [this.c10, this.c11, this.c12];
        const colorOptionsReceptable = [this.c20, this.c21, this.c22];
        const colorOptionsStem = [this.c30, this.c31, this.c32];


        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const randomRStem = Math.floor(Math.random() * 2 + 2);
                const randomHStem = randomRStem + Math.floor(Math.random() * 25 + 6);
                const randomRReceptable = 2 * randomRStem + Math.floor(Math.random() * 7);
                const randomRExt = 3 * randomRReceptable + Math.floor(Math.random() * 12);
                const randomNPetals = Math.floor(Math.random() * 19 + 8);

                const randomColorIndexPetals = Math.floor(Math.random() * colorOptionsPetals.length);
                const randomColorPetals = colorOptionsPetals[randomColorIndexPetals];

                const randomColorIndexReceptable = Math.floor(Math.random() * colorOptionsReceptable.length);
                const randomColorReceptable = colorOptionsReceptable[randomColorIndexReceptable];

                const randomColorIndexStem = Math.floor(Math.random() * colorOptionsStem.length);
                const randomColorStem = colorOptionsStem[randomColorIndexStem];

                const flower = new MyFlower(
                    this.scene,
                    randomRExt,
                    randomNPetals,
                    randomColorPetals,
                    randomRReceptable,
                    randomColorReceptable,
                    randomRStem,
                    randomHStem,
                    randomColorStem,
                    randomColorStem
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
                this.scene.translate(x, 2 * height - 100, z);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}