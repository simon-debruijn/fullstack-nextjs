import { getRequestHandler, Handler } from "@api/helpers/handlers";
import { Note } from "@api/notes/Note";
import * as notesRepo from "@api/notes/notes.repo";

const getNotes: Handler<Note[]> = async (req, res) => {
  const notes = notesRepo.getNotes();
  res.send({ data: notes, count: notes.length });
};

const addNote: Handler<Note> = async (req, res) => {
  const note = req.body as Note;

  const newNote = notesRepo.addNote(note);

  res.send({
    data: newNote,
  });
};

export default getRequestHandler({ GET: getNotes, POST: addNote });
