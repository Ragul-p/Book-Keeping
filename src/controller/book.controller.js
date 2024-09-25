const User = require("../model/users.model");
const Book = require("../model/books.model");
const Books = require("../model/books.model");
const Libraries = require("../model/libraries.model");


async function getAllBooks(req, res) {
    try {

        const findBook = await Books.findAll({ attributes: ['id', 'bookName', 'imageUrl'] });
        return res.status(200).json({ message: "success", data: findBook });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function getBookById(req, res) {
    try {
        const { id } = req.params;

        const findBook = await Books.findByPk(id);
        if (!findBook) { return res.status(400).json({ message: "error", description: "no book available  with this id" }) };
        const book = findBook.toJSON();

        const createdBy = await User.findByPk(book.createdBy, { attributes: ['id', 'name', 'email', 'userType', 'userRole'] });
        const borrowedBy = await User.findByPk(book.borrowedBy, { attributes: ['id', 'name', 'email', 'userType', 'userRole'] });
        const bookData = { id: book.id, bookName: book.bookName, imageUrl: book.imageUrl }

        const librarayDetails = await Libraries.findByPk(book.libraryId, { attributes: ['id', 'name'] });


        const constructData = { bookData, createdBy, borrowedBy, librarayDetails };
        return res.status(200).json({ message: "success", data: constructData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function createBook(req, res) {
    try {
        const { bookName, imageUrl, createdBy } = req.body;

        const findBook = await Books.findOne({ where: { bookName } });
        if (findBook) { return res.status(400).json({ message: "error", description: "already available book with this bookName" }) };

        const newBooks = await Books.create({ bookName, imageUrl, createdBy });
        if (newBooks) { return res.status(200).json({ message: "success", description: "successfully book Created" }) };

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}



async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const { bookName, imageUrl } = req.body;

        const findBook = await Books.findByPk(id);
        if (!findBook) { return res.status(400).json({ message: "error", description: "no book available  with this id" }) };

        const findBookName = await Books.findOne({ where: { bookName } });
        if (findBookName) { return res.status(400).json({ message: "error", description: "already available book with this bookName" }) };

        const updateBook = await Book.update({ bookName, imageUrl }, { where: { id } });
        return res.status(200).json({ message: "success", data: updateBook });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}



async function deleteBook(req, res) {
    try {
        const { id } = req.params;

        const findBook = await Books.findByPk(id);
        if (!findBook) { return res.status(400).json({ message: "error", description: "no book available  with this id" }) };

        const deleteBook = await Book.destroy({ where: { id } });
        return res.status(200).json({ message: "success", data: deleteBook });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}







async function borrowBook(req, res) {
    try {
        const { bookId } = req.body;

        const findBook = await Books.findOne({ where: { id: bookId } });
        if (!findBook) { return res.status(400).json({ message: "error", description: "no data found with this bookId" }) };

        const isBoorowed = await Books.findOne({ where: { id: bookId, borrowedBy: null } });
        if (!isBoorowed) { return res.status(400).json({ message: "error", description: "already this book borrowed" }) };

        const borrow = await Books.update({ borrowedBy: req.userId }, { where: { id: bookId } });
        return res.status(200).json({ message: "success", description: "successfully book borrowed" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function returnBook(req, res) {
    try {
        const { id } = req.params;

        const findBook = await Books.findOne({ where: { id } });
        if (!findBook) { return res.status(400).json({ message: "error", description: "no data found with this id" }) };


        const borrow = await Books.update({ borrowedBy: null }, { where: { id } });
        return res.status(200).json({ message: "success", description: "successfully return book " });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


module.exports = { createBook, getBookById, getAllBooks, updateBook, deleteBook, borrowBook, returnBook };