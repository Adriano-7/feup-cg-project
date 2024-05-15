import { CGFobject, CGFappearance } from '../../../lib/CGF.js'; // Ensure CGFappearance is imported
import { MyTriangle } from '../../primitives/MyTriangle.js'

export class MyPetal extends CGFobject {
    constructor(scene) {
        super(scene);

        // Define vertices for the two triangles
        const vertices1 = [
            0, 1, 0, // 1
            -0.25, 0.5, 0, // 2
            0.25, 0.5, 0 // 3
        ];
        const vertices2 = [
            0, 0, 0.25, // 4
            0.25, 0.5, 0, // 5 = 3
            -0.25, 0.5, 0 // 6 = 2
        ];

        // Create the triangles with the defined vertices
        this.triangle1 = new MyTriangle(scene, vertices1);
        this.triangle2 = new MyTriangle(scene, vertices2);

    }

    display() {
        // Display the triangles

        this.triangle1.display();
        this.triangle2.display();
    }
}