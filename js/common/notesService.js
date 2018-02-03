import {
    Note
} from '../common/note.js'

class NoteService {




    constructor() {
        //load some shit from local storage
        this.notes = [];

        var fromStorage = window.localStorage.getItem("notes_");
        if (!fromStorage) {
            window.localStorage.setItem("notes_", "");
        } else {
            var notes = JSON.parse(fromStorage);
            for (var i = 0; i < notes.length; ++i) {
                this.notes[i] = new Note(
                    notes[i].name,
                    notes[i].id,
                    notes[i].homeworkId,
                    notes[i].text,
                );
            }
        }
    }

    remove(id) {
        for (var i = 0; i < this.notes.length; ++i) {
            if (this.notes[i].getId() == id) {
                this.notes.splice(i, 1);
                this.saveNotes();
                return;
            }
        }

    }

    createNote(name, homework, text) {
        var id = 0;
        var ids = this.notes.map(obj => obj.getId());
        while (ids.indexOf(id) != -1) id++;
        this.notes.push(new Note(name, id, homework, text));
        this.saveNotes();
    }

    saveNotes() {
        var storageItem = JSON.stringify(this.notes);
        window.localStorage.setItem("notes_", storageItem);
    }

    getAllNotes() {
        return this.notes;
    }
    getNote(id) {
        for (var i = 0; i < this.notes.length; ++i) {
            if (this.notes[i].getId() == id) {
                return this.notes[i];
            }
        }
        return null;
    }
    update(id, values) {
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
}


export let noteService = new NoteService();
