export class Note {
    constructor(name, id, homework, text) {
        this.name = name;
        this.id = id;
        this.homeworkId = homework;
        this.text = text;
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }
    setName(name) {
        this.name = name;
    }

    getHomeWorkId() {
        return this.homeworkId;
    }

    setHomeWorkId(id) {
        this.homeworkId = id;
    }

    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
    toJSON() {
        return {
            name: this.name,
            id: this.id,
            homeworkId: this.homeworkId,
            text: this.text
        }
    }
}
