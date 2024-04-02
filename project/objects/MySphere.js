import { CGFobject } from '../../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y-axis
 * @param stacks - Number of divisions along the Y-axis
 */
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.latitude = stacks * 2;
        this.longitude = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const deltaLat = Math.PI / this.latitude;
        const deltaLong = 2 * Math.PI / this.longitude;

        for (let lat = 0; lat <= this.latitude; lat++) {
            const phi = lat * deltaLat;

            for (let long = 0; long <= this.longitude; long++) {
                const theta = long * deltaLong;

                const x = Math.cos(theta) * Math.sin(phi);
                const y = Math.cos(phi);
                const z = Math.sin(theta) * Math.sin(phi);

                const s = 1 - (long / this.longitude);
                const t = 1 - (lat / this.latitude);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(s, t);

                if (lat < this.latitude && long < this.longitude) {
                    const current = lat * (this.longitude + 1) + long;
                    const next = current + this.longitude + 1;

                    this.indices.push(current, next, current + 1);
                    this.indices.push(next, next + 1, current + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}