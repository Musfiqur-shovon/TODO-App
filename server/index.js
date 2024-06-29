
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

/* 
Username : musfiqurr666
Password : 60TlKVsYiGDDKbYc
*/

const mongoURI = 'mongodb+srv://musfiqurr666:60TlKVsYiGDDKbYc@test.sohv9au.mongodb.net/?retryWrites=true&w=majority&appName=Test';

const connectDB = async () => {
    await mongoose.connect(mongoURI);
};

app.get('/get', (req,res)=>{
    TodoModel.find()
    .then( result => res.json(result))
    .catch( err => res.json(err))
})

app.put('/update/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findById(id)
    .then( result => {
        if (result.done === true){
            TodoModel.updateOne({ _id: id }, { done: false })
            .then( result => res.json(result))
            .catch(err => res.status(500).json(err));
        }else{
            TodoModel.updateOne({ _id: id }, { done: true })
            .then( result => res.json(result))
            .catch(err => res.status(500).json(err));
        }
    }
    )
    .catch( err => res.json(err))
})

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id : id},{done : true})
    .then( result => res.json(result))
    .catch( err => res.json(err))
})

app.post('/add',(req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task : task
    }).then((result)=> res.json(result))
    .catch((err) => res.json(err))
})

app.listen(3001, async ()=>{
    console.log("server is running.");
    await connectDB();
})