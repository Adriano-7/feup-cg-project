import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyFlower } from './MyFlower.js';

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
        this.skySphere = new MySphere(this, 30, 30);
        this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
        this.panorama = new MyPanorama(this, this.panoramaTexture);
        this.flower = new MyFlower(this);



        this.objects = [this.panorama, this.flower];
        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Panorama': 0, 'Flower': 1};


        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;

        this.enableTextures(true);

        this.terrainTexture = new CGFtexture(this, "images/terrain.jpg");
        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.setTexture(this.terrainTexture);
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.earthTexture = new CGFtexture(this, "images/earth.jpg");
        this.earthAppearance = new CGFappearance(this);
        this.earthAppearance.setTexture(this.earthTexture);
        this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');


        this.displayPanorama = false;
        this.displayFlower = false;
        // this.displayBee = false;
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
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateObjectComplexity() {
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
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
        } else {
            // Draw sky-sphere
            this.pushMatrix();
            this.terrainAppearance.apply();
            this.translate(0, -100, 0);
            this.scale(400, 400, 400);
            this.rotate(-Math.PI / 2.0, 1, 0, 0);
            this.plane.display();
            this.popMatrix();


            this.pushMatrix();
            this.earthAppearance.apply();
            this.skySphere.display();
            this.objects[this.selectedObject].display();

            this.popMatrix();
        }


        if(this.displayFlower) {
            this.flower.display();
        }
        //if(this.displayFlower) {
        //    this.flower.display();
        //}


        // ---- END Primitive drawing section

    }
}