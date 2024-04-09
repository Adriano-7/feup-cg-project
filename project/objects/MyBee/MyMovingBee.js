import { MyBee } from './MyBee.js'

export class MyMovingBee extends MyMovingObject {
    constructor(scene) {

        let bee = new MyBee(scene)
        this.bee = bee
    }

    display() {
        super.display()
    }
}