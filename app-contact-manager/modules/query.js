import contacts from './data.js';

export const findContact = (needle = 'query') => {
  const results = contacts.filter((contact) => {
    // [1, 'Carol', 'Carolson', '073', ... , []]
    const values = Object.values(contact).filter((part) => {
      return typeof part === 'number' || typeof part === 'string';
    });

    needle = needle.toLowerCase();

    if (values.join('').toLowerCase().includes(needle)) {
      return true;
    }

    return false;
  });

  return results;
};

export const deleteContact = (contactId) => {
  contactId = parseInt(contactId);
  if (!contactId || isNaN(contactId)) {
    return;
  }

  const contactIndex = contacts.findIndex((contact) => {
    const { id } = contact;

    return contactId === id;
  });

  if (contactIndex >= 0) {
    // splice mutates
    contacts.splice(contactIndex, 1);
  }
};

// add contact
export const addContact = (contact) => {
  // push mutates
  contacts.push(contact);
};

// get contact (by id)
export const getContact = (contactId) => {
  contactId = Number(contactId);

  return contacts.find((contact) => {
    const { id } = contact;

    return id === contactId;
  });
};

// editContact
export const editContact = (contact) => {
  const existingContact = getContact(contact.id);

  const contactProperties = Object.keys(existingContact);

  for (let i = 0; i < contactProperties.length; i++) {
    const propertyName = contactProperties[i];

    existingContact[propertyName] =
      contact[propertyName] || existingContact[propertyName];
  }
};

// addPet
export const addPet = (contactId, pet) => {
  const contact = getContact(contactId);
  contact.pets = contact.pets || [];

  // push mutates
  contact.pets.push(pet);
};
