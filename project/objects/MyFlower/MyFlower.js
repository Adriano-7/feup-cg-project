import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyPetals } from './MyPetals.js';
import { MyReceptable } from './MyReceptable.js';
import { MyStem } from './MyStem.js';

/**
 *  MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(scene, externalRadius, numberOfPetals, receptacleRadius, stemRadius, stemHeight) {
        super(scene);

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.externalRadius = externalRadius;
        this.numberOfPetals = numberOfPetals;
        this.receptacleRadius = receptacleRadius;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;

        this.texturePetals = new CGFtexture(scene, "images/flowerPetals1.jpg");
        this.petalMaterial = new CGFappearance(scene);
        this.petalMaterial.setEmission(1, 1, 1, 1);
        this.petalMaterial.setTexture(this.texturePetals);
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textureReceptacle = new CGFtexture(scene, "images/flowerReceptacle1.jpg");
        this.receptacleMaterial = new CGFappearance(scene);
        this.receptacleMaterial.setEmission(1, 1, 1, 1);
        this.receptacleMaterial.setTexture(this.textureReceptacle);
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textureStem = new CGFtexture(scene, "images/flowerStem1.jpg");
        this.stemMaterial = new CGFappearance(scene);
        this.stemMaterial.setEmission(1, 1, 1, 1);
        this.stemMaterial.setTexture(this.textureStem);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.textureLeaf = new CGFtexture(scene, "images/leaf.jpg");
        this.leafMaterial = new CGFappearance(scene);
        this.leafMaterial.setEmission(1, 1, 1, 1);
        this.leafMaterial.setTexture(this.textureLeaf);
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');

        let lPetals = externalRadius - receptacleRadius
        let nLayers = 1;

        // Create petal and receptacle objects
        this.petals = new MyPetals(scene, externalRadius, numberOfPetals, lPetals, nLayers);
        this.receptacle = new MyReceptable(scene, receptacleRadius);
        this.stem = new MyStem(scene, stemRadius, stemHeight);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        // Display petals
        this.scene.pushMatrix();
        this.petalMaterial.apply();
        this.petals.display();
        this.scene.popMatrix();

        // Display receptacle
        this.scene.pushMatrix();
        this.receptacleMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        // Display stem
        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    getReceptaclePosition() {
        return [this.x, this.y + this.stemHeight + this.receptacleRadius / 2, this.z];
    }
}