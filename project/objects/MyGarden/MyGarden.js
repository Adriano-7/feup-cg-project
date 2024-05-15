import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
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
                const flower = this.createRandomFlower();
                this.flowers.push(flower);
            }
        }
    }

    createRandomFlower() {
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
        return flower;
    }

    getRandomNumber(range, min = 0) {
        return Math.floor(Math.random() * range + min);
    }

    display() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flowerIndex = i * this.numCols + j;
                const flower = this.flowers[flowerIndex];
                const radius = flower.externalRadius;
                const height = flower.stemHeight;
                this.scene.pushMatrix();
                const x = i * (3 * radius + this.margin);
                const z = j * (3 * radius + this.margin);
                this.scene.translate(x, 2 * height - 100, z);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}