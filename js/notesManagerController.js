import {
    homeworkService
} from './homeworkService.js'
import {
    noteService
} from './notesManagement.js'



var notesManagerController_;

function notesManagerController() {
    notesManagerController_ = new Vue({
        el: '#notesManagement',
        data: {
            message: 'Hello from the notes!',
            allNotes: [],
            homeworks: {},

            refreshHomeworklist: function () {

                var homeworks = homeworkService.getAllHomeworks();
                for (var i = 0; i < homeworks.length; i++) {
                    this.homeworks[homeworks[i].getId()] = homeworks[i];
                }

                $('#noteHomeworkSelection').html("");
                $('#noteHomeworkSelection').append($('<option>', {
                    value: -1,
                    text: "General"
                }));
                for (var home in this.homeworks) {
                    if (home == -1) continue;
                    $('#noteHomeworkSelection').append($('<option>', {
                        value: this.homeworks[home].getId(),
                        text: this.homeworks[home].getName()
                    }));
                }

            }
        },
        methods: {
            newNote: function () {
                $("#titleNoteModal").html("New note");
                $("#titleNoteModal").attr("idnote", '-1');

                this.refreshHomeworklist();

            },
            removeNote: function (id) {
                noteService.remove(id);
            },
            editNote: function (note) {
                $("#titleNoteModal").html("Edit note");
                $("#titleNoteModal").attr("idnote", note.getId());



                this.refreshHomeworklist();

                $("#noteNameField").val(note.getName());
                $("#noteHomeworkSelection").val(note.getHomeWorkId());
                $("#noteTextField").val(note.getText());
            },
        },
        created: function () {
            this.allNotes = noteService.getAllNotes();
            var homeworks = homeworkService.getAllHomeworks();
            for (var i = 0; i < homeworks.length; i++) {
                this.homeworks[homeworks[i].getId()] = homeworks[i];
            }
            this.homeworks[-1] = {
                getName: function () {
                    return "General";
                }
            };
        }
    });

}

export {
    notesManagerController
};
