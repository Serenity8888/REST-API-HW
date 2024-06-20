const contacts = require("./../models/contacts.json");

const listContacts = async (req, res, next) => {
  try {
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return res.status(404).json({ message: "Not found" });
    }
    const [contact] = contacts.splice(idx, 1);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const newContact = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return res.status(404).json({ message: "Not found" });
    }
    contacts[idx] = { ...contacts[idx], name, email, phone };
    res.json(contacts[idx]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
