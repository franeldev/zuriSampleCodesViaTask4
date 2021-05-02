const fs = require('fs');
const http = require('http');
const arrOfUsers = require('./arrOfUsers.json');

// this check to see if directory exists, if not, it creates one
const resultDir = 'result';
if (!fs.existsSync(resultDir)) {
  fs.mkdirSync(resultDir);
  console.log(`The '${resultDir}' directory has been successfully created.`);
}
else {
  console.log(`The '${resultDir}' directory has been successfully updated.`);
}

// Create a Readable Stream
const readDataStream = fs.createReadStream('arrOfUsers.json', 'utf8');

// this check to see if the path is assessible if not, it creates one then create writable stream inside it
fs.access('./result/textFile.txt', (err) =>{

  if(err) {
    console.log('Path created.');
  } 
  else {
    console.log('Path exists.');
  }

  // After we've had access to the path created or seen that it exists, we can now Create a Writable Stream
  const writeDataStream = fs.createWriteStream(`${__dirname}/result/textFile.txt`);

  // We need to read the readDataStream then pipe it down to the writable stream
  readDataStream.pipe(writeDataStream);

  /////////// SOLUTION TO QUESTIONS \\\\\\\\\\\\\\
  /* ------------------ a ------------------- */
  userAge = arrOfUsers.map(user => user.age) 
  console.log(`The users age are ${userAge}`);
  console.log('new chunk received!');

  /* ------------------ b(i) ------------------- */
  //filter method is mapped in order to get the divorced user(s)
  divorcedUser = arrOfUsers
  .filter(arrOfUser => !arrOfUser.isDivorced === false) 
  .map(arrOfUser => arrOfUser.name)
  console.log(`The divorcedUser is ${divorcedUser} `);

  /* ------------------ b(ii) ------------------- */
  //filter method is mapped in order to get married user(s)
  marriedUsers = arrOfUsers
  .filter(arrOfUser => arrOfUser.isMarried === true) 
  .map(arrOfUser => arrOfUser.name)
  console.log(`The marriedUsers are ${marriedUsers} `);

  /* ------------------ b(iii) ------------------- */
  //filter method is mapped in order to get male user(s)
  maleUsers = arrOfUsers
  .filter(arrOfUser => arrOfUser.gender === 'male') 
  .map(arrOfUser => arrOfUser.name)
  console.log(`The maleUsers are ${maleUsers} `);

  /* ------------------ b(iv) ------------------- */
  //filter method is mapped in order to get female user(s)
  femaleUsers = arrOfUsers
  .filter(arrOfUser => arrOfUser.gender === 'female') 
  .map(arrOfUser => arrOfUser.name)
  console.log(`The femaleUsers are ${femaleUsers}`);

  /* ------------------ b(v) ------------------- */
  // sorted by decrease in age
  decreasdAge = arrOfUsers.map(user => user.age) 
  decreasdAge.sort((a, b) =>  b - a );
  console.log(`Users sorted by decrease in age are ${decreasdAge}`);

  /* ------------------ 2(a) ------------------- */
  newArrName = arrOfUsers
  //map method that store name of users
  .map(arrOfUser => arrOfUser.name)
  console.log(`The newArrName that store names of users are ${newArrName}`);

  /* ------------------ 2(b) ------------------- */
  newGenderArr = arrOfUsers
  //map method that store gender of users
  .map(arrOfUser => arrOfUser.gender)
  console.log(`The newGenderArr of genders are ${newGenderArr}`);

  /* ------------------ 2(c) ------------------- */
  nameAndGender = arrOfUsers
  //map method that store both name and gender of users
  .map( (element) => {
    return `${element.name} ${element.gender} `;
  })
  console.log(`The name and gender of users are ${nameAndGender}`);


})
 // The on end readable stream check for errors
 readDataStream.on('end', (err) => {
  if(err) throw err;
  console.log('data streamed successfully!');
});


// CREATE SERVER (SUPPOSED TO BE READABLE STREAM PIPED WRITABLE STREAM TO CLIENT )
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-Type': 'application/json' }); 

  const readDataStream = fs.createReadStream('arrOfUsers.json', 'utf8');
  res.end(JSON.stringify(
    {
      'The users age are':userAge, 
      'The divorcedUser is':divorcedUser,
      'The marriedUsers are':marriedUsers,
      'The maleUsers are':maleUsers,
      'The femaleUsers are':femaleUsers,
      'Users sorted by decrease in age are':decreasdAge,
      'The newArrName that store names of users are':newArrName,
      'The newGenderArr of genders are':newGenderArr,
      'The name and gender of users are':nameAndGender
    }, null, ' '));
});
// Listen to the Response
server.listen(5000, 'localhost', () => {
  console.log('Now listening to port 5000!');
});
