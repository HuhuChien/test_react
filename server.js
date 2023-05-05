const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const port = 5020
app.use(cors());

app.use(express.json()); // Without `express.json()`, `req.body` is undefined. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({extended:false}))//is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.static(__dirname + '/front-end' + '/public'))
//app.set('trust proxy', true)

const Terraform_data = require('./Models/EC2_defination')




const connectDB = async() => {
    try {
    
        await mongoose.connect('mongodb://localhost:27017/Create_EC2')
        await console.log('database is connected successfully');
        await app.listen(port, () => console.log(`server is runningg on port ${port}`));

    } catch(error) {
        await console.log('failedddddddddddddddddddd')
        await console.log(error)
    }
}




app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '\\front-end' + "\\public\\index.html")
  })

  


app.post("/task",(async(req,res,next) => {
    try {
        //console.log(req.headers['x-forwarded-for'] || req.socket.remoteAddress )
        //console.log(req.ip)
        //let ip = req.connection.remoteAddress.split(`:`).pop();
        //console.log(ip)
        const Terraform = await Terraform_data.create(req.body)
        //console.log(Terraform)
        await Terraform.save()
        await res.status(201).json({Terraform});

    }catch(error){
        console.log('catch',error)
    }
    

}))


app.post("/demand",  async (req, res) => {
    const demand = await req.body.demand
    
    const the_data = await Terraform_data.find({ demand: demand});
    console.log(the_data)
    res.send(the_data);
  })





app.delete("/delete_ec2/:id",  async (req, res) => {
    const {id} = req.params
    const deletedEC2 = await Terraform_data.deleteOne({ _id:id});
    console.log(deletedEC2)
    res.status(200).json("already deleted")

  })


connectDB()





