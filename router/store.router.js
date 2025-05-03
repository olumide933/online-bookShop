const express = require("express");
const { createBook, getBook, getOneBook, deleteBook, updateBook, getAllBooks } = require("../controller/store.controller");
const { upload } = require("../config/multer");
const router =express.Router();

router.route("/newbook/:id").post(upload,createBook);
router.route("/book/:id").get(getBook);
router.route("/onebook/:id").get(getOneBook);
router.route("/allbooks").get(getAllBooks)
router.route("/removebook/:id/:bookID").delete(deleteBook);
router.route("/updatebook/:id/").put(updateBook);


module.exports = router
