import { CGFobject } from '../../../lib/CGF.js';
import { MyRock } from './MyRocks.js'

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.numRocks = numRocks;
        this.rocks = [];
        this.initRocks();
    }

    initRocks() {
        for (let i = 0; i < this.numRocks; i++) {
            const slices = 10 + Math.floor(Math.random() * 10);
            const stacks = 5 + Math.floor(Math.random() * 5);
            const bumpiness = Math.random() * 0.4;

            const rock = new MyRock(this.scene, slices, stacks, bumpiness);

            const scale = {
                x: 0.5 + Math.random() * 1.5,
                y: 0.5 + Math.random() * 1.5,
                z: 0.5 + Math.random() * 1.5
            };

            const position = {
                x: Math.random() * 2 - 1,
                y: i * 0.5,
                z: Math.random() * 2 - 1
            };

            const rotation = {
                angle: Math.random() * Math.PI,
                axis: [
                    Math.random(),
                    Math.random(),
                    Math.random()
                ]
            };

            this.rocks.push({ rock, scale, position, rotation });
        }
    }

    display() {
        this.rocks.forEach(({ rock, scale, position, rotation }) => {
            this.scene.pushMatrix();

            this.scene.translate(position.x, position.y, position.z);
            this.scene.rotate(rotation.angle, rotation.axis[0], rotation.axis[1], rotation.axis[2]);
            this.scene.scale(scale.x, scale.y, scale.z);

            rock.display();

            this.scene.popMatrix();
        });
    }

    getMaxHeight() {
        let maxHeight = 0;
        this.rocks.forEach(({ rock, scale, position }) => {
            const rockHeight = position.y + scale.y;
            if (rockHeight > maxHeight) {
                maxHeight = rockHeight;
            }
        });
        return maxHeight;
    }

}