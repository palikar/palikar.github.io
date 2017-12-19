import {
    notificationService
} from './notificationManager.js'



var notificationManagerController_;
var notificationManagerController_2;

function notificationManagerController() {

    notificationManagerController_ = new Vue({
        el: 'div.notificationController',
        data: {
            notifications: []

        },

        methods: {

        },

        created: function () {
            notificationService.update();
            this.notifications = notificationService.getAllNotifications();

            //            window.setInterval(function () {
            //                notificationService.update();
            //                this.notifications = notificationService.getAllNotifications();
            //            }, 60 * 1000);
        }
    });
    notificationManagerController_ = new Vue({
        el: '#notificationController',
        data: {
            notifications: []

        },

        methods: {

        },

        created: function () {
            notificationService.update();
            this.notifications = notificationService.getAllNotifications();

            //            window.setInterval(function () {
            //                notificationService.update();
            //                this.notifications = notificationService.getAllNotifications();
            //            }, 60 * 1000);
        }
    });


}

export {
    notificationManagerController
};
