const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Book = require("../models/Book");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get book list

router.get("/", (req, res) =>
  Book.findAll()
  .then((books) =>
    res.render("books", {
      books,
    })
  )
  .catch((err) => console.log(err))
);
//Display add book
router.get("/add", (req, res) => res.render("add"));

//Add a book
router.post("/add", (req, res) => {
  let {
    title,
    writer,
    description,
    categories
  } = req.body;
  let errors = [];

  //Validate Fields
  if (!title) {
    errors.push({
      text: "Please add a title",
    });
  }
  if (!writer) {
    errors.push({
      text: "Please add the writer",
    });
  }

  //Check of error
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      writer,
      description,
      categories,
    });
  } else {
    if (!description) {
      description = "Unknown";
    } else {
      description = `${description}`;
    }

    // Make lowercase and remove space after comma
    categories = categories.toUpperCase().replace(/, /g, ",");

    // Insert into table
    Book.create({
        title,
        writer,
        description,
        categories,
      })
      .then((book) => res.redirect("/books"))
      .catch((err) => console.log(err));
  }
});

//Search for books
router.get("/search", (req, res) => {
  let {
    term
  } = req.query;

  // Make uppercase
  term = term.toUpperCase();


  Book.findAll({
      where: {
        [Op.or]: [{
            categories: {
              [Op.like]: "%" + term + "%",
            },
          },
          {
            title: {
              [Op.like]: "%" + term + "%",
            }
          },
          {
            writer: {
              [Op.like]: "%" + term + "%",
            }
          },
        ]
      },

    })
    .then((books) =>
      res.render("books", {
        books,
      })
    )
    .catch((err) => console.log(err));
});
//Display Login Page
router.get('/login', (req, res) => res.render('login'))

//Display Register Page
router.get('/register', (req, res) => res.render('register'))

module.exports = router;