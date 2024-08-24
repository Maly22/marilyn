const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const year = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `<span>Marilyn</span><span>&#169year</span><span>${year}</span>`
footer.appendChild(copyright);

const skillsList = ['C++', 'Revit', 'AutoCAD', 'Microsoft Office'];
const skillsSection = document.getElementById('Skills');
const skillUL = skillsSection.querySelector('ul');

for (Skills of skillsList){
   let skillItem = document.createElement('li');
   skillItem.innerHTML = Skills;
   skillItem.style.fontSize = '1.4em';
    skillUL.appendChild(skillItem);
}

document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });