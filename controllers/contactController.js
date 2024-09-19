const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Get single contact
//@route GET /api/contact/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {

  const { name, email, phone } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All Fields Are Mandatory!");
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
    user_id : req.user.id,
  });
  res.status(201).json(newContact);
});

//@desc update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contactExist = await Contact.findById(req.params.id);
  if (!contactExist) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if(contactExist.user_id.toString() !== req.user.id){
    res.send(403);
    throw new Error("User don't have permission to update other user contacts")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {

  const contactExist = await Contact.findById(req.params.id);
  if (!contactExist) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if(contactExist.user_id.toString() !== req.user.id){
    res.send(403);
    throw new Error("User don't have permission to delete other user contacts")
  }

  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
