const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.error(error);
    }

    return console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.error(error);
    }

    const contact = JSON.parse(data).find((el) => el.id == contactId);

    if (contact) {
      return console.table(contact);
    }

    return console.error("No match found");
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.error(error);
    }

    const oldList = JSON.parse(data);

    if (oldList.find((el) => el.id == contactId)) {
      const newlist = oldList.filter((el) => el.id != contactId);

      return fs.writeFile(contactsPath, JSON.stringify(newlist), (err) => {
        if (err) console.log("Error writing file:", err);
      });
    }

    return console.error("No match found");
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.error(error);
    }

    const newlist = [
      ...JSON.parse(data),
      {
        id: shortid.generate(),
        name: name,
        email: email,
        phone: phone,
      },
    ];

    fs.writeFile(contactsPath, JSON.stringify(newlist), (err) => {
      if (err) console.log("Error writing file:", err);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
