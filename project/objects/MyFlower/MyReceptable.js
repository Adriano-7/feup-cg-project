import { CGFobject } from '../../../lib/CGF.js';
import { MyEllipsoid } from '../../primitives/MyEllipsoid.js';

/**
 * MyReceptable
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptable extends CGFobject {
    constructor(scene, rReceptable) {
        super(scene);
        this.ellipsoid = new MyEllipsoid(scene, 100, 100, [rReceptable, rReceptable, rReceptable / 2]);
    }

    display() {
        this.ellipsoid.display();
    }
}