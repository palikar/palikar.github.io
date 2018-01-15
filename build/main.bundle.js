/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.homeworkService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _homework = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeworkService = function () {
    function HomeworkService() {
        _classCallCheck(this, HomeworkService);

        this.homeworks = [];
        var fromStorage = window.localStorage.getItem("homeworks_");
        if (!fromStorage) {
            window.localStorage.setItem("homeworks_", "");
        } else {
            var homeworks = JSON.parse(fromStorage);
            for (var i = 0; i < homeworks.length; ++i) {
                this.homeworks[i] = new _homework.Homework(homeworks[i].name, homeworks[i].id, homeworks[i].desc, new Date(homeworks[i].dueDate), new Date(homeworks[i].date), homeworks[i].type);
                this.homeworks[i].setDone(homeworks[i].done);
            }
        }
    }

    _createClass(HomeworkService, [{
        key: "saveHomeworks",
        value: function saveHomeworks() {
            var storageItem = JSON.stringify(this.homeworks);
            window.localStorage.setItem("homeworks_", storageItem);
        }
    }, {
        key: "createHomework",
        value: function createHomework(name, desc, type, dueDate) {
            var id = 0;
            var ids = this.homeworks.map(function (obj) {
                return obj.getId();
            });
            while (ids.indexOf(id) != -1) {
                id++;
            }this.homeworks.push(new _homework.Homework(name, id, desc, new Date(dueDate), new Date(), type));
            this.saveHomeworks();
        }
    }, {
        key: "remove",
        value: function remove(id) {
            for (var i = 0; i < this.homeworks.length; ++i) {
                if (this.homeworks[i].getId() == id) {
                    this.homeworks.splice(i, 1);
                    this.saveHomeworks();
                    return;
                }
            }
        }
    }, {
        key: "getAllHomeworks",
        value: function getAllHomeworks() {
            return this.homeworks;
        }
    }, {
        key: "getHomework",
        value: function getHomework(id) {
            for (var i = 0; i < this.homeworks.length; ++i) {
                if (this.homeworks[i].getId() == id) {
                    return this.homeworks[i];
                }
            }
        }
    }, {
        key: "update",
        value: function update(id, values) {
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
    }]);

    return HomeworkService;
}();

var homeworkService = exports.homeworkService = new HomeworkService();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.noteService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _note = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteService = function () {
    function NoteService() {
        _classCallCheck(this, NoteService);

        //load some shit from local storage
        this.notes = [];

        var fromStorage = window.localStorage.getItem("notes_");
        if (!fromStorage) {
            window.localStorage.setItem("notes_", "");
        } else {
            var notes = JSON.parse(fromStorage);
            for (var i = 0; i < notes.length; ++i) {
                this.notes[i] = new _note.Note(notes[i].name, notes[i].id, notes[i].homeworkId, notes[i].text);
            }
        }
    }

    _createClass(NoteService, [{
        key: "remove",
        value: function remove(id) {
            for (var i = 0; i < this.notes.length; ++i) {
                if (this.notes[i].getId() == id) {
                    this.notes.splice(i, 1);
                    this.saveNotes();
                    return;
                }
            }
        }
    }, {
        key: "createNote",
        value: function createNote(name, homework, text) {
            var id = 0;
            var ids = this.notes.map(function (obj) {
                return obj.getId();
            });
            while (ids.indexOf(id) != -1) {
                id++;
            }this.notes.push(new _note.Note(name, id, homework, text));
            this.saveNotes();
        }
    }, {
        key: "saveNotes",
        value: function saveNotes() {
            var storageItem = JSON.stringify(this.notes);
            window.localStorage.setItem("notes_", storageItem);
        }
    }, {
        key: "getAllNotes",
        value: function getAllNotes() {
            return this.notes;
        }
    }, {
        key: "getNote",
        value: function getNote(id) {
            for (var i = 0; i < this.notes.length; ++i) {
                if (this.notes[i].getId() == id) {
                    return this.notes[i];
                }
            }
            return null;
        }
    }, {
        key: "update",
        value: function update(id, values) {
            for (var i = 0; i < this.notes.length; ++i) {
                if (this.notes[i].getId() == id) {
                    this.notes[i].setName(values.name);
                    this.notes[i].setText(values.text);
                    this.notes[i].setHomeWorkId(values.homework);
                    this.saveNotes();
                    return;
                }
            }
        }
    }]);

    return NoteService;
}();

var noteService = exports.noteService = new NoteService();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _notesManagement = __webpack_require__(1);

var _homeworkService = __webpack_require__(0);

var _notesManagerController = __webpack_require__(5);

var _homeworksManagerController = __webpack_require__(6);

var _doingController = __webpack_require__(7);

var _notificationController = __webpack_require__(8);

w3.includeHTML(function () {

    $("#newNoteButton").click(function (e) {

        var name = $("#noteNameField").val();
        var homework = $("#noteHomeworkSelection option:selected").val();
        var text = $("#noteTextField").val();

        if ($("#titleNoteModal").attr("idnote") != "-1") {
            var id = $("#titleNoteModal").attr("idnote");
            _notesManagement.noteService.update(id, {
                name: name,
                text: text,
                homework: homework
            });
        } else {
            _notesManagement.noteService.createNote(name, homework, text);
        }

        $("#noteCloseBtn").click();
    });

    $("#newHomeQuick").click(function (e) {

        var name = $("#nameQuick").val();
        var date = $("#dateQuick").datepicker('getDate');

        _homeworkService.homeworkService.createHomework(name, "", "Urgent", date);

        $("#closeQuick").click();

        $("#nameQuick").val("");
        $("#dateQuick").val("");
    });

    $("#newNoteQuick").click(function (e) {

        var name = $("#noteNameQuick").val();
        var text = $("#noteTextQuick").val();

        _notesManagement.noteService.createNote(name, -1, text);

        $("#closeNoteQuick").click();

        $("#noteNameQuick").val("");
        $("#noteTextQuick").val("");
    });

    //    for (var e in $(".datepicker")) {
    //        e.datepicker()
    //    }

    $(document).foundation();

    (0, _notesManagerController.notesManagerController)();
    (0, _homeworksManagerController.homeworkManagerController)();
    (0, _doingController.doingService)();
    (0, _notificationController.notificationManagerController)();

    $(".datepicker").datepicker({
        dateFormat: "D M dd yy"
    });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = exports.Note = function () {
    function Note(name, id, homework, text) {
        _classCallCheck(this, Note);

        this.name = name;
        this.id = id;
        this.homeworkId = homework;
        this.text = text;
    }

    _createClass(Note, [{
        key: "getId",
        value: function getId() {
            return this.id;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "setName",
        value: function setName(name) {
            this.name = name;
        }
    }, {
        key: "getHomeWorkId",
        value: function getHomeWorkId() {
            return this.homeworkId;
        }
    }, {
        key: "setHomeWorkId",
        value: function setHomeWorkId(id) {
            this.homeworkId = id;
        }
    }, {
        key: "getText",
        value: function getText() {
            return this.text;
        }
    }, {
        key: "setText",
        value: function setText(text) {
            this.text = text;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                name: this.name,
                id: this.id,
                homeworkId: this.homeworkId,
                text: this.text
            };
        }
    }]);

    return Note;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Homework = exports.Homework = function () {
    function Homework(name, id, desc, dueDate, date, type) {
        _classCallCheck(this, Homework);

        this.name = name;
        this.id = id;
        this.desc = desc;
        this.dueDate = dueDate;
        this.date = date;
        this.type = type;
        this.done = false;
    }

    _createClass(Homework, [{
        key: "getId",
        value: function getId() {
            return this.id;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "setName",
        value: function setName(name) {
            this.name = name;
        }
    }, {
        key: "getDescription",
        value: function getDescription() {
            return this.desc;
        }
    }, {
        key: "setDescription",
        value: function setDescription(description) {
            this.desc = description;
        }
    }, {
        key: "getDueDate",
        value: function getDueDate() {
            return this.dueDate;
        }
    }, {
        key: "getCreateDate",
        value: function getCreateDate() {
            return this.date;
        }
    }, {
        key: "setDueDate",
        value: function setDueDate(date) {
            this.dueDate = date;
        }
    }, {
        key: "setCreateDate",
        value: function setCreateDate(date) {
            this.date = date;
        }
    }, {
        key: "getType",
        value: function getType() {
            return this.type;
        }
    }, {
        key: "setType",
        value: function setType(type) {
            this.type = type;
        }
    }, {
        key: "isDone",
        value: function isDone() {
            return this.done;
        }
    }, {
        key: "setDone",
        value: function setDone(done) {
            this.done = done;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                name: this.name,
                desc: this.desc,
                dueDate: this.dueDate.toDateString(),
                date: this.date.toDateString(),
                type: this.type,
                id: this.id,
                done: this.done
            };
        }
    }]);

    return Homework;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notesManagerController = undefined;

var _homeworkService = __webpack_require__(0);

var _notesManagement = __webpack_require__(1);

var notesManagerController_;

function notesManagerController() {
    notesManagerController_ = new Vue({
        el: '#notesManagement',
        data: {
            message: 'Hello from the notes!',
            allNotes: [],
            homeworks: {},

            refreshHomeworklist: function refreshHomeworklist() {

                var homeworks = _homeworkService.homeworkService.getAllHomeworks();
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
            newNote: function newNote() {
                $("#titleNoteModal").html("New note");
                $("#titleNoteModal").attr("idnote", '-1');

                $("#noteNameField").val("");
                $("#noteTextField").val("");

                this.refreshHomeworklist();
            },
            removeNote: function removeNote(id) {
                _notesManagement.noteService.remove(id);
            },
            editNote: function editNote(note) {
                $("#titleNoteModal").html("Edit note");
                $("#titleNoteModal").attr("idnote", note.getId());

                this.refreshHomeworklist();

                $("#noteNameField").val(note.getName());
                $("#noteHomeworkSelection").val(note.getHomeWorkId());
                $("#noteTextField").val(note.getText());
            }
        },
        created: function created() {
            this.allNotes = _notesManagement.noteService.getAllNotes();
            var homeworks = _homeworkService.homeworkService.getAllHomeworks();
            for (var i = 0; i < homeworks.length; i++) {
                this.homeworks[homeworks[i].getId()] = homeworks[i];
            }
            this.homeworks[-1] = {
                getName: function getName() {
                    return "General";
                }
            };
        }
    });
}

exports.notesManagerController = notesManagerController;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.homeworkManagerController = undefined;

var _homeworkService = __webpack_require__(0);

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
            homeworkSelected: function homeworkSelected(id) {
                this.selectedHomework = _homeworkService.homeworkService.getHomework(id);
                this.homeworkName = this.selectedHomework.getName();
                this.homeworkDesc = this.selectedHomework.getDescription();
                this.homeworkType = this.selectedHomework.getType();
                this.homeworkDueDate = this.selectedHomework.getDueDate().toDateString();
                this.homeworkChecked = this.selectedHomework.isDone();
            },
            newHomework: function newHomework() {},
            updateHomework: function updateHomework(id) {
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
            save: function save() {
                if (this.selectedHomework) this.selectedHomework.setDueDate($("#datePickHomework").datepicker('getDate'));
                for (var i = 0; i < this.homeworks.length; i++) {
                    var homework = this.homeworks[i];

                    var values = {};
                    values.name = homework.getName();
                    values.desc = homework.getDescription();
                    values.type = homework.getType();
                    //values.dueDate = $("#datePickHomework").datepicker('getDate');
                    values.dueDate = homework.getDueDate();
                    values.done = homework.isDone();

                    _homeworkService.homeworkService.update(homework.getId(), values);
                }
            },
            switchHome: function switchHome(home) {

                console.log("switching!");
                if (home) {
                    home.setDone(!home.isDone());
                    this.save();
                }
            },
            remove: function remove(id) {
                this.selectedHomewor = null;
                for (var i = 0; i < this.homeworks.length; i++) {
                    if (this.homeworks[i].getId() == id) {
                        this.homeworks.splice(i, 1);
                        _homeworkService.homeworkService.saveHomeworks();
                        this.homeworkName = "";
                        this.homeworkDesc = "";
                        this.homeworkType = "";
                        this.homeworkDueDate = "";
                        this.selected = false;
                        this.homeworkChecked = false;
                    }
                }
            },
            createHomework: function createHomework() {

                if (this.newHomeworkName == "") {
                    return;
                }

                _homeworkService.homeworkService.createHomework(this.newHomeworkName, this.newHomeworkDesc, this.newHomeworkType, new Date());
                this.newHomeworkName = "";
                this.newHomeworkDesc = "";
                this.newHomeworkType = "";
                this.newHomeworkDueDate = "";
                this.homeworks = _homeworkService.homeworkService.getAllHomeworks();
            }
        },

        created: function created() {
            this.homeworks = _homeworkService.homeworkService.getAllHomeworks();
        }
    });
}

exports.homeworkManagerController = homeworkManagerController;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doingService = undefined;

var _homeworkService = __webpack_require__(0);

var doingService_;

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
            accVal: 0
        },

        methods: {
            stop: function stop() {
                this.running = false;
                this.time = "00:00:00";
                this.elapsed = 0;
                this.extra = 0;
                this.nextPause = "";
                clearInterval(this.interval);
            },
            play: function play() {

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
            pause: function pause() {
                if (!this.paused) {
                    this.extra += this.elapsed;
                    this.paused = true;
                } else {
                    this.start = new Date().getTime();
                    this.paused = false;
                }
            },
            update: function update() {
                if (!this.running || this.paused) {
                    return;
                }

                var now = new Date().getTime();
                var distance = now - this.start;
                this.elapsed = distance;
                distance += this.extra;
                var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
                var seconds = Math.floor(distance % (1000 * 60) / 1000);
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
                hours = Math.floor(pauseTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                minutes = Math.floor(pauseTime % (1000 * 60 * 60) / (1000 * 60));
                seconds = Math.floor(pauseTime % (1000 * 60) / 1000);
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
            load: function load() {
                this.homeworks = [];
                for (var i = 0; i < _homeworkService.homeworkService.getAllHomeworks().length; i++) {
                    if (!_homeworkService.homeworkService.getAllHomeworks()[i].isDone() || this.showAll) {
                        this.homeworks.push(_homeworkService.homeworkService.getAllHomeworks()[i]);
                    }
                }
            },
            showAllClicked: function showAllClicked() {
                this.showAll = !this.showAll;
                this.load();
            },
            select: function select(home) {
                console.log("sadasd");
                this.currentHomework = home.getName();
            },
            setupSensors: function setupSensors() {

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

                console.log("Acc:");
                window.ondevicemotion = function (event) {
                    var x = event.accelerationIncludingGravity.x;
                    var y = event.acceleration.y;
                    var z = event.acceleration.z;
                    console.log(x);

                    this.accVal = x;

                    var sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
                    this.accArr.pusj(sum);

                    if (this.accArr.length < 10) {
                        return;
                    }
                    var allSum = 0;
                    for (var i = 0; i < this.accArr.length; i++) {
                        allSum += this.accArr[i];
                    }
                    allSum /= this.accArr.length;
                    var avg = Math.ceil(avg * 10000) / 10000;

                    this.accArr = [];

                    //this.accVal = avg;

                };

                if (!!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)) {
                    // Good to go!
                } else {
                    alert('getUserMedia() is not supported in your browser');
                }
            }
        },
        created: function created() {
            this.load();

            this.setupSensors();
        }
    });
}

exports.doingService = doingService;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notificationManagerController = undefined;

var _notificationManager = __webpack_require__(9);

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
            showInfo: function showInfo(not) {
                $("#notificationMsg").html("The due date of the '" + not.homework + "' homework on " + $.datepicker.formatDate('dd-mm-yy', not.date));
            }
        },

        created: function created() {
            _notificationManager.notificationService.update();
            this.notifications = _notificationManager.notificationService.getAllNotifications();

            window.setInterval(function () {
                _notificationManager.notificationService.update();
                this.notifications = _notificationManager.notificationService.getAllNotifications();
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
            showInfo: function showInfo(not) {
                $("#notificationMsg").html("The due date of the '" + not.homework + "' homework on " + $.datepicker.formatDate('dd-mm-yy', not.date));
            }
        },

        created: function created() {
            _notificationManager.notificationService.update();
            this.notifications = _notificationManager.notificationService.getAllNotifications();

            window.setInterval(function () {
                _notificationManager.notificationService.update();
                this.notifications = _notificationManager.notificationService.getAllNotifications();
            }, 60 * 1000);
        }
    });
}

exports.notificationManagerController = notificationManagerController;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notificationService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _homeworkService = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationService = function () {
    function NotificationService() {
        _classCallCheck(this, NotificationService);

        this.notifications = [];
        this.homeworks = [];
        this.today = new Date();

        this.update();
    }

    _createClass(NotificationService, [{
        key: "getAllNotifications",
        value: function getAllNotifications() {
            return this.notifications;
        }
    }, {
        key: "update",
        value: function update() {
            this.homeworks = _homeworkService.homeworkService.getAllHomeworks();
            this.notifications.splice(0, this.notifications.length);

            var today = new Date();
            var nextWeek = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
            today = Date.parse(today);

            for (var i = 0; i < this.homeworks.length; ++i) {
                var home = Date.parse(this.homeworks[i].getDueDate());
                if (this.homeworks[i].isDone()) continue;
                if (today <= home && home <= nextWeek) {
                    console.log("found");

                    var imp = this.homeworks[i].getType() == "Long term";

                    this.notifications.push({
                        date: this.homeworks[i].getDueDate(),
                        homework: this.homeworks[i].getName(),
                        text: "Homework is due this week!",
                        important: imp

                    });
                }
            }
        }
    }, {
        key: "wasWeeksAgo",
        value: function wasWeeksAgo(weeksAgo, date) {
            // Create a date
            var weekStart = new Date();
            // Set time to 00:00:00
            weekStart.setHours(0, 0, 0, 0);
            // Set to previous Sunday
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            // Set to Sunday on weeksAgo
            weekStart.setDate(weekStart.getDate() - 7 * weeksAgo);
            // Create date for following Saturday at 24:00:00
            var weekEnd = new Date(+weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);
            // See if date is in that week
            return date >= weekStart && date <= weekEnd;
        }
    }]);

    return NotificationService;
}();

var notificationService = exports.notificationService = new NotificationService();

/***/ })
/******/ ]);