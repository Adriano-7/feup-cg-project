import { CGFobject, CGFappearance } from '../../../lib/CGF.js'; 
import { MyTriangle } from '../../oldClasses/MyTriangle.js'
import { MyCylinder } from '../../oldClasses/MyCylinder.js';
import { MyEllipsoid } from '../../oldClasses/MyEllipsoid.js';

export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);

        this.lLeaf = 6;
        
        // Define vertices for the two triangles
        const vertices1 = [
            0.25, 0, 1,          // 1
            0, -0.25, 0.5,      // 2
            0, 0.25, 0.5        // 3
        ];
        const vertices2 = [
            0,0,0,              // 4
            0, 0.25, 0.5,       // 5 = 3
            0, -0.25, 0.5       // 6 = 2
        ];


        // Create the triangles with the defined vertices
        this.triangle1 = new MyTriangle(scene, vertices1); 
        this.triangle2 = new MyTriangle(scene, vertices2); 
        this.cylinder1 = new MyCylinder(scene, 100, 20);
        this.cylinder2 = new MyCylinder(scene, 100, 20);
        this.ellipsoid1 = new MyEllipsoid(scene, 1);
        this.ellipsoid2 = new MyEllipsoid(scene, 1);

    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.lLeaf,this.lLeaf,this.lLeaf);
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.2,0.6,this.lLeaf/2)
        this.cylinder1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,3);
        this.scene.rotate(Math.PI / 180 * 25,0,1,0);
        this.scene.scale(0.2,0.6,this.lLeaf/4);
        this.cylinder2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,3);
        this.scene.scale(this.lLeaf/30, this.lLeaf/10, this.lLeaf/16);
        this.ellipsoid1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.6,0,4.3);
        this.scene.scale(this.lLeaf/30, this.lLeaf/10, this.lLeaf/16);
        this.ellipsoid1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.lLeaf,this.lLeaf,this.lLeaf);
        this.triangle2.display();
        this.scene.popMatrix();

    }
}
