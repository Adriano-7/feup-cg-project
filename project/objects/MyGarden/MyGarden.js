import { CGFobject } from '../../../lib/CGF.js';
import { MyFlower } from '../MyFlower/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = [];
        this.margin = 5;
        this.radius = 0;
        this.smallMargin = 0.2;

        this.createGarden();
    }

    createGarden() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flower = this.createRandomFlower(i, j);
                this.flowers.push(flower);
            }
        }
    }

    createRandomFlower(i, j) {
        const stemRadius = this.getRandomNumber(2, 2);
        const stemHeight = stemRadius + this.getRandomNumber(25, 8);
        const receptacleRadius = 2 * stemRadius + this.getRandomNumber(7);
        const externalRadius = 3 * receptacleRadius + this.getRandomNumber(12);
        const numberOfPetals = this.getRandomNumber(19, 12);

        const flower = new MyFlower(
            this.scene,
            externalRadius,
            numberOfPetals,
            receptacleRadius,
            stemRadius,
            stemHeight
        );
        flower.externalRadius = externalRadius;
        flower.stemHeight = stemHeight;

        flower.x = i * (3 * externalRadius + this.margin);
        flower.y = 2 * stemHeight - 100
        flower.z = j * (3 * externalRadius + this.margin);


        return flower;
    }

    getRandomNumber(range, min = 0) {
        return Math.floor(Math.random() * range + min);
    }

    display() {
        for (const flower of this.flowers) {
            this.scene.pushMatrix();
            this.scene.translate(flower.x, flower.y, flower.z);
            flower.display();
            this.scene.popMatrix();
        }
    }
}