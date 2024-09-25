const router = require("express").Router();

const { createLibrarie, getLibrarieById, getAllLibraries, updateLibrarie, deleteLibrary, getallAvailableBooks, addBookToLibrary, deleteLibraryBook } = require("../controller/libraries.controller");
const { authenticateToken, autherization } = require("../middleware/auth.middleware");

const { validateRequest } = require("../middleware/validation.middleware");
const { createLibrarieValidator, updateLibrarieValidator } = require("../validator/libraries.validator");


router.get("/", authenticateToken, getAllLibraries);
router.get("/:id", authenticateToken, getLibrarieById);
router.post("/", authenticateToken, validateRequest(createLibrarieValidator), createLibrarie);
router.put("/:id", authenticateToken, validateRequest(updateLibrarieValidator), updateLibrarie);
router.delete("/:id", authenticateToken, deleteLibrary);




router.get("/inventory/:id", authenticateToken, getallAvailableBooks);
router.post("/inventory/:id", authenticateToken, autherization, addBookToLibrary);
router.delete("/inventory/:id/book/:bookId", authenticateToken, autherization, deleteLibraryBook);



module.exports = router;