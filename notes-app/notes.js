const chalk = require("chalk");
const fs = require("fs");

const FILE = "notes.json";

const error = (msg) => chalk.red.inverse(msg);
const neutral = (msg) => chalk.cyan.inverse(msg);
const success = (msg) => chalk.green.inverse(msg);

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(FILE);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(FILE, dataJSON);
};

const findNote = (title) => loadNotes().find((note) => note.title === title);

const addNote = (title, body) => {
  const notes = loadNotes();

  // Check to see if provided title matches a previously saved note title
  const duplicateNote = findNote(title);

  // If no duplicate is found, push new note into list of notes
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(success("New note added!"));
  } else {
    console.log(error("Note title taken!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  // If saved notes, console log each title, else let user know there are no notes
  if (notes.length) {
    console.log(neutral("Your notes:"));
    notes.forEach(({ title, body }, index) => {
      console.log(`${index + 1}. ${title}: ${body}`);
    });
  } else {
    console.log(error("No notes saved..."));
  }
};

const readNote = (title) => {
  // Find the note matching the provided title
  const foundNote = findNote(title);

  // If note has been found, console log title and body
  // else let user know there was no found note
  if (foundNote) {
    console.log(`Title: ${success(foundNote.title)}`);
    console.log(`Body: ${foundNote.body}`);
  } else {
    console.log(error("No note found!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  // Get notes without the provided note based on its title
  const notesToKeep = notes.filter((note) => note.title !== title);

  // Save new list of notes (without removed note)
  saveNotes(notesToKeep);

  // Provide user feedback based on length of old and new notes lists
  if (notes.length > notesToKeep.length) {
    console.log(success("Note removed!"));
  } else {
    console.log(error("No note found!"));
  }
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
};
