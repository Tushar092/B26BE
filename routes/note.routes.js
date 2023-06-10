const express = require("express");
const { NoteModel } = require("../models/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();
noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
    try {
        // console.log(req.body);
        const note = new NoteModel(req.body);
        await note.save();
        res.json({msg: "New note has been added", note: req.body});
    } catch (error) {
        res.json({msg: error.message});
    }
});

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find({user: req.body.user});
        // console.log(notes);
        res.json(notes);
    } catch (error) {
        res.json({err: error.message});
    }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
    const userIDinUserDoc = req.body.userID;
    let {noteID} = req.params;
    try {
        const note = await NoteModel.findOne({_id: noteID});
        console.log(note);
        const userIDinNoteDoc = note.userID;
        console.log("UserID user Doc", userIDinUserDoc, "UserID note Doc", userIDinNoteDoc);
        if(userIDinNoteDoc === userIDinUserDoc){
            await NoteModel.findByIdAndUpdate({_id: noteID}, req.body);
            res.json({msg: "Note Updated"});
        }else{
            res.json({msg: "Not Authorized"});
        }
    } catch (error) {
        res.json({err: error.message});
    }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
    const userIDinUserDoc = req.body.userID;
    let {noteID} = req.params;
    try {
        const note = await NoteModel.findOne({_id: noteID});
        console.log(note);
        const userIDinNoteDoc = note.userID;
        if(userIDinNoteDoc === userIDinUserDoc){
            await NoteModel.findByIdAndDelete({_id: noteID});
            res.json({msg: "Note Deleted"});
        }else{
            res.json({msg: "Note Authorized"});
        }
    } catch (error) {
        res.json({err: error.message});
    }
});

module.exports = {
    noteRouter
}