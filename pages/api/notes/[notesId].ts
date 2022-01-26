import { getRequestHandler, Handler } from "@api/helpers/handlers";
import { Note } from "@api/notes/Note";
import * as notesRepo from "@api/notes/notes.repo";
import { NotFound, BadRequest } from "http-errors";

const getNoteById: Handler<Note> = async (req, res) => {
  const { notesId } = req.query;

  if (typeof notesId !== "string") {
    throw new BadRequest();
  }

  const notes = notesRepo.getNotes();

  const note = notes.find((note) => note.id === parseInt(notesId));

  if (!note) {
    throw new NotFound(`Note with id ${notesId} not found`);
  }

  res.send({
    data: note,
  });
};

export default getRequestHandler({ GET: getNoteById });
