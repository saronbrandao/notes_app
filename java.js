const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));

//FUNCTIONS
const updateLS = () => {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));

  console.log(notes);
};

const addNewNote = (text = '') => {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="tools">
      <button class="edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>`;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  //INTERNAL EVENT LISTENERS
  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    textArea.classList.toggle('hidden');
    main.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLS();
  });

  document.body.appendChild(note);
};

//EVENT LISTENERS
addBtn.addEventListener('click', () => {
  addNewNote();
});

//FUNCTIONS CALLS
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

//localStorage accepts only stringify elements. Use JSON.stringify() to add an item and JSON.parse to convert it back
// localStorage.setItem('name', 'Brad');
// localStorage.getItem('Brad');
// localStorage.removeItem('name');
//*****
// localStorage.setItem('name', JSON.stringify());
// JSON.parse(localStorage.getItem('Brad'));
// localStorage.removeItem('name');
