import {
    notificationService
} from './common/notificationManager.js'



var notificationManagerController_;
var notificationManagerController_2;

function notificationManagerController() {

    notificationManagerController_ = new Vue({
        el: 'div.notificationController',
        data: {
            notifications: [],
            $: $

        },

        methods: {
            showInfo(not) {
                $("#notificationMsg").html("The due date of the '" + not.homework + "' homework on " + $.datepicker.formatDate('dd-mm-yy', not.date));
            }

        },

        created: function () {
            notificationService.update();
            this.notifications = notificationService.getAllNotifications();

            window.setInterval(function () {
                notificationService.update();
                this.notifications = notificationService.getAllNotifications();
            }, 60 * 1000);
        }
    });
    notificationManagerController_2 = new Vue({
        el: '#notificationController',
        data: {
            notifications: [],
            $: $

        },

        methods: {
            showInfo(not) {
                $("#notificationMsg").html("The due date of the '" + not.homework + "' homework on " + $.datepicker.formatDate('dd-mm-yy', not.date));
            }
        },

        created: function () {
            notificationService.update();
            this.notifications = notificationService.getAllNotifications();

            window.setInterval(function () {
                notificationService.update();
                this.notifications = notificationService.getAllNotifications();
            }, 60 * 1000);
        }
    });


}

export {
    notificationManagerController
};
