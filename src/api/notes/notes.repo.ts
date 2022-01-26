import { Note } from "./Note";

let notes: Note[] = [];

export const addNote = (note: Note): Note => {
  const newNote = { ...note, id: notes.length };
  notes = [...notes, newNote];
  return newNote;
};

export const getNotes = (): Note[] => {
  return notes;
};
