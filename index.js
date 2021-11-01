const express = require('express');

const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;



const app= express();
const port = process.env.PORT || 4000;




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gb1g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());


async function run(){
    try{
        await client.connect();
        console.log('connected');
        const database = client.db('Assignment-11');
        const packageCollection= database.collection('Wander');

        const orderCollection = database.collection('orders');

        //GET API
        app.get('/services', async(req,res)=>{
            const cursor = packageCollection.find({});
            const services= await cursor.toArray();
            res.send(services);
        });



        //GET single package
        app.get('/services/:id',async(req,res)=>{
            const id= req.params.id;
            const query= { _id: ObjectId(id)};
            const service= await packageCollection.findOne(query);
            res.json(service);

        })
        // GET ORDER
        app.get('/orders', async(req,res)=>{
            const cursor = orderCollection.find({});
            const services= await cursor.toArray();
            res.send(services);
        });

        //GET myOrder
        app.get('/myOrder', async(req,res)=>{
            const cursor = orderCollection.find({});
    
            const users= await cursor.toArray();
    
            res.send(users);
        })

        

        //GET all Orders
        app.get('/allOrders', async(req,res)=>{
            const cursor = orderCollection.find({});
    
            const users= await cursor.toArray();
    
            res.send(users);
        })

        //GET single allorders
        app.get('/allOrders/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user= await orderCollection.findOne(query);
            console.log('load user with id :', id);
            res.send(user);
        })
        //POST API package
        app.post('/services', async(req,res)=>{
            
            const service = req.body;
            console.log("hit the post", service);
            const result = await packageCollection.insertOne(service);

            console.log(result);
            res.json(result);
        })

        //POST API orders
        app.post('/orders', async(req,res)=>{
            
            const order = req.body;
            console.log("hit the post", order);
            const result = await orderCollection.insertOne(order);

            console.log(result);
            res.json(result);
        })

        // DELETE myOrder API

            app.delete('/myOrder/:id', async(req,res)=>{
                const id= req.params.id;
                const query = {_id: ObjectId(id)};
                const result = await orderCollection.deleteOne(query);
                console.log('deleting user with id', result);
                res.json(result);
            })

         // DELETE all Order API

            app.delete('/allOrders/:id', async(req,res)=>{
                const id= req.params.id;
                const query = {_id: ObjectId(id)};
                const result = await orderCollection.deleteOne(query);
                console.log('deleting user with id', result);
                res.json(result);
            })
    }
    finally{
       // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Hello world');
});

app.listen(port, ()=>{
    console.log('listening to port', port  );
})