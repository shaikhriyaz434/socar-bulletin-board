const Note = require('../../database/models/note');

class notesController {

    constructor() {
        // Note.sync().then(() => {
        //     console.log("sync done");
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    async getAllNotes() {
        try {
            let notes = await Note.findAll();
            return notes;
        } catch (err) {
            throw err;
        }

    }

    async createNote(data) {
        let { title, comment, imageUrl, description } = data;
        try {
            let note = await Note.create({ title, comment, description, imageUrl });
            return note;
        } catch (err) {
            throw err;
        }
    }

    async updateNote(newObj){
        try{
            let result = await Note.update(newObj,{where:{id:newObj.id}});
            return result;
        }catch (err){
           throw err;
        }
    }

}

module.exports = new notesController();