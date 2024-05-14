import { CGFinterface, dat } from '../lib/CGF.js';

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        let displayMenu = this.gui.addFolder('Displays')
        displayMenu.add(this.scene, 'displayAxis').name('Display Axis');
        displayMenu.add(this.scene, 'displayNormals').name('Display Normals');

        //Dropdown for elements
        let objMenu = this.gui.addFolder('Visible Elements')
        objMenu.add(this.scene, 'displayPanorama').name('Display Panorama');
        objMenu.add(this.scene, 'displayFlower').name('Display Flower');
        objMenu.add(this.scene, 'displayRock').name('Display Rock');
        objMenu.add(this.scene, 'displayRockSet').name('Display Rock Set');
        objMenu.add(this.scene, 'displayBee').name('Display Bee');
        objMenu.add(this.scene, 'displayHive').name('Display Hive');
        objMenu.add(this.scene, 'displayGrass').name('Display Grass');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.initKeys();

        return true;
    }


    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}