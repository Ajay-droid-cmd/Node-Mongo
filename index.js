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
MongoClient.connect(url, (err, client)=>{
    //assert will check weather the err value is equal to null
    assert.equal(err, null);

    console.log('Connecting to Server');
    //To connect to db
    const db =client.db(dbname);
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);

                            client.close();
                        });
                    });
                });
        });
    });
});