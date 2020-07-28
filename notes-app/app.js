const chalk = require("chalk");
const yargs = require("yargs");

const { addNote, readNote, listNotes, removeNote } = require("./notes");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      demandOption: true,
      describe: "Note title",
      type: "string",
    },
    body: {
      demandOption: true,
      describe: "Note body",
      type: "string",
    },
  },
  handler({ title, body }) {
    addNote(title, body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      demandOption: true,
      describe: "Note title",
      type: "string",
    },
  },
  handler({ title }) {
    removeNote(title);
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      demandOption: true,
      describe: "Note title",
      type: "string",
    },
  },
  handler({ title }) {
    readNote(title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List notes",
  handler() {
    listNotes();
  },
});

yargs.parse();
