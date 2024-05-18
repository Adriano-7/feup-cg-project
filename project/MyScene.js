import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./primitives/MyPlane.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRockSet } from './objects/MyRockSet/MyRockSet.js';
import { MyBee } from './objects/MyBee/MyBee.js';
import { MyGarden } from './objects/MyGarden/MyGarden.js';
import { MyHive } from './objects/MyHive/MyHive.js';
import { MyPollen } from './objects/MyFlower/MyPollen.js';
import { MyGrass } from './objects/MyGrass/MyGrass.js';
import { MyRock } from './primitives/MyRocks2.js';
import { MyRockSet2 } from './primitives/MyRockSet2.js';



/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);

        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 30);
        this.panorama = new MyPanorama(this);

        this.nearestPollen = null;

        this.bee = new MyBee(this);
        this.garden = new MyGarden(this, 6, 6);
        this.rockset = new MyRockSet(this, 6, 6);
        this.hive = new MyHive(this);
        this.grass = new MyGrass(this, 10, 10);
        this.rock2 = new MyRock(this, 6, 6, 0.2);
        this.rockset2 = new MyRockSet2(this, 4);

        this.pollens = [];
        for (let i = 0; i < this.garden.flowers.length; i++) {
            const flower = this.garden.flowers[i];

            const pollen = new MyPollen(this);

            const randomAngle = Math.random() * 2 * Math.PI;
            pollen.setRotation(randomAngle);

            const receptaclePosition = flower.getReceptaclePosition();
            pollen.setPosition(receptaclePosition[0] * 0.2 - 600 * 0.2, (receptaclePosition[1] - flower.stemHeight) * 0.2 - 400 * 0.2, receptaclePosition[2] * 0.2 - 600 * 0.2);

            this.pollens.push(pollen);
        }

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.enableTextures(true);

        this.terrainTexture = new CGFtexture(this, "images/terrain.png");
        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.setTexture(this.terrainTexture);
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.terrainAppearance.setEmission(1, 1, 1, 1);

        this.displayPanorama = true;
        this.displayBee = true;
        this.displayFlowers = true;
        this.displayRockSet = false;
        this.displayHive = true;
        this.displayTerrain = true;
        this.displayGrass = true;

        // Initialize bee state and variables
        this.oscillationSpeed = 2 * Math.PI; // Speed of oscillation (radians per second)
        this.oscillationAmplitude = 0.2; // Amplitude of oscillation (units)
        this.oscillationPhase = 0; // Current phase of oscillation animation
        this.wingAngle = 0; // Initial wing rotation angle
        this.wingSpeed = 3; // Speed of wing flapping (in radians per second)

        this.previousTime = 0; // Time of the previous update

        // set the scene update period 
        this.setUpdatePeriod(50);
    }

    initLights() {
        this.lights[0].setPosition(15, 0, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(
            1.0,
            0.1,
            1000,
            vec3.fromValues(50, 10, 15),
            vec3.fromValues(0, 0, 0)
        );
    }

    update(t) {
        const deltaTime = t - this.previousTime;
        this.previousTime = t;
        this.beePosition = this.bee.getPosition();

        switch (this.bee.state) {
            case "REGULAR_MOVEMENT":
                // Update oscillation animation
                const oscillationDelta = this.oscillationSpeed * deltaTime / 1000; // Convert milliseconds to seconds
                this.oscillationPhase += oscillationDelta;
                const oscillationOffset = Math.sin(this.oscillationPhase) * this.oscillationAmplitude;

                // Update bee position
                this.beePosition[1] = 3 + oscillationOffset; // Adjust vertical position based on oscillation

                // Update wing rotation angle
                this.wingAngle += this.wingSpeed * deltaTime / 1000; // Convert milliseconds to seconds

                // Update bee display position
                this.bee.updatePosition(this.beePosition);
                this.bee.updateWings(this.wingAngle);
                this.bee.update(deltaTime);
                break;
            case "POLLEN_DESCENT":
                if (this.nearestPollen != null) {
                    const yDistance = this.beePosition[1] - this.nearestPollen.y;
                    if (yDistance < 1) {
                        const index = this.pollens.indexOf(this.nearestPollen);
                        if (index > -1) {
                            this.pollens.splice(index, 1);
                        }
                        this.bee.activePollen = true;
                    } else {
                        this.bee.moveToTarget(this.nearestPollen.x, this.nearestPollen.y, this.nearestPollen.z, 1);
                    }
                }
                break;
            case "POLLEN_ASCENT":
                if (this.beePosition[1] < 0) {
                    this.bee.ascend();
                } else {
                    this.bee.state = "REGULAR_MOVEMENT";
                }
                break;

            case "POLLEN_DELIVERY":
                const distance = ((this.beePosition[0] + 82) ** 2 + (this.beePosition[1] + 86) ** 2 + (this.beePosition[2] - 96) ** 2) ** 0.5;
                if (distance < 1) {
                    this.bee.state = "POLLEN_ASCENT";
                    this.bee.activePollen = false;
                } else {
                    this.bee.moveToTarget(-82, -86, 96, 1);
                    this.bee.update(deltaTime);
                }
                break;

            default:
                break;
        }
    }


    display() {
        // Clear image and depth buffer every time we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) this.axis.display();

        if (this.displayPanorama) {
            this.panorama.display();
            this.pushMatrix();
            this.terrainAppearance.apply();
            this.translate(0, -100, 0);
            this.scale(400, 400, 400);
            this.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.plane.display();
            this.popMatrix();
        }
        if (this.displayFlowers) {
            this.pushMatrix();
            for (const pollen of this.pollens) {
                pollen.display();
            }
            this.scale(0.2, 0.2, 0.2);
            this.translate(-600, -400, -600);
            this.garden.display();
            this.popMatrix();
        }
        if (this.displayBee) {
            this.bee.display();
        }
        if (this.displayRockSet) {
            this.pushMatrix();
            this.scale(2, 2, 2);
            this.translate(0, -100 / 2 - 2, 0);
            this.rockset.display();
            this.popMatrix();

        }
        if (this.displayHive) {
            this.pushMatrix();
            this.scale(2, 2, 2);
            this.rotate(Math.PI / 4 + Math.PI / 2, 0, 1, 0);
            this.translate(0, 100 / 2, 0);
            this.translate(45, 0, -30);
            this.hive.display();
            this.popMatrix();
        }


        if (this.displayGrass) {
            this.pushMatrix();
            this.scale(0.4, 10, 0.4);
            this.translate(0, -10, 0)
            this.grass.display();
            this.popMatrix();
        }

        this.rock2.display();
        this.rockset2.display();
        this.checkKeys();
    }

    findNearestFlowerPollen() {
        let minDistance = Infinity;
        let nearestPollen = null;
        for (const pollen of this.pollens) {
            const distance = this.bee.calculateDistanceXZ(pollen.x, pollen.z);
            if (distance < minDistance) {
                minDistance = distance;
                nearestPollen = pollen;
            }
        }
        return nearestPollen;
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;

        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
            this.bee.accelerate(0.001);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            this.bee.accelerate(-0.001);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            this.bee.turn(0.03);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
            this.bee.turn(-0.03);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            keysPressed = true;
            this.bee.resetPosition();
        }

        if (this.gui.isKeyPressed("KeyF")) {
            if (this.bee.state === "REGULAR_MOVEMENT") {
                keysPressed = true;
                this.nearestPollen = this.findNearestFlowerPollen();
                this.bee.state = "POLLEN_DESCENT";
            }
        }

        if (this.gui.isKeyPressed("KeyP")) {
            if (this.bee.state === "POLLEN_DESCENT") {
                keysPressed = true;
                this.bee.state = "POLLEN_ASCENT";
            }
        }

        if (this.gui.isKeyPressed("KeyO")) {
            if (this.bee.activePollen) {
                keysPressed = true;
                this.bee.state = "POLLEN_DELIVERY";
            }
        }

        if (keysPressed) {
            console.log(text);
        }

    }
}