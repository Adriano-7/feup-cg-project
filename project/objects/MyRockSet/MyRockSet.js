import { CGFobject } from '../../../lib/CGF.js';
import { MyRock } from '../MyRockSet/MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.initBuffers();
        this.radius = 3;
        this.spacing = 10;
        this.numRows = numRows;
        this.numCols = numCols;
        this.rockSet = [];
        this.margin = 5;
        this.smallmargin = 0.2;

        // Generate positions for the rocks
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const randomRadius = Math.floor(Math.random() * 5 + this.radius);
                const randomAngle = Math.random() * Math.PI * 1;
                const randomScaleSize = Math.random() * 4 + 1;
                const xOffset = Math.random() * this.spacing - this.spacing / 2; // Random x offset within [-spacing/2, spacing/2]
                const zOffset = Math.random() * this.spacing - this.spacing / 2; // Random z offset within [-spacing/2, spacing/2]
                const rock = new MyRock(scene, randomRadius, randomAngle);
                rock.position = { 
                    x: i * (2 * this.radius + this.margin) - (this.numRows - 1) * this.radius + xOffset, 
                    y: 0, 
                    z: j * (2 * this.radius + this.margin) - (this.numCols - 1) * this.radius + zOffset };
                this.rockSet.push(rock);
                rock.randomScaleSize = randomScaleSize;
            }
        }
    }

    display() {
        // Display all rocks in their respective positions
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const rockIndex = i * this.numCols + j;
                const rock = this.rockSet[rockIndex];
                const rockRandomSizeScale = rock.randomScaleSize;
                this.scene.pushMatrix();
                this.scene.scale(rockRandomSizeScale, rockRandomSizeScale, rockRandomSizeScale);
                this.scene.translate(rock.position.x, rock.position.y-this.smallmargin, rock.position.z); 
                rock.display();
                this.scene.popMatrix();
            }
        }
    }
}