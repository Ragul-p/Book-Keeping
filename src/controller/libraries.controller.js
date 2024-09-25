const User = require("../model/users.model");
const Book = require("../model/books.model");
const Libraries = require("../model/libraries.model");
const Books = require("../model/books.model");


async function getAllLibraries(req, res) {
    try {

        const findAllLibraries = await Books.findAll({});
        return res.status(200).json({ message: "success", data: findAllLibraries });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function getLibrarieById(req, res) {
    try {
        const { id } = req.params;

        const findLibrary = await Libraries.findByPk(id, { include: [{ model: Books, include: [{ model: User, as: 'borrowerDetails' }] }] });
        if (!findLibrary) { return res.status(400).json({ message: "error", description: "no Library available  with this id" }) };
        const library = findLibrary.toJSON();

        return res.status(200).json({ message: "success", data: library });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function createLibrarie(req, res) {
    try {
        const { name } = req.body;

        const findLibrarie = await Libraries.findOne({ where: { name } });
        if (findLibrarie) { return res.status(400).json({ message: "error", description: "already available Library with this name" }) };

        const newLibrarie = await Libraries.create({ name });
        if (newLibrarie) { return res.status(200).json({ message: "success", description: "successfully  Library created" }) };

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}



async function updateLibrarie(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const findLibrary = await Libraries.findByPk(id);
        if (!findLibrary) { return res.status(400).json({ message: "error", description: "no Library available  with this id" }) };

        const findLibrarieName = await Libraries.findOne({ where: { name } });
        if (findLibrarieName) { return res.status(400).json({ message: "error", description: "already available Library with this name" }) };

        const updateLibrary = await Libraries.update({ name }, { where: { id } });
        return res.status(200).json({ message: "success", data: updateLibrary });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}



async function deleteLibrary(req, res) {
    try {
        const { id } = req.params;
        const { bookId } = req.body;

        const findLibrary = await Libraries.findByPk(id);
        if (!findLibrary) { return res.status(400).json({ message: "error", description: "no Library available  with this id" }) };

        const deleteLibraray = await Libraries.destroy({ where: { id } });
        return res.status(200).json({ message: "success", data: deleteLibraray });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}







async function getallAvailableBooks(req, res) {
    try {
        const { id } = req.params;

        const availableBooks = await Books.findAll({ where: { libraryId: id, borrowedBy: null } });
        if (availableBooks.length <= 0) { return res.status(400).json({ message: "error", description: "no book available  with this id" }) };

        return res.status(200).json({ message: "success", data: availableBooks });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}



async function addBookToLibrary(req, res) {
    try {
        const { id } = req.params;
        const { bookId } = req.body;

        const findLibrarie = await Libraries.findOne({ where: { id } });
        if (!findLibrarie) { return res.status(400).json({ message: "error", description: "no data found with this library id" }) };

        const bookUpdate = await Books.update({ libraryId: id }, { where: { id: bookId } });
        if (bookUpdate) { return res.status(200).json({ message: "success", description: "successfully add book to Librarie" }) };

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function deleteLibraryBook(req, res) {
    try {
        const { id, bookId } = req.params;

        const findLibrary = await Libraries.findByPk(id);
        if (!findLibrary) { return res.status(400).json({ message: "error", description: "no data found with this library id" }) };

        const deleteLibraray = await Books.update({ libraryId: null }, { where: { id: bookId } });
        return res.status(200).json({ message: "success", data: deleteLibraray });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


module.exports = {
    createLibrarie, getLibrarieById, getAllLibraries, updateLibrarie, deleteLibrary,
    getallAvailableBooks, addBookToLibrary, deleteLibraryBook
};