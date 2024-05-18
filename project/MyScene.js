import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./primitives/MyPlane.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRockSet } from './objects/MyRockSet/MyRockSet.js';
import { MyBee } from './objects/MyBee/MyBee.js';
import { MyGarden } from './objects/MyGarden/MyGarden.js';
import { MyHive } from './objects/MyHive/MyHive.js';

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

        this.bee = new MyBee(this);
        this.garden = new MyGarden(this, 6, 6);
        this.rockset = new MyRockSet(this, 6, 6);
        this.hive = new MyHive(this);

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
        this.displayRockSet = true;
        this.displayHive = true;
        this.displayGrass = false;
        this.displayTerrain = true;

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
        // Calculate time delta
        const deltaTime = t - this.previousTime;
        this.previousTime = t;
        this.beePosition = this.bee.getPosition();

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

        let value1 = 100;

        if (this.displayPanorama) {
            this.panorama.display();
            this.pushMatrix();
            this.terrainAppearance.apply();
            this.translate(0, -value1, 0);
            this.scale(400, 400, 400);
            this.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.plane.display();
            this.popMatrix();
        }
        if (this.displayFlowers) {
            this.pushMatrix();
            this.scale(0.2, 0.2, 0.2);
            this.translate(-500,-400,-500);
            this.garden.display();
            this.popMatrix();

        }
        if (this.displayBee) { this.bee.display(); }
        if (this.displayRockSet) {
            this.pushMatrix();
            this.scale(2, 2, 2);
            this.translate(0,-value1/2-2,0);
            this.rockset.display();
            this.popMatrix();

        }
        if (this.displayHive) {
            this.pushMatrix();
            this.rotate(-Math.PI / 2, 0, 0);
            this.hive.display();
            this.popMatrix();

        }
        if (this.displayGrass) this.garden.display();

        this.checkKeys();
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
            this.bee.resetPosition();
        }

        if (keysPressed) {
            console.log(text);
        }

    }
}