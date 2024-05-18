import { CGFobject } from '../../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';

export class MyPetals extends CGFobject {
    constructor(scene, rExt, nPetals, lPetals, nLayers) {
        super(scene);
        this.rExt = rExt;
        this.nPetals = nPetals;
        this.lPetals = lPetals;
        this.nLayers = nLayers;
        this.petalsByLayer = [];

        // Calculate values for each layer
        for (let layer = 0; layer < this.nLayers; layer++) {
            const radius = this.calculateRadius(layer);
            const numPetals = this.calculateNumPetals(layer);
            const angleIncrement = (2 * Math.PI) / numPetals;

            const layerPetals = [];

            // Create petals for this layer
            for (let i = 0; i < numPetals; i++) {
                let angle = i * angleIncrement;
                //let x = radius;
                //let y = radius;
                let x = radius * Math.cos(angle);
                let y = radius * Math.sin(angle);

                let z = layer * 0.1; // Increase Z a bit for each layer
                const petal = new MyPetal(scene);
                layerPetals.push({ x: x, y: y, z: z, angle: angle, petal: petal, radius: radius });
            }

            // Add the array of petals of the current layer to the general array
            this.petalsByLayer.push(layerPetals);
        }

    }

    calculateNumPetals(layer) {
        return this.nPetals * (1 + layer / this.nLayers);
    }

    calculateRadius(layer) {
        if (layer === 0) return this.rExt;
        return this.rExt * Math.pow(0.85, layer);
    }

    calculateScaleFactor(layer) {
        if (layer === 0) {
            return this.lPetals;
        } else {
            return (3 / 4) * this.calculateScaleFactor(layer - 1);
        }
    }

    // Method to display all the petals
    display() {
        for (let layer = 0; layer < this.nLayers; layer++) {
            const layerPetals = this.petalsByLayer[layer];

            // Display the petals of this layer
            for (let i = 0; i < layerPetals.length; i++) {
                const petalInfo = layerPetals[i];

                // Calculate angle to the center
                let angleToCenter = Math.atan2(petalInfo.y, petalInfo.x);
                // Adjust angle to face forward
                angleToCenter += Math.PI / 2;

                this.scene.pushMatrix();
                this.scene.translate(petalInfo.x, petalInfo.y, petalInfo.z);
                this.scene.rotate(angleToCenter, 0, 0, 1);
                this.scene.scale(this.calculateScaleFactor(layer), this.calculateScaleFactor(layer), this.calculateScaleFactor(layer));

                petalInfo.petal.display();
                this.scene.popMatrix();
            }
        }
    }
}