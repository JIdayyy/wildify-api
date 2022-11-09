const myFunction = (callback) => {
  const myArray = ["param1", "param2", "param3"];

  callback(myArray);
};

myFunction(([toto]) => console.log(toto));
