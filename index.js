//mongodb node module will provide connect module which helps us to connect to db
const MongoClient = require('mongodb').MongoClient;
//assert will throw error if false
const assert = require('assert');
//Url in which to mongodb server will listen
const url = 'mongodb://localhost:27017/';

const dboper = require('./operations');

//uses the db created earlier in mongodb>data server
const dbname = 'conFusion'
// To access the server
MongoClient.connect(url).then((client)=>{
   
    //assert.equal(err, null);

    console.log('Connecting to Server');

    const db =client.db(dbname);
    dboper.insertDocument(db, { name: "hrdonut", description: "Test"}, "dishes") 
    .then((result) => {
        console.log("Insert Document:\n", result.ops);

    return  dboper.findDocuments(db, "dishes")
    })
    .then((docs) => {
        console.log("Found Documents:\n", docs);

    return  dboper.updateDocument(db, { name: "hrdonut" },{ description: "Updated Test" }, "dishes")
    })
    .then((result) => {
        console.log("Updated Document:\n", result.result);

    return dboper.findDocuments(db, "dishes")
    })
    .then((docs) => {
        console.log("Found Updated Documents:\n", docs);
                        
    return db.dropCollection("dishes")
    })
    .then((result) => {
         console.log("Dropped Collection: ", result);

         client.close();
      })
      .catch((error) => {console.log(error);});
})    
.catch((err) => {console.log(err)})