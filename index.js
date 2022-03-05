//mongodb node module will provide connect module which helps us to connect to db
const MongoClient = require('mongodb').MongoClient;
//assert will throw error if false
const assert = require('assert');
//Url in which to mongodb server will listen
const url = 'mongodb://localhost:27017/';
//uses the db created earlier in mongodb>data server
const dbname = 'conFusion'
// To access the server
MongoClient.connect(url, (err, client)=>{
    //assert will check weather the err value is equal to null
    assert.equal(err, null);

    console.log('Connecting to Server');
    //To connect to db
    const db =client.db(dbname);
    //Will access the dishes collection
    const collection = db.collection('dishes')
    /**
     * First insertOne performs and with a callback function
     * Find is enclosed in the callback
     * inside find drop is enclosed in the callback
     * nesting of call is one inside the other
     */
    //insert one doc to db
    collection.insertOne({"name":"Uthapizza","description":"test"},(err,result)=>{
        assert.equal(err, null);

        console.log('After Insert');
        console.log(result.ops); //ops = operation have been done
        /**
         * will return all the docs form the collection
         * It converts the result into array
         */
        collection.find({}).toArray((err,docs)=>{
            assert.equal(err, null);
            console.log('Found:\n');
            console.log(docs);
            //Will drop the specified collection
            db.dropCollection('dishes',(err,result)=>{
                assert.equal(err, null);
                client.close();
            });
        });
    });
})