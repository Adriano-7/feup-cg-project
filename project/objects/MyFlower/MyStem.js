import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../oldClasses/MyCylinder.js';
import { MyEllipsoid } from '../../oldClasses/MyEllipsoid.js';
import { MyLeaf } from '../MyFlower/MyLeaf.js';

export class MyStem extends CGFobject {
    constructor(scene, rStem, hStem) {
        super(scene);
        this.height = hStem;
        this.rStem = rStem;
        this.margin = 0.1
        this.rotateValue = 25;

        this.cylinder1 = new MyCylinder(scene, 100, 20);
        this.cylinder2 = new MyCylinder(scene, 100, 20);
        this.elipsoid = new MyEllipsoid(scene, 1);
        this.leaf = new MyLeaf(scene, 6);
    }

    display() {
        // ground cylinder 
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2 * this.height + this.height*this.margin); 
        this.scene.rotate(Math.PI / 180 * 15, 0, 1, 0); 
        this.scene.scale(this.rStem, this.rStem, this.height); 
        this.cylinder1.display();
        this.scene.popMatrix();

        // gap between cilynders stuff
        this.scene.pushMatrix();        
        this.scene.translate(this.rotateValue*this.height*this.margin*this.margin,0,this.height/2*this.margin - this.height);
        this.scene.scale(this.rStem+this.height*this.margin*this.margin+this.margin,this.rStem+this.margin,this.rStem+this.margin);
        this.elipsoid.display();
        this.scene.popMatrix();

        // leaf stuff
        this.scene.pushMatrix();
        this.scene.translate(this.margin*this.rotateValue*this.margin*this.height-this.margin+0.8*this.rStem, 0, -this.height+(this.height-10)/10);
        this.scene.rotate(Math.PI / 180 * this.rotateValue,0,1,0);
        this.scene.scale(2*this.height*this.margin,2*this.height*this.margin,2*this.height*this.margin);
        this.leaf.display();
        this.scene.popMatrix();

        // top cylinder
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0); 
        this.scene.rotate(Math.PI / 180 * 15, 0, 1, 0); 
        this.scene.scale(this.rStem, this.rStem, this.height); 
        this.cylinder2.display();
        this.scene.popMatrix();
    }
}
    