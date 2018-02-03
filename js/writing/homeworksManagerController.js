import {
    homeworkService
} from '../common/homeworkService.js'


var homeworkManagerController_;

function homeworkManagerController() {

    homeworkManagerController_ = new Vue({
        el: '#homeworkManagement',
        data: {
            homeworks: [],
            selectedHomework: null,
            message: "From homeworks!",
            newHomeworkName: "",
            newHomeworkDesc: "",
            newHomeworkType: "",
            newHomeworkDueDate: "",
            homeworkName: "",
            homeworkDesc: "",
            homeworkType: "",
            homeworkDueDate: "",
            selectedHome: false,
            homeworkChecked: false
        },

        methods: {
            homeworkSelected(id) {
                this.selectedHomework = homeworkService.getHomework(id);
                this.homeworkName = this.selectedHomework.getName();
                this.homeworkDesc = this.selectedHomework.getDescription();
                this.homeworkType = this.selectedHomework.getType();
                this.homeworkDueDate = this.selectedHomework.getDueDate().toDateString();
                this.homeworkChecked = this.selectedHomework.isDone();
            },
            newHomework() {

            },
            updateHomework(id) {
                var values = {};
                values.name = this.homeworkName;
                values.desc = this.homeworkDesc;
                values.type = this.homeworkType;
                values.dueDate = $("#datePickHomework").datepicker('getDate');
                if (values.name == "") {
                    this.homeworkName = this.selectedHomework.getName();
                    values.name = this.homeworkName;
                }
                this.selectedHomework.setName(values.name);
                this.selectedHomework.setDescription(values.desc);
                this.selectedHomework.setType(values.type);
                this.selectedHomework.setDueDate(values.dueDate);

            },
            save() {
                if (this.selectedHomework)
                    this.selectedHomework.setDueDate($("#datePickHomework").datepicker('getDate'));
                for (var i = 0; i < this.homeworks.length; i++) {
                    var homework = this.homeworks[i];

                    var values = {};
                    values.name = homework.getName();
                    values.desc = homework.getDescription();
                    values.type = homework.getType();
                    //values.dueDate = $("#datePickHomework").datepicker('getDate');
                    values.dueDate = homework.getDueDate();
                    values.done = homework.isDone();

                    homeworkService.update(homework.getId(), values);
                }

            },

            switchHome(home) {

                console.log("switching!");
                if (home) {
                    home.setDone(!home.isDone());
                    this.save();
                }

            },

            remove(id) {
                this.selectedHomewor = null;
                for (var i = 0; i < this.homeworks.length; i++) {
                    if (this.homeworks[i].getId() == id) {
                        this.homeworks.splice(i, 1);
                        homeworkService.saveHomeworks();
                        this.homeworkName = "";
                        this.homeworkDesc = "";
                        this.homeworkType = "";
                        this.homeworkDueDate = "";
                        this.selected = false;
                        this.homeworkChecked = false;
                    }
                }

            },
            createHomework() {

                if (this.newHomeworkName == "") {
                    return;
                }

                homeworkService.createHomework(
                    this.newHomeworkName,
                    this.newHomeworkDesc,
                    this.newHomeworkType,
                    new Date());
                this.newHomeworkName = "";
                this.newHomeworkDesc = "";
                this.newHomeworkType = "";
                this.newHomeworkDueDate = "";
                this.homeworks = homeworkService.getAllHomeworks();
            }

        },

        created: function () {
            this.homeworks = homeworkService.getAllHomeworks();
        }
    });


}

export {
    homeworkManagerController
};
