import { CGFobject } from '../../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';

export class MyPetals extends CGFobject {
    constructor(scene, nPetals, lPetals, nLayers) {
        super(scene);
        this.nPetals = nPetals;
        this.lPetals = lPetals;
        this.nLayers = nLayers;

        console.log(`Número de pétalas: ${this.nPetals}`);
        console.log(`Número de camadas (layers): ${this.nLayers}`);

        // Arrays to store the petals of each layer
        this.petalsByLayer = [];

        let count1 = 0;

        // Calculate values for each layer
        for (let layer = 0; layer < this.nLayers; layer++) {
            count1 = count1 +1 ;
            const radius = this.calculateRadius(layer);
            const numPetals = this.calculateNumPetals(layer, radius);
            const angleIncrement = (2 * Math.PI) / numPetals;

            // Array to store petals of the current layer
            const layerPetals = [];

            // Create petals for this layer
            for (let i = 0; i < numPetals; i++) {
                let angle = i * angleIncrement;
                let x = radius * Math.cos(angle);
                let y = radius * Math.sin(angle);
                const petal = new MyPetal(scene);
            
                // Add petal to the array of the current layer
                const value = this.calculateAmbienteLight(layer)
                petal.material.setAmbient(1 * value, 0.608 * value, 0.812 * value, 1);
                layerPetals.push({ x, y, angle, petal, radius });
            }

            // Add the array of petals of the current layer to the general array
            this.petalsByLayer.push(layerPetals);
        }

        console.log(`Count N Layers : ${count1}`);
    }

    calculateAmbienteLight(layer) {
        return (2 / (layer + 1)) * 0.5;
    }

    calculateNumPetals(layer, radius) {
        return this.nPetals * (1 + layer / this.nLayers);
    }

    // Method to calculate the radius for a given layer
    calculateRadius(layer) {
        return 1.5 / (layer + 1);
    }


    calculateScaleFactor(layer) {
        return this.lPetals / (layer + 1); // Scale factor decreases as layer increases
    }
    
    // Method to display all the petals
    display() {

        console.log("hi, you enter here");
        // Display all the petals in each layer
        for (let layer = 0; layer < this.nLayers; layer++) {
            const layerPetals = this.petalsByLayer[layer];
            const numPetals = layerPetals.length;
        
            // Calculate the scale factor for this layer
            const scaleFactor = this.calculateScaleFactor(layer);
        
            // Display the petals of this layer
            for (let i = 0; i < numPetals; i++) {
                const petalInfo = layerPetals[i];
                this.scene.pushMatrix();
                this.scene.translate(petalInfo.x, petalInfo.y, 0);
                this.scene.rotate(petalInfo.angle + Math.PI / 2, 0, 0, 1);
                
                // Scale the petal
                this.scene.scale(scaleFactor, scaleFactor, scaleFactor);
                
                petalInfo.petal.display();
                this.scene.popMatrix();
            }
        }
        

    }

}
