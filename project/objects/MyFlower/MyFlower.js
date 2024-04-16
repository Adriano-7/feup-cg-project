import { CGFappearance, CGFobject } from '../../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptable } from './MyReceptable.js';
import { MyStem } from './MyStem.js';

/**
 *  My Flower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);

        // Create petal and receptacle objects
        this.petal = new MyPetal(scene);
        this.receptacle = new MyReceptable(scene, 1, 20); 
        this.stem = new MyStem(scene, 8 , 20);


        this.numOutsidePetals = 8; // Number of petals
        this.numInsidePetals = 10;
        this.angleOutsideIncrement = (2 * Math.PI) / this.numOutsidePetals; 
        this.angleInsideIncrement =  (2 * Math.PI) / this.numInsidePetals; 
        this.radius = 2; // Radius of the circle where petals are distributed
        this.insideRadius = 1.5;

        this.outsidePetals = []; // Array to store all outside petals
        this.insidePetals = []; // Array to store all inside petals

        // Create and store outside petals
        for (let i = 0; i < this.numOutsidePetals; i++) {
            let angle = i * this.angleOutsideIncrement;
            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);
            let petal = new MyPetal(scene);
            let petalAngle = angle + Math.PI / 2; // Adjust angle to point the top of the petal towards the center
            this.outsidePetals.push({ x: x, y: y, angle: petalAngle, petal: petal });
        }

        // Create and store inside petals
        for (let i = 0; i < this.numInsidePetals; i++) {
            let angle = i * this.angleInsideIncrement;
            let x = this.insideRadius * Math.cos(angle);
            let y = this.insideRadius * Math.sin(angle);
            let petal = new MyPetal(scene);
            let petalAngle = angle + Math.PI / 2; // Adjust angle to point the top of the petal towards the center
            this.insidePetals.push({ x: x, y: y, angle: petalAngle, petal: petal });
        }


        // Pink Material
        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(1*0.4, 0.608*0.4, 0.812*0.4, 1);
        this.pink.setDiffuse(1*0.2, 0.608*0.2, 0.812*0.2, 1);
        this.pink.setSpecular(1, 0.608, 0.812, 1);
        this.pink.setShininess(10.0);

        // Yellow Material
        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1*0.4, 1*0.4, 0, 1);
        this.yellow.setDiffuse(1*0.2, 1*0.2, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);

        //Green Material
        this.green = new CGFappearance(scene);
        this.green.setAmbient(0*0.4, 1*0.4, 0*0.4, 1);
        this.green.setDiffuse(0*0.2, 1*0.2, 0*0.2, 1);
        this.green.setSpecular(0, 1, 0, 1);
        this.green.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(2.7, -3.4, 0);

        // Display outside petals
        this.outsidePetals.forEach(petalInfo => {
            this.scene.pushMatrix();
            this.scene.translate(petalInfo.x, petalInfo.y, 0);
            this.scene.rotate(petalInfo.angle, 0, 0, 1); // Rotate petal to point the top towards the center
            this.pink.apply();
            petalInfo.petal.display();
            this.scene.popMatrix();
        });

        // Display inside petals
        this.insidePetals.forEach(petalInfo => {
            this.scene.pushMatrix();
            this.scene.translate(petalInfo.x, petalInfo.y, 0.);
            this.scene.rotate(petalInfo.angle, 0, 0, 1);
            this.scene.scale(0.5, 0.5, 0.5); 
            this.pink.apply();
            petalInfo.petal.display();
            this.scene.popMatrix();
        });


        // Display receptacle
        this.scene.pushMatrix();
        this.yellow.apply();
        this.receptacle.display();
        this.scene.popMatrix();


        // Display stem
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0); // Additional rotation to adjust the angle of the stem
        this.scene.translate(0, -this.radius - 2, 0); // Adjust translation based on the size of the flower and the desired length of the stem
        this.scene.scale(0.2, 2 * this.radius, 0.2); // Adjust scaling based on the dimensions of the stem
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Rotate to align with the y-axis
        this.green.apply();
        this.stem.display();
        this.scene.popMatrix();



        this.scene.popMatrix();
    }
}
