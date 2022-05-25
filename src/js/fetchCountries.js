function fetchCountries(name) {
  return new Promise(function (resolve, reject) {
    fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`,
    ).then(result => {
        if (result.status === 200) {
          resolve(result.json());        
      } else {
        reject('Oops, there is no country with that name');
      }
    });
  });
}

export default fetchCountries;
