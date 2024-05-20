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

        this.flowerType = Math.floor(Math.random() * 2) + 1;

        this.externalRadius = externalRadius;
        this.numberOfPetals = numberOfPetals;
        this.receptacleRadius = receptacleRadius;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;

        this.texturePetals1 = new CGFtexture(scene, "textures/flower1Petals.jpg");
        this.petal1Material = new CGFappearance(scene);
        this.petal1Material.setEmission(1, 1, 1, 1);
        this.petal1Material.setTexture(this.texturePetals1);
        this.petal1Material.setTextureWrap('REPEAT', 'REPEAT');

        this.textureReceptacle1 = new CGFtexture(scene, "textures/flowerReceptacle1.jpg");
        this.receptacleMaterial1 = new CGFappearance(scene);
        this.receptacleMaterial1.setEmission(1, 1, 1, 1);
        this.receptacleMaterial1.setTexture(this.textureReceptacle1);
        this.receptacleMaterial1.setTextureWrap('REPEAT', 'REPEAT');

        this.textureStem1 = new CGFtexture(scene, "textures/flowerStem1.jpg");
        this.stemMaterial1 = new CGFappearance(scene);
        this.stemMaterial1.setEmission(1, 1, 1, 1);
        this.stemMaterial1.setTexture(this.textureStem1);
        this.stemMaterial1.setTextureWrap('REPEAT', 'REPEAT');

        this.texturePetals2 = new CGFtexture(scene, "textures/flower2Petals.jpg");
        this.petal2Material = new CGFappearance(scene);
        this.petal2Material.setEmission(1, 1, 1, 1);
        this.petal2Material.setTexture(this.texturePetals2);
        this.petal2Material.setTextureWrap('REPEAT', 'REPEAT');

        this.textureReceptacle2 = new CGFtexture(scene, "textures/flowerReceptacle2.jpg");
        this.receptacleMaterial2 = new CGFappearance(scene);
        this.receptacleMaterial2.setEmission(1, 1, 1, 1);
        this.receptacleMaterial2.setTexture(this.textureReceptacle2);
        this.receptacleMaterial2.setTextureWrap('REPEAT', 'REPEAT');

        this.textureLeaf = new CGFtexture(scene, "textures/leaf.jpg");
        this.leafMaterial = new CGFappearance(scene);
        this.leafMaterial.setEmission(1, 1, 1, 1);
        this.leafMaterial.setTexture(this.textureLeaf);
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');

        let lPetals = externalRadius - receptacleRadius
        let nLayers = 2;

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
        this.flowerType === 1 ? this.petal1Material.apply() : this.petal2Material.apply();
        this.petals.display();
        this.scene.popMatrix();

        // Display receptacle
        this.scene.pushMatrix();
        this.flowerType === 1 ? this.receptacleMaterial1.apply() : this.receptacleMaterial2.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        // Display stem
        this.scene.pushMatrix();
        this.stemMaterial1.apply();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    getReceptaclePosition() {
        return [this.x, this.y + this.stemHeight + this.receptacleRadius / 2, this.z];
    }
}