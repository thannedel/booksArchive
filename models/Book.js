const Sequelize = require('sequelize');
const db = require('../config/database');

const Book = db.define('book', {
    title: {
        type: Sequelize.STRING
    },
    writer: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
})

module.exports = Book;