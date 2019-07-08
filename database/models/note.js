const db = require('../index');
const Sequelize = require('sequelize');
const Note = db.define('note', {
    title: {
        type: Sequelize.STRING,
        defaultValue: "title"
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    comment: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
    }
})

module.exports = Note;