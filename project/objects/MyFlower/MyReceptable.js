import { CGFobject } from '../../../lib/CGF.js';
import { MyEllipsoid } from '../../oldClasses/MyEllipsoid.js';

/**
 * MyReceptable
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptable extends CGFobject {
    constructor(scene, rReceptable) {
        super(scene);
        
        // Pass slices and stacks parameters when creating MySphere
        this.sphere = new MyEllipsoid(scene, rReceptable); // You can adjust the values of slices and stacks as needed
    }

    display() {
        // Display the sphere
        this.sphere.display();
    }
}
