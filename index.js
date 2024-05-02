const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
      break;

    case "get":
      // ... id
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      // ... name email phone
      const addCont = await contacts.addContact(name, email, phone);
      return console.log(addCont);
      break;

    case "remove":
      // ... id
      const remove = await contacts.removeContact(id);
      return console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
