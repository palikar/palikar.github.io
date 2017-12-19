export class Homework {


    constructor(name, id, desc, dueDate, date, type) {
        this.name = name;
        this.id = id;
        this.desc = desc;
        this.dueDate = dueDate;
        this.date = date;
        this.type = type;
        this.done = false;
    }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getDescription() {
        return this.desc;
    }
    setDescription(description) {
        this.desc = description;
    }
    getDueDate() {
        return this.dueDate;
    }
    getCreateDate() {
        return this.date;
    }
    setDueDate(date) {
        this.dueDate = date;
    }
    setCreateDate(date) {
        this.date = date;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    isDone() {
        return this.done;
    }
    setDone(done) {
        this.done = done;
    }
    toJSON() {
        return {
            name: this.name,
            desc: this.desc,
            dueDate: this.dueDate.toDateString(),
            date: this.date.toDateString(),
            type: this.type,
            id: this.id,
            done: this.done
        }
    }

}
