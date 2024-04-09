import { CGFobject } from '../../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptable } from './MyReceptable.js';
import { MyStem } from '../../MyStem.js';


/**
 *  My Flower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.petal = new MyPetal(scene);
        this.receptacle = new MyReceptable(scene);
        this.steam = new MyStem(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(2.7, -3.4, 0);


        // My Petal
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // My Receptacle
        this.scene.pushMatrix();
        this.scene.translate(-1.4, -1.4, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.blue.apply();
        this.trianglebig.display();
        this.scene.popMatrix();

        // My Stem
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(-Math.PI * 3 / 4, 0, 0, 1);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

    }
}