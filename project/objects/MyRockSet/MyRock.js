import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../oldClasses/MySphere.js';

export class MyRock extends CGFobject {
    constructor(scene, rStem) {
        super(scene);
        this.rStem = rStem;
        this.margin = 0.1;

        this.rock = new MySphere(scene, this.rStem, 20, 20);

        // Grey color
        this.grey = new CGFappearance(this.scene);
        this.grey.setAmbient(0.3, 0.3, 0.3, 1); 
        this.grey.setDiffuse(0.5, 0.5, 0.5, 1); 
        this.grey.setSpecular(0.1, 0.1, 0.1, 1); 
        this.grey.setShininess(5.0);

        // Shader
        this.shader = new CGFshader(scene.gl, 'project/shaders/texture3.vert', 'project/shaders/texture3.frag');

        // Uniforms
        this.shader.setUniformsValues({ normScale: 0.1 });

        // Textures
        this.texture = new CGFtexture(scene, 'textures/texture.jpg');
        this.texture2 = new CGFtexture(scene, 'textures/texture2.jpg');
        this.shader.setUniformsValues({ uSampler: 0, uSampler2: 1 });
    }

    display() {
        // Enable shader
        this.scene.setActiveShader(this.shader);

        // Set textures
        this.scene.setActiveTexture(this.texture, 0);
        this.scene.setActiveTexture(this.texture2, 1);

        // Rock
        this.scene.pushMatrix();
        this.grey.apply();
        this.scene.translate(0, this.rStem, 0);
        this.rock.display();
        this.scene.popMatrix();

        // Disable shader
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
