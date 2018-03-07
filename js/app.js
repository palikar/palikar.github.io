import {
    noteService
} from './common/notesService.js'
import {
    homeworkService
} from './common/homeworkService.js'

import {
    notesManagerController
} from './writing/notesManagerController.js'


import {
    homeworkManagerController
} from './writing/homeworksManagerController.js'


import {
    doingService
} from './doing/doingController.js'


import {
    notificationManagerController
} from './notificationController.js'



w3.includeHTML(function () {

    Vue.config.ignoredElements = ['info'];
    notesManagerController();
    homeworkManagerController();
    doingService();
    notificationManagerController();

    $("#newNoteButton").click(function (e) {

        var name = $("#noteNameField").val();
        var homework = $("#noteHomeworkSelection option:selected").val();
        var text = $("#noteTextField").val();

        if (!name.trim()) {
            $("#noteCloseBtn").click();
            return;
        }

        if ($("#titleNoteModal").attr("idnote") != "-1") {
            var id = $("#titleNoteModal").attr("idnote");
            noteService.update(id, {
                name: name,
                text: text,
                homework: homework
            });
        } else {
            noteService.createNote(name, homework, text);
        }

        $("#noteCloseBtn").click();
    });

    $("#newHomeQuick").click(function (e) {

        var name = $("#nameQuick").val();
        var date = $("#dateQuick").datepicker('getDate');

        if (!name.trim()) {
            $("#closeQuick").click();
            return;
        }

        homeworkService.createHomework(name, "", "Urgent", date);

        $("#closeQuick").click();

        $("#nameQuick").val("");
        $("#dateQuick").val("");
    });

    $("#newNoteQuick").click(function (e) {

        var name = $("#noteNameQuick").val();
        var text = $("#noteTextQuick").val();

        noteService.createNote(name, -1, text);

        $("#closeNoteQuick").click();

        $("#noteNameQuick").val("");
        $("#noteTextQuick").val("");
    });


    $(".datepicker").datepicker({
        dateFormat: "D M dd yy"
    });

    $(document).foundation();

});
