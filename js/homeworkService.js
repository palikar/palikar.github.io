import {
    Homework
} from './homework.js'


class HomeworkService {
    constructor() {
        this.homeworks = [];
        var fromStorage = window.localStorage.getItem("homeworks_");
        if (!fromStorage) {
            window.localStorage.setItem("homeworks_", "");
        } else {
            var homeworks = JSON.parse(fromStorage);
            for (var i = 0; i < homeworks.length; ++i) {
                this.homeworks[i] = new Homework(
                    homeworks[i].name,
                    homeworks[i].id,
                    homeworks[i].desc,
                    new Date(homeworks[i].dueDate),
                    new Date(homeworks[i].date),
                    homeworks[i].type
                );
                this.homeworks[i].setDone(homeworks[i].done);
            }
        }
    }

    saveHomeworks() {
        var storageItem = JSON.stringify(this.homeworks);
        window.localStorage.setItem("homeworks_", storageItem);
    }


    createHomework(name, desc, type, dueDate) {
        var id = 0;
        var ids = this.homeworks.map(obj => obj.getId());
        while (ids.indexOf(id) != -1) id++;
        this.homeworks.push(new Homework(name, id, desc, new Date(dueDate), new Date(), type));
        this.saveHomeworks();
    }

    remove(id) {
        for (var i = 0; i < this.homeworks.length; ++i) {
            if (this.homeworks[i].getId() == id) {
                this.homeworks.splice(i, 1);
                this.saveHomeworks();
                return;
            }
        }
    }

    getAllHomeworks() {
        return this.homeworks;
    }
    getHomework(id) {
        for (var i = 0; i < this.homeworks.length; ++i) {
            if (this.homeworks[i].getId() == id) {
                return this.homeworks[i];
            }
        }
    }


    update(id, values) {
        for (var i = 0; i < this.homeworks.length; ++i) {
            if (this.homeworks[i].getId() == id) {
                this.homeworks[i].setName(values.name);
                this.homeworks[i].setType(values.type);
                this.homeworks[i].setDescription(values.desc);
                this.homeworks[i].setDueDate(new Date(values.dueDate));
                this.homeworks[i].setDone(values.done);
                this.saveHomeworks();
                return;
            }
        }
    }
}


export let homeworkService = new HomeworkService();
