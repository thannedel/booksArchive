const express = require("express");
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');

// Get book list

router.get('/', (req, res) =>
    Book.findAll()
    .then(books => {

        res.render('books', {
            books
        });
    }).catch((err) => console.log(err)));
123

//Add a book
router.get('/add', (req, res) => {
    const data = {
        title: 'HOW TO CHANGE THE WORLD',
        writer: 'HOBSBAWM J. ERIC',
        description: 'In the 144 years since Karl Marx s Das Kapital was published, the doctrine that bears his name has been embraced by millions in the name of equality, and just as dramatically has fallen from grace with the retreat of communism from the western world. But as the free market reaches its extreme limits in the economic and environmental fallout, a reassessment of capitalisms most vigorous and eloquent enemy has never been more timely.Eric Hobsbawm provides a fascinating and insightful overview of Marxism.He investigates its influences and analyses the spectacular reversal of Marxism s fortunes over the past thirty years. (From the publisher)'
    }

    let {

        title,
        writer,
        description
    } = data;

    // Insert into table
    Book.create({
            title,
            writer,
            description
        })
        .then(book => res.redirect('/books'))
        .catch(err => console.log(err));
});


module.exports = router;