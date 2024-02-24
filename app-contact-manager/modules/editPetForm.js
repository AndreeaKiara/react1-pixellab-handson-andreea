export const render = (pet) => {
  const { name, age, species, id } = pet;
  const container = document.createElement('form');
  container.classList.add('edit-pet');

  container.innerHTML = `
  <h4>Editing pet ${name}</h4>
    <label class="form-label mt-2">Name</label>
    <input type="text"
      name="name"
      class="form-control form-control-sm"
      value="${name}"
    >

    <label class="form-label mt-2">Age</label>
    <input type="text"
      name="age"
      class="form-control form-control-sm"
      value="${age}"
    >

    <label class="form-label mt-2">Species</label>
    <input type="text"
      name="species"
      class="form-control form-control-sm"
      value="${species}"
    >

    <input type="hidden" name="id" value="${id}">

    <div class="mt-2">
      <button type="submit"
        title="Save"
        class="btn btn-secondary me-1"
      >Save</button>
      <button type="button"
        title="Cancel"
        class="btn btn-secondary cancel-button"
      >Cancel</button>
    </div>
  `;

  return container;
};
