import { CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MySphere } from '../../primitives/MySphere.js';
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
    constructor(scene, rStem, randomAngle) {
        super(scene);
        this.rStem = rStem;
        this.randomAngle = randomAngle;

        this.rock = new MySphere(scene, this.rStem, 20, 20);
        this.rockShader = new CGFshader(scene.gl, 'shaders/rock1_shader.vert', 'shaders/rock1_shader.frag');

        // Load texture
        this.rockTexture = new CGFtexture(scene, 'images/rock.jpg');
    }

    display() {
        // Rock
        this.scene.pushMatrix();

        // Apply shader
        this.scene.setActiveShader(this.rockShader);

        // Apply texture
        this.rockTexture.bind();

        // Translate to position and display rock
        this.scene.scale(0.9, 0.5, 1);
        this.scene.rotate(this.randomAngle, this.randomAngle / 2, 1, 0);
        this.scene.translate(0, this.rStem - this.rStem / 2, 0);
        this.rock.display();

        // restore default shader (will be needed for drawing the axis in next frame)
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }
}