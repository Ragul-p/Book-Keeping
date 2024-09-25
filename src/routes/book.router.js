const router = require("express").Router();

const { createBook, getBookById, getAllBooks, updateBook, deleteBook, borrowBook, returnBook } = require("../controller/book.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const { validateRequest } = require("../middleware/validation.middleware");
const { createBookValidator, updateBookValidator } = require("../validator/book.validator");

router.get("/", authenticateToken, getAllBooks);
router.get("/:id", authenticateToken, getBookById);
router.post("/", authenticateToken, validateRequest(createBookValidator), createBook);
router.put("/:id", authenticateToken, validateRequest(updateBookValidator), updateBook);
router.delete("/:id", authenticateToken, deleteBook);



router.post("/borrow", authenticateToken, borrowBook);
router.put("/return/:id", authenticateToken, returnBook);






module.exports = router;