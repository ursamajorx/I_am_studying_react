//userName     DeusVult
//dbPassword   enQlU4bqT38WMMQs

const bodyParser = require("body-parser");
const { ObjectID } = require("bson");
const express = require("express");
const app = express();
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb+srv://DeusVult:enQlU4bqT38WMMQs@cluster0.gxpipf6.mongodb.net/test", 
function(error, client){
    if (error){
        console.log(error);
    }
    else{
        const db = client.db("scratch-pads-database");
        const scratchPadsCollection = db.collection("scratch-pads");
        
        
app.listen(3001, function(){
    console.log('listen on port: 3001');
    console.log('press "ctrl + c" to stop');
});

//returns all scratch pads
app.get("/", async function(request, response){
    const scratchPads = await scratchPadsCollection.find().toArray();
    console.log(scratchPads);
    response.json(scratchPads);
});

//returns a scratch pad by id
app.get("/id", async function(request, response){
    const id = request.query.id;
    const scratchPad = await scratchPadsCollection.findOne({_id: ObjectID(id)}); 
    response.json(scratchPad);
});

//adds new scratch pad 
app.post("/", async function(request, response){
    const data = request.body;
    if (data.title === "" || data.content === ""){
        response.send("Missing: Title and Content")
    }
    else{
        const saveResult = await scratchPadsCollection.insertOne(data);
        response.json(saveResult);
    }
});

//update an existing scratch pad
app.put("/", async function(request, response){
    const data = request.body;
    if (data._id === "" || data.title === "" || data.content === "") {
        response.send("Missing: ID, Title, and Content")
    }
    else{
        const saveResult = await scratchPadsCollection.findOneAndUpdate(
            {_id: ObjectID(data._id)},
            {
                $set: {
                    title: data.title,
                    content: data.content
                }
            }
            );
        response.json(saveResult);
    }
});

//deletes a scratch pad
app.delete("/", async function(request, response){
    const data = request.body;
    const deleteResult = await scratchPadsCollection.deleteOne({_id: ObjectID(data._id)})
    response.json(deleteResult);
});
    }
});

