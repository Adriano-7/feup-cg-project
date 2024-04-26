import { CGFobject } from '../../../lib/CGF.js';
import { MyRockSphere } from './MyRockSphere.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.radius = 3;
        this.spacing = 3;

        // Create an array to store the positions of the rocks
        this.rockPositions = [];

        // Generate positions for the rocks
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let x = j * this.spacing;
                let z = i * this.spacing;
                let y = (i === 0 || i === 4 || j === 0 || j === 4) ? 0 : 3; // Set y-coordinate
                this.rockPositions.push({ x, y, z });
            }
        }

        // Adjust the center rock's y-coordinate to be higher
        let centerIndex = Math.floor(this.rockPositions.length / 2); // Get the index of the center rock
        this.rockPositions[centerIndex].y = 6;

        // Create rock objects for each position
        this.rocks = [];
        for (let i = 0; i < this.rockPositions.length; i++) {
            let position = this.rockPositions[i];
            let rock = new MyRockSphere(scene, this.radius); // Create a rock sphere
            rock.position = position; // Set the position of the rock
            this.rocks.push(rock); // Add the rock to the array
        }
    }

    display() {
        // Display all rocks in their respective positions
        for (let i = 0; i < this.rocks.length; i++) {
            let rock = this.rocks[i];
            this.scene.pushMatrix();
            this.scene.translate(rock.position.x, rock.position.y, rock.position.z); // Translate to the specified position
            rock.display(); // Display the rock
            this.scene.popMatrix();
        }
    }
}
