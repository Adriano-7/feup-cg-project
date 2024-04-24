import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../oldClasses/MyCylinder.js';
import { MyLeaf } from '../MyFlower/MyLeaf.js';

export class MyStem extends CGFobject {
    constructor(scene, rStem, hStem) {
        super(scene);
        this.rStem = rStem;
        this.height = hStem;
        this.margin = 0.1;

        this.cylinder1 = new MyCylinder(scene, 100, 20);
        this.cylinder2 = new MyCylinder(scene, 100, 20);
        this.leaf = new MyLeaf(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2 * this.height + 1); 
        this.scene.rotate(Math.PI / 180 * 15, 0, 1, 0); 
        this.scene.scale(this.rStem, this.rStem, this.height); 
        this.cylinder1.display();
        this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.translate(Math.PI - 1, 0, -this.height - this.margin); 
        // this.scene.rotate(Math.PI / 180 * 45, 0, 1, 0); 
        // this.scene.scale(this.rStem / 4, this.rStem - this.margin, this.height / 4); 
        // this.cylinder3.display();
        // this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3*this.rStem-3*this.margin, 0, -this.height+this.margin);
        this.scene.rotate(Math.PI / 180 * 20,0,1,0);
        this.leaf.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0); 
        this.scene.rotate(Math.PI / 180 * 15, 0, 1, 0); 
        this.scene.scale(this.rStem, this.rStem, this.height); 
        this.cylinder2.display();
        this.scene.popMatrix();
    }
}
