import { CGFobject, CGFappearance } from '../../../lib/CGF.js'; // Ensure CGFappearance is imported
import { MyTriangle } from '../../oldClasses/MyTriangle.js'

export class MyPetal extends CGFobject {
    constructor(scene) {
        super(scene);
        
        // Define vertices for the two triangles
        const vertices1 = [
            0, 1, 0,
            -1, -1, 0,
            1, -1, 0
        ];
        const vertices2 = [
            0, -3, 1,
            1, -1, 0,   
            -1, -1, 0
        ];

        // Create the triangles with the defined vertices
        this.triangle1 = new MyTriangle(scene, vertices1); // First triangle
        this.triangle2 = new MyTriangle(scene, vertices2); // Second triangle

        // Pink Material
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 0.608, 0.812, 1);
        this.material.setDiffuse(1*0.4, 0.608*0.4, 0.812*0.4, 1);
        this.material.setSpecular(1, 0.608, 0.812, 1);
        this.material.setShininess(10.0);
    }

    display() {
        this.material.apply(); // Apply the material properties
        
        // Display the triangles
        this.triangle1.display();
        this.triangle2.display();
    }
}
