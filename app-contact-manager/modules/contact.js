import { render as renderPet } from './pet.js';

export const render = (contact) => {
  const { id, name, surname, phone, email, pets = [] } = contact;
  const container = document.createElement('article');
  container.classList.add('contact', 'border', 'p-3', 'mb-4');
  container.dataset.contactId = id;

  container.innerHTML = `
    <h1>${name + ' ' + surname}</h1>
    <ul>
      <li>${phone}</li>
      <li>${email}</li>
    </ul>

    <button title="Edit"
      type="button"
      class="btn btn-secondary edit-friend"
    >Edit</button>


    <button title="Add pet"
      type="button"
      class="btn btn-success add-pet-button"
    >Add pet</button>

    <button title="Delete"
      type="button"
      class="btn btn-danger delete-friend"
    >Delete</button>
  `;

  const petUl = document.createElement('ul');

  pets.forEach((pet) => {
    const renderedPetArticle = renderPet(pet);
    const petLi = document.createElement('li');
    petLi.append(renderedPetArticle);
    petUl.append(petLi);
  });

  container.append(petUl);

  return container;
};
