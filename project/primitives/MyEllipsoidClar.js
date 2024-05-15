import { CGFobject } from '../../lib/CGF.js';

/**
 * MyEllipsoidClar
 * @constructor
 * @param scene - Referência ao objeto MyScene
 * @param rReceptable - Raio da esfera achatada (igual em x e y) e metade da altura
 */
export class MyEllipsoidClar extends CGFobject {
    constructor(scene, rReceptable) {
        super(scene);
        this.rReceptable = rReceptable;
        this.initBuffers();
    }

    initBuffers() {
        this.slices = 100;
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var alphaAng = 2 * Math.PI / this.slices;
        var betaAng = Math.PI / this.slices;

        // Fatores de escala para a elipsoide
        var xScale = this.rReceptable; // Fator de escala para o eixo x
        var yScale = this.rReceptable; // Fator de escala para o eixo y
        var zScale = this.rReceptable / 2; // Fator de escala para o eixo z (altura)

        for (var i = 0; i <= this.slices; i++) {
            var stackAngle = Math.PI / 2 - i * betaAng;
            var xy = Math.cos(stackAngle);
            var z = zScale * Math.sin(stackAngle); // Aplicar escala à coordenada z

            for (var j = 0; j <= this.slices; j++) {
                var alpha = j * alphaAng;

                var x = xScale * xy * Math.cos(alpha); // Aplicar escala à coordenada x
                var y = yScale * xy * Math.sin(alpha); // Aplicar escala à coordenada y

                this.vertices.push(x, y, z);

                // Calcular normal suavizada
                var normal = vec3.fromValues(x, y, z);
                vec3.normalize(normal, normal);
                this.normals.push(normal[0], normal[1], normal[2]);

                if (i < this.slices && j < this.slices) {
                    var first = i * (this.slices + 1) + j;
                    var second = first + this.slices + 1;

                    // Inverter a ordem dos índices para renderizar corretamente a superfície externa
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }


    /**
     * Chamado quando o usuário interage com a GUI para alterar a complexidade do objeto.
     * @param {integer} complexity - Altera o número de fatias
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); // Complexidade varia de 0 a 1, então fatias variam de 3 a 12
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}