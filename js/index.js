const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `<span>Marilyn \u00A9 ${thisYear}</span>`;
footer.appendChild(copyright);

const skillsList = ['C++', 'Revit', 'AutoCAD', 'Microsoft Office'];
const skillsSection = document.getElementById('Skills');
const skillUL = skillsSection.querySelector('ul');

for (let skill of skillsList) {
  let skillItem = document.createElement('li');
  skillItem.innerText = skill;
  skillItem.style.fontSize = '1.4em';
  skillUL.appendChild(skillItem);
}


document.querySelectorAll('.experience-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});


let messageForm = document.querySelector("[name='leave_message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

let idCounter = 0;
function makeId() {
  let id = 'entry' + idCounter++;
  return id;
}

let entryById = {};

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let name = event.target.usersName.value;
  let email = event.target.usersEmail.value;
  let message = event.target.usersMessage.value;

  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  let id = makeId();
  let newMessage = document.createElement('li');
  newMessage.classList.add('message-item');

  newMessage.innerHTML = `<a href="mailto:${email} ">${name} </a><span>wrote: ${message} </span>`;
  newMessage.setAttribute('id', id);

  entryById[id] = { usersName: name, usersEmail: email, usersMessage: message };
  newMessage.appendChild(makeEditButton());
  newMessage.appendChild(makeRemoveButton());

  messageList.appendChild(newMessage);
  messageForm.reset();
  messageSection.hidden = false;

});

//remove button

function makeRemoveButton() {
  let removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.addEventListener('click', () => {
    let entry = removeButton.parentNode;
    let uidl = entry.getAttribute('id');
    delete entryById[uidl];
    entry.remove();
    if (messageList.childElementCount === 0) {
      messageSection.hidden = true;
    }

  return removeButton;
};

//edit button

function makeEditButton() {
  let editButton = document.createElement('button');
  editButton.innerText = 'edit';
  editButton.type = 'button';
  editButton.className = 'edit-button';
  editButton.addEventListener('click', () => {
    let entry = editButton.parentNode;

    let oldEditButton = entry.querySelector('button.edit-button');
    oldEditButton.hidden = true;

    let oldRemoveButton = entry.querySelector('button.remove-button');
    oldRemoveButton.hidden = true;

    let uid = entry.getAttribute('id');
    let clonedForm = messageForm.cloneNode(true);
    clonedForm.className = "edit-message-form";
    clonedForm.usersName.value = entryById[uid].usersName;
    clonedForm.usersEmail.value = entryById[uid].usersEmail;
    clonedForm.usersMessage.value = entryById[uid].usersMessage;
    entry.appendChild(clonedForm);
    clonedForm.addEventListener('submit', function editMessage(event) {
      event.preventDefault();
      entryById[uid].usersName = event.target.usersName.value;
      entryById[uid].usersEmail = event.target.usersEmail.value;
      entryById[uid].usersMessage = event.target.usersMessage.value;
      let newEntry = document.createElement('li');
      newEntry.classList.add('message-item');
      newEntry.setAttribute('id', uid);
      newEntry.innerHTML = `<a href = "mailto:${entryById[uid].usersEmail}"> ${entryById[uid].usersName} </a> <span>wrote: ${entryById[uid].usersMessage}</span>`;
      newEntry.appendChild(makeEditButton());
      newEntry.appendChild(makeRemoveButton());
      entry.parentNode.replaceChild(newEntry, entry);

    });

  });
  return editButton;
};

const userName = 'Maly22';

fetch(`https://api.github.com/users/${userName}/repos`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch repositories");
    }
  })
  .then((repositories) => {
    console.log(repositories);

    const projectSection = document.getElementById("projects");
    let projectList = document.createElement("ul");
    projectSection.appendChild(projectList);

    for (let repository of repositories) {
      let project = document.createElement("li");
      project.innerText = repository.name;
      projectList.appendChild(project);
    }
  })

  .catch(error => {
    if (error instanceof SyntaxError) {
      console.error("Unparsable response from server");
    } else {
      console.error("Error fetching data:", error.message);
    }
  })
