const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
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
  Folosind Object.values(), afiseaza o lista inversata
  cu numele complet inversat al prietenilor.
  `);
Object.values(person.friends)
  .reverse()
  .forEach(({ surname, name }) => {
    console.log(`${surname} ${name}`);
  });

console.warn(`
  Afiseaza propozitia: “Prietenii mei sunt Larry,
  Steven si Carol.” folosind Object.values()
`);

console.log(
  Object.values(person.friends).reduce((sentence, friend, index, friends) => {
    const { name } = friend;
    const length = friends.length;
    const punctuation =
      length - 1 === index ? '.' : length - 2 === index ? ' si ' : ', ';

    sentence += `${name}${punctuation}`;

    return sentence;
  }, 'Prietenii mei sunt '),
);

console.warn(`
Prin aceeasi metoda, afiseaza propozitia,
"Diferenta de varsta intre Larry si Dragos este de xxx ani." etc.
`);
const sentence1 = Object.values(person.friends).reduce((message, friend) => {
  const { name, age } = friend;
  const ageDiff = Math.abs(person.age - age);

  message += `Diferenta de varsta intre ${name} si ${person.name} este de ${ageDiff} ani. `;

  return message;
}, '');
console.log(sentence1.trim());
