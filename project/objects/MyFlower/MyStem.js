import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../oldClasses/MyCylinder.js';

export class MyStem extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cylinder1 = new MyCylinder(scene, 100, 20);
        this.cylinder2 = new MyCylinder(scene, 100, 20);
    }

    moveStem() {
        // Obtendo a altura dos cilindros
        let height = this.cylinder1.getHeight();

        // Movendo o segundo cilindro para cima, de modo que seu topo coincida com a base do primeiro cilindro
        this.cylinder2.setHeight(height);
        this.cylinder2.translate(0, 0, height);
    }

    display() {
        // Exibindo os cilindros
        this.cylinder1.display();
        this.cylinder2.display();

        // Realizando transformações adicionais no primeiro cilindro (caule)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1); // Ajuste a translação com base no tamanho da flor
        this.cylinder1.display();
        this.scene.popMatrix();
    }
}
