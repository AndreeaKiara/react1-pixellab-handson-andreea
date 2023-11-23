const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn(`
  Folosind obiectul person si reduce,
  afiseaza in consola un string care contine skill-urile
  de pe pozitiile pare ale arrayului, separate prin virgula`);
// html,js,java,jquer,
let accumulator = '';
for (let i = 0; i < person.skills.length; ++i) {
  const skill = person.skills[i];
  let punctuation = ',';

  if (i === person.skills.length - 1) {
    punctuation = '';
  }

  accumulator += `${skill}${punctuation}`;
}
console.log(accumulator);

const message1 = person.skills.reduce((message1, skill, index, skills) => {
  const punctuation = skills.length - 1 === index ? '' : ',';

  return (message1 += `${skill}${punctuation}`);
}, '');

console.log(message1);

const message2 = person.skills.reduce((filteredSkills, skill) => {
  if (skill.toLowerCase().startsWith('j')) {
    return filteredSkills;
  }

  filteredSkills.push(skill);

  return filteredSkills;
}, []);
console.log(message2.join(','));

console.warn(`
Folosind reduce afiseaza propozitia: "Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."
`);

const message3 = person.friends.reduce((message, friend, index, friends) => {
  const { name, surname } = friend;
  const punctuation = friends.length - 1 === index ? '.' : ', ';

  message += `${name} ${surname}${punctuation}`;

  return message;
}, 'Prietenii mei se numesc ');
console.log(message3);

console.warn(`
  Folosind reduce, afiseaza numarul total de ani pe care
  il au persoanele din arrayul friends, doar daca varsta
  este mai mare sau egala cu 30 de ani.
`);
console.log(
  person.friends.reduce((totalAge, { age }) => {
    if (age >= 30) {
      totalAge += age;
    }

    return totalAge;
  }, 0),
);

console.warn(
  ` Folosind reduce, afiseaza suma anilor de nastere a persoanelor.`,
);
console.log(
  person.friends.reduce((sumYears, friend) => {
    const { age } = friend;
    const birthYear = new Date().getFullYear() - age;

    return (sumYears += birthYear);
  }, 0),
);

console.warn(`
Afiseaza fraza: "Intre Dragos si
Larry este o diferenta de xx ani. Intre Dragos si
Steven... ", doar daca varsta prietenului este impara.
`);
const finalSentence = person.friends.reduce((sentence, friend) => {
  const { name, age } = friend;

  if (age % 2 === 0) {
    return sentence;
  }
  const ageDiff = Math.abs(person.age - age);

  sentence += `Intre ${person.name} si ${name} este o diferenta de ${ageDiff} ani. `;

  return sentence;
}, '');

console.log(finalSentence.trim());
