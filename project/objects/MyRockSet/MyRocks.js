import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y-axis
 * @param stacks - Number of divisions along the Y-axis
 * @param bumpiness - Factor to control the amount of bumpiness (0 for smooth sphere)
 */
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, bumpiness = 0.2) {
        super(scene);
        this.latitude = stacks * 2;
        this.longitude = slices;
        this.bumpiness = bumpiness;
        this.initBuffers();

        this.textureRock = new CGFtexture(scene, "textures/rock.jpg");
        this.rockMaterial = new CGFappearance(scene);
        this.rockMaterial.setEmission(1, 1, 1, 1);
        this.rockMaterial.setTexture(this.textureRock);
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const deltaLat = Math.PI / this.latitude;
        const deltaLong = 2 * Math.PI / this.longitude;

        let firstVertex = null;

        for (let lat = 0; lat <= this.latitude; lat++) {
            const phi = lat * deltaLat;

            for (let long = 0; long <= this.longitude; long++) {
                const theta = long * deltaLong;

                let x, y, z;

                if (long === this.longitude && firstVertex) {
                    [x, y, z] = firstVertex;
                } else {
                    x = Math.sin(theta) * Math.sin(phi);
                    y = Math.cos(phi);
                    z = Math.cos(theta) * Math.sin(phi);

                    const bumpX = this.bumpiness * Math.random();
                    const bumpY = this.bumpiness * Math.random();
                    const bumpZ = this.bumpiness * Math.random();

                    x += bumpX;
                    y += bumpY;
                    z += bumpZ;

                    if (long === 0) {
                        firstVertex = [x, y, z];
                    }
                }

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);

                const s = 1 - (long / this.longitude);
                const t = lat / this.latitude;
                this.texCoords.push(s, t);

                if (lat < this.latitude && long < this.longitude) {
                    const curIdx = lat * (this.longitude + 1) + long;
                    const nextLonIdx = (lat * (this.longitude + 1) + (long + 1) % (this.longitude + 1));
                    const nextLatIdx = (lat + 1) * (this.longitude + 1) + long;
                    const nextLatLonIdx = ((lat + 1) * (this.longitude + 1) + (long + 1) % (this.longitude + 1));

                    this.indices.push(curIdx, nextLatIdx, nextLonIdx);
                    this.indices.push(nextLonIdx, nextLatIdx, nextLatLonIdx);
                    this.indices.push(nextLonIdx, nextLatIdx, curIdx);
                    this.indices.push(nextLatLonIdx, nextLatIdx, nextLonIdx);
                }
            }

            this.primitiveType = this.scene.gl.TRIANGLES;
            this.initGLBuffers();
        }
    }

    display() {
        this.scene.pushMatrix();
        this.rockMaterial.apply();
        super.display();
        this.scene.popMatrix();
    }
}