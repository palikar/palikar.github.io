export class Notification {

    constructor(name, isNew, text) {
        this.name = name;
        this.isNew = isNew;
        this.text = text;
    }

    getName() {
        return this.name;
    }

    isNew() {
        return this.isNew;
    }

    getText() {
        return this.text;
    }
    toJSON() {
        return {
            name: this.name,
            isNew = this.isNew;
            text = this.text;
        }
    }

}
