import {
    homeworkService
} from './homeworkService.js'



class NotificationService {
    constructor() {
        this.notifications = [];
        this.homeworks = [];
        this.today = new Date();

        this.update()
    }
    getAllNotifications() {
        return this.notifications;
    }

    update() {
        this.homeworks = homeworkService.getAllHomeworks();
        this.notifications.splice(0, this.notifications.length);

        var today = new Date();
        var nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
        today = Date.parse(today);

        for (var i = 0; i < this.homeworks.length; ++i) {
            var home = Date.parse(this.homeworks[i].getDueDate());
            if (this.homeworks[i].isDone())
                continue;
            if (today <= home && home <= nextWeek) {
                console.log("found");


                var imp = this.homeworks[i].getType() == "Long term";

                this.notifications.push({
                    date: this.homeworks[i].getDueDate(),
                    homework: this.homeworks[i].getName(),
                    text: "Homework is due this week!",
                    important: imp

                })
            }
        }
    }

    wasWeeksAgo(weeksAgo, date) {
        // Create a date
        var weekStart = new Date();
        // Set time to 00:00:00
        weekStart.setHours(0, 0, 0, 0);
        // Set to previous Sunday
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        // Set to Sunday on weeksAgo
        weekStart.setDate(weekStart.getDate() - 7 * weeksAgo)
        // Create date for following Saturday at 24:00:00
        var weekEnd = new Date(+weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        // See if date is in that week
        return date >= weekStart && date <= weekEnd;
    }


}


export let notificationService = new NotificationService();
