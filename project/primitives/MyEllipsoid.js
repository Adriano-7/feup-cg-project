import { CGFobject } from '../../lib/CGF.js';

/**
 * MyEllipsoid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y-axis
 * @param stacks - Number of divisions along the Y-axis
 * @param scale - Array with the scale factors for each axis
 */
export class MyEllipsoid extends CGFobject {
    constructor(scene, slices, stacks, scale = [1, 1, 1]) {
        super(scene);
        this.latitude = stacks * 2;
        this.longitude = slices;
        this.scale = scale;
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

                const scaleX = (this.scale)[0];
                const scaleY = (this.scale)[1];
                const scaleZ = (this.scale)[2];

                const x = scaleX * Math.sin(theta) * Math.sin(phi);
                const y = scaleY * Math.cos(phi);
                const z = scaleZ * Math.cos(theta) * Math.sin(phi);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);

                const s = long / this.longitude;
                const t = lat / (this.latitude - 1);
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
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}