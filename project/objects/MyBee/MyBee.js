import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyEllipsoid } from "../../primitives/MyEllipsoid.js";
import { MySphere } from "../../primitives/MySphere.js";
import { MyCylinder } from "../../primitives/MyCylinder.js";
import { MyPollen } from "../MyFlower/MyPollen.js";

const BeeStates = {
    REGULAR_MOVEMENT: 'REGULAR_MOVEMENT',
    POLLEN_DESCENT: 'POLLEN_DESCENT',
    POLLEN_ASCENT: 'POLLEN_ASCENT',
    POLLEN_DELIVERY: 'POLLEN_DELIVERY'
};

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.state = BeeStates.REGULAR_MOVEMENT;
        this.pollen = new MyPollen(scene);
        this.activePollen = false;

        this.head = new MySphere(scene, 16, 16);
        this.antenna = new MyCylinder(scene, 16, 16);
        this.leg = new MyCylinder(scene, 16, 16);
        this.torax = new MyEllipsoid(scene, 16, 16, [1.3, 1.2, 1.7]);
        this.abdomen = new MyEllipsoid(scene, 16, 16, [1.2, 1.2, 1.3]);
        this.wing = new MyEllipsoid(scene, 16, 16, [0.7, 0.1, 0.4]);
        this.eye = new MyEllipsoid(scene, 16, 16, [1.4, 3, 2.5]);

        this.textureHead = new CGFtexture(scene, "textures/beeHead.png");
        this.textureBody = new CGFtexture(scene, "textures/beeBody.png");
        this.textureAbdomen = new CGFtexture(scene, "textures/beeAbdomen.png");

        this.headMaterial = new CGFappearance(scene);
        this.headMaterial.setEmission(1, 1, 1, 1);
        this.headMaterial.setTexture(this.textureHead);
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyMaterial = new CGFappearance(scene);
        this.bodyMaterial.setEmission(1, 1, 1, 1);
        this.bodyMaterial.setTexture(this.textureBody);
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.abdomenMaterial = new CGFappearance(scene);
        this.abdomenMaterial.setEmission(1, 1, 1, 1);
        this.abdomenMaterial.setTexture(this.textureAbdomen);
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.wingsMaterial = new CGFappearance(this.scene);
        this.wingsMaterial.setTexture(this.textureBody);
        this.wingsMaterial.setEmission(0, 0, 0, 0);
        this.wingsMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.wingsMaterial.setAmbient(0.3, 0.3, 0.3, 0.3);
        this.wingsMaterial.setDiffuse(0.6, 0.6, 0.6, 0.2);
        this.wingsMaterial.setSpecular(0, 0, 0, 0);
        this.wingsMaterial.setShininess(0);

        this.position = [0, 3, 0];
        this.orientation = 0;
        this.velocity = [0, 0, 0];
        this.wingAngle = 0;
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(1, 1, -1);

        this.scene.pushMatrix();
        this.headMaterial.apply();

        // Display the 1st right leg
        this.scene.pushMatrix();
        this.scene.translate(0.8, -0.5, 0.3);
        this.scene.rotate(3 * Math.PI / 6, 1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.01, -1.1, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.4);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 1st  left leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -0.5, 0.3);
        this.scene.rotate(-3 * Math.PI / 6, -1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.01, -1.1, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.4);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 2nd right leg
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1, 1);
        this.scene.rotate(3 * Math.PI / 6, 1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.01, -1.7, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 2nd left leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1, 1);
        this.scene.rotate(-3 * Math.PI / 6, -1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.01, -1.7, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 3rd right leg
        this.scene.pushMatrix();
        this.scene.translate(0.8, -1.3, 1.7);
        this.scene.rotate(3 * Math.PI / 6, 1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.01, -2, 1.7);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        // Display the 3rd left leg
        this.scene.pushMatrix();
        this.scene.translate(-0.8, -1.3, 1.7);
        this.scene.rotate(-3 * Math.PI / 6, -1, 1, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.3);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.01, -2, 1.7);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.5);
        this.leg.display();
        this.scene.popMatrix();

        //Display the head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.head.display();
        this.scene.popMatrix();

        // Display the abdomen
        this.abdomenMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.6, 2.5);
        this.abdomen.display();
        this.scene.popMatrix();

        this.bodyMaterial.apply();

        // Display the right antenna
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0.8, -2.3);
        this.scene.rotate(Math.PI / 4, Math.PI / 4, 1, 0);
        this.scene.scale(0.02, 0.02, 0.8);
        this.antenna.display();
        this.scene.popMatrix();

        // Display the left antenna
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0.8, -2.3);
        this.scene.rotate(-Math.PI / 4, -Math.PI / 4, 1, 0);
        this.scene.scale(0.02, 0.02, 0.8);
        this.antenna.display();
        this.scene.popMatrix();

        // Display the torax
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 1.5);
        this.scene.rotate(Math.PI / 12, 1, 0, 0);
        this.torax.display();
        this.scene.popMatrix();

        // Display the right eye   
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0.1, -1.7);
        this.scene.rotate(1, 1, Math.PI / 2, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.eye.display();
        this.scene.popMatrix();

        // Display the left eye
        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0.1, -1.7);
        this.scene.rotate(1, 1, -Math.PI / 2, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.eye.display();
        this.scene.popMatrix();

        // Display the pollen
        if (this.activePollen) {
            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5);
            this.scene.translate(0, -3.5, 2.5);

            this.pollen.display();

            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.wingsMaterial.apply();

        // Display the right wing
        this.scene.pushMatrix();
        this.scene.translate(1.9, -0.2, 1.2);
        this.scene.rotate(Math.sin(this.wingAngle) * Math.PI / 24, 0, 0, 1); // Flap the wing based on sine function
        this.wing.display();
        this.scene.popMatrix();

        // Display the left wing
        this.scene.pushMatrix();
        this.scene.translate(-1.9, -0.2, 1.2);
        this.scene.rotate(-Math.sin(this.wingAngle) * Math.PI / 24, 0, 0, 1); // Flap the wing based on sine function
        this.wing.display();
        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }

    update(delta_t) {
        this.position[0] += this.velocity[0] * delta_t;
        this.position[1] += this.velocity[1] * delta_t;
        this.position[2] += this.velocity[2] * delta_t;

        let distance = Math.sqrt(this.position[0] ** 2 + this.position[1] ** 2 + this.position[2] ** 2);

        if (distance > 200) {
            let ratio = 200 / distance;
            this.position[0] *= ratio;
            this.position[1] *= ratio;
            this.position[2] *= ratio;
        }

        this.velocity[0] *= 0.90;
        this.velocity[1] *= 0.90;
        this.velocity[2] *= 0.90;
    }
    turn(val) {
        this.orientation += val;
    }

    accelerate(val) {
        this.velocity[0] += val * Math.sin(this.orientation);
        this.velocity[1] += val * Math.sin(this.orientation);
        this.velocity[2] += val * Math.cos(this.orientation);
    }

    ascend() {
        this.position[1] += 0.5;
    }

    updatePosition(position) {
        this.position = position;
    }

    updateWings(angle) {
        this.wingAngle = angle;
    }

    resetPosition() {
        this.position = [0, 3, 0];
        this.orientation = 0;
        this.velocity = [0, 0, 0];
        this.state = BeeStates.REGULAR_MOVEMENT;
        this.activePollen = false;
    }

    getPosition() {
        return this.position;
    }
    calculateDistanceXZ(x, z) {
        return Math.sqrt((this.position[0] - x) ** 2 + (this.position[2] - z) ** 2);
    }

    calculateDirectionVector(targetX, targetY, targetZ) {
        const dx = targetX - this.position[0];
        const dy = targetY - this.position[1];
        const dz = targetZ - this.position[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        return [dx / distance, dy / distance, dz / distance];
    }

    moveToTarget(targetX, targetY, targetZ, speed) {
        const directionVector = this.calculateDirectionVector(targetX, targetY, targetZ);
        this.position[0] += directionVector[0] * speed;
        this.position[1] += directionVector[1] * speed;
        this.position[2] += directionVector[2] * speed;
    }
}