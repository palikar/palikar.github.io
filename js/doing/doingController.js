import {
    homeworkService
} from '../common/homeworkService.js'


var doingService_;
var audioContext = null;
var meter = null;
var mediaStreamSource = null;

function doingService() {

    doingService_ = new Vue({
        el: '#doingController',
        data: {
            homeworks: [],
            showAll: false,
            selectedHomework: null,
            currentHomework: "",
            time: "00:00:00",
            nextPause: "",
            running: false,
            start: {},
            interval: {},
            paused: false,
            extra: 0,
            elapsed: 0,
            pausesCheck: true,
            accArr: [],
            accVal: 0,
            lux: 0,
            percLux: 0,
            volume: 0
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





            },
            load() {
                this.homeworks = [];
                for (var i = 0; i < homeworkService.getAllHomeworks().length; i++) {
                    if (!homeworkService.getAllHomeworks()[i].isDone() || this.showAll) {
                        this.homeworks.push(homeworkService.getAllHomeworks()[i]);
                    }
                }

            },
            showAllClicked() {
                this.showAll = !this.showAll;
                this.load();
            },
            select(home) {
                this.currentHomework = home.getName();
            },
            setupSensors() {

            }
        },
        created: function () {
            this.load();


            var that = this;
            window.addEventListener('devicemotion', function (event) {
                $("#vibeSec").css("visibility", "visible");
                var x = event.acceleration.x;
                var y = event.acceleration.y;
                var z = event.acceleration.z;


                //$('#accTxt').html(event.acceleration.x);

                var sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
                that.accArr.push(sum);

                if (that.accArr.length < 15) {
                    return;
                }
                var allSum = 0;
                for (var i = 0; i < that.accArr.length; i++) {
                    allSum += that.accArr[i];
                }
                allSum /= that.accArr.length;
                allSum /= 3;


                that.accVal = (allSum * 80.0).toFixed(1);
                that.accVal = that.accVal > 100 ? 100 : that.accVal;
                $('#accObj').css('width', that.accVal + '%');

                that.accArr = [];

            }, false);


            window.addEventListener("devicelight", function (event) {
                var val = event.value;
                that.lux = val;
                that.percLux = val > 100 ? 100 : val;
                $('#luxObj').css('width', that.percLux + '%');
                $("#lightSec").css("visibility", "visible");
            });


            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            audioContext = new AudioContext();
            navigator.getUserMedia({
                    "audio": {
                        "mandatory": {
                            "googEchoCancellation": "false",
                            "googAutoGainControl": "false",
                            "googNoiseSuppression": "false",
                            "googHighpassFilter": "false"
                        },
                        "optional": []
                    },
                },
                function (stream) {
                    mediaStreamSource = audioContext.createMediaStreamSource(stream);
                    // createAudioMeter(audioContext,clipLevel,averaging,clipLag);
                    meter = createAudioMeter(audioContext, 0.5, 0.95);
                    mediaStreamSource.connect(meter);

                    $("#noiseSec").css("visibility", "visible");

                    window.setInterval(function () {

                        var percent = 100 * (meter.volume * 10);
                        percent = percent > 100 ? 100 : percent;
                        that.volume = percent.toFixed(0);
                        $('#noiseLevel').css('width', percent + '%');

                    }, 100);

                },
                function () {
                    //error hanlding
                });



            this.setupSensors();




        }
    });


}

export {
    doingService
};
