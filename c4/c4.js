console.log('prv konzol log');
console.log('vtor konzol log');

setTimeout(() => {
  console.log('fetch the data');
}, 5000);

console.log('tret konzol log');

[2, 3, 4].forEach((i) => i + 1);

const fetchFunction = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/');
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch(err) {
    console.log(err);
  }
};

fetchFunction();

const bingoPromise = new Promise((success, fail) => {
  if (Math.random() > 0.5) {
    success('you win');
  } else {
    fail('you lose');
  }
});

const bingoFunkcija = async () => {
  try {
    const result = await bingoPromise;
    console.log(result);
  } catch(err) {
    console.log(err);
  }
};

bingoFunkcija();

console.log('cetvrt konzol log');

