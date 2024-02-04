const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  skills: {
    html: true,
    css: true,
    javaScript: true,
  },
  friends: {
    larry: {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    steven: {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    carol: {
      name: 'Carol',
      age: 29,
      surname: 'Carolson',
    },
  },
};
console.warn(`
Folosind Object.entries() pe proprietatea skills, afiseaza abilitatile
 persoanei daca acestea sunt true. Folosind propozitii de forma:
 “person.name cunoaste: html.” “person.name cunoaste: javaScript.”`);

const entries1 = Object.entries(person.skills);
entries1.forEach((skillEntry) => {
  const [skillId, isKnow] = skillEntry;

  console.log(
    `${person.name} ${isKnow ? 'cunoaste' : 'nu cunoaste'} ${skillId}.`,
  );
});

console.warn(`
Prin aceeasi metoda, afiseaza o lista inversata cu numele complet inversat al prietenilor.
`);
const reverseFriendsList = Object.entries(person.friends).reverse();
reverseFriendsList.forEach((friendEntry) => {
  const [, friend] = friendEntry;
  const { surname, name } = friend;

  console.log(`${surname} ${name}`);
});

console.warn(`
Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.entries()
`);
console.log(
  Object.entries(person.friends).reduce(
    (message, friendEntry, index, friends) => {
      const length = friends.length;
      const [, { name }] = friendEntry;
      const punctuation =
        length - 1 === index ? '.' : length - 2 === index ? ' si ' : ', ';

      message += `${name} ${punctuation}`;

      return message;
    },
    'Prietenii mei sunt ',
  ),
);

console.warn(`Folosind Object.entries() pe proprietatea skills,
 afiseaza toate abilitatile din obiectul skills.
`);
const entries2 = Object.entries(person.skills);

entries2.forEach(([index, skill]) => {
  console.log(`Abilitatea ${index}: ${skill}`);
});

console.warn(`Prin aceeasi metoda, afiseaza o lista cu numele complet al prietenilor.
`);

const friendList = Object.entries(person.friends);
friendList.forEach((friendName) => {
  const [, friend] = friendName;
  const { name, surname } = friend;
  console.log(`${name} ${surname}`);
});

console.warn(`Afiseaza propozitia: “Prietenii mei sunt Larry Larryson,
 Steven Stevenson si Carol Carolson.” folosind Object.entries()
`);
const friendsNames = Object.entries(person.friends)
  .map(([, friend]) => `${friend.name} ${friend.surname}`)
  .join(', ');
const friendsSentence = `Prietenii mei sunt ${friendsNames}.`;
console.log(friendsSentence);

console.warn(`In mod similar, afiseaza mai multe propozitii
 (cate una per console.log()) care sa afiseze: “Larry are xx ani. Steven are …”
`);
Object.entries(person.friends).forEach(([, friend]) => {
  console.log(`${friend.name} are ${friend.age} ani.`);
});
