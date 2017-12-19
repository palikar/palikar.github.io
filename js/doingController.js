import {
    homeworkService
} from './homeworkService.js'


var doingService_;

function doingService() {

    doingService_ = new Vue({
        el: '#doingController',
        data: {
            homeworks: [],
            selectedHomework: null,
            time: "00:00:00",
            nextPause: "",
            running: false,
            start: {},
            interval: {},
            paused: false,
            extra: 0,
            elapsed: 0,
            pausesCheck: true
        },

        methods: {
            stop: function () {
                this.running = false;
                this.time = "00:00:00";
                this.elapsed = 0;
                this.extra = 0;
                this.nextPause = "";
                clearInterval(this.interval);
            },
            play: function () {

                if (this.paused) {
                    this.start = new Date().getTime();
                    this.paused = false;
                }
                if (this.running) {
                    return;
                }
                this.start = new Date().getTime();
                this.running = true;
                this.interval = window.setInterval(this.update, 1000);
                this.nextPauseTime = 30 * 60 * 1000;
            },
            pause: function () {
                if (!this.paused) {
                    this.extra += this.elapsed;
                    this.paused = true;
                } else {
                    this.start = new Date().getTime();
                    this.paused = false;
                }
            },
            update: function () {
                if (!this.running || this.paused) {
                    return
                }

                var now = new Date().getTime();
                var distance = now - this.start;
                this.elapsed = distance;
                distance += this.extra;
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                this.time = hours + ":" + minutes + ":" + seconds;

                var pauseTime = this.nextPauseTime - distance;
                hours = Math.floor((pauseTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((pauseTime % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((pauseTime % (1000 * 60)) / 1000);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                if (this.pausesCheck) {
                    this.nextPause = hours + ":" + minutes + ":" + seconds;
                }





            }
        },
        created: function () {
            this.homeworks = homeworkService.getAllHomeworks();


            window.addEventListener("devicelight", function (event) {
                var luminosity = event.value;

                if (luminosity < 100) {
                    //dim
                } else if (100 < luminosity && luminosity < 1000) {
                    //normal
                } else {
                    //too much
                }
            });

            if (!!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia)) {
                // Good to go!
            } else {
                alert('getUserMedia() is not supported in your browser');
            }




        }
    });


}

export {
    doingService
};
