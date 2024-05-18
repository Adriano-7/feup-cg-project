import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';
import { MyPyramid } from '../../primitives/MyPyramid.js';

export class MyGrass extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.grass = [];
        this.margin = 5;
        this.createGrass();

        this.textureLeaf = new CGFtexture(scene, "textures/leaf.jpg");
        this.leafMaterial = new CGFappearance(scene);
        this.leafMaterial.setEmission(1, 1, 1, 1);
        this.leafMaterial.setTexture(this.textureLeaf);
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    createGrass() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const leaf = new MyPyramid(this.scene, 4, 1);
                leaf.randomOffsetX = this.getRandomOffset();
                leaf.randomOffsetZ = this.getRandomOffset();
                this.grass.push(leaf);
            }
        }
    }

    getRandomOffset() {
        return (Math.random() - 0.5) * this.margin;
    }

    display() {
        this.scene.pushMatrix();

        this.leafMaterial.apply();

        const leafSize = 1; // Assuming a size of 1 for width and depth of each pyramid
        for (let i = 0; i < this.grass.length; i++) {
            const leaf = this.grass[i];
            const row = Math.floor(i / this.numCols);
            const col = i % this.numCols;
            const x = col * (leafSize + this.margin) + leaf.randomOffsetX;
            const z = row * (leafSize + this.margin) + leaf.randomOffsetZ;

            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            leaf.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }

}