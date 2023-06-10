const mongoose = require("mongoose");
const express = require("express");

const noteSchema = mongoose.Schema({
    title: String,
    body: String,
    category: String,
    userID: String,
    user: String
}, {
    versionKey: false
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
    NoteModel
}