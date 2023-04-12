const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port = 5020
app.use(express.json()); // Without `express.json()`, `req.body` is undefined. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({extended:true}))//is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.static(__dirname + '/public'))
const Terraform_data = require('./Models/EC2_defination')



try {
    mongoose.connect('mongodb+srv://Allen:As2636114@nodeexpressproject.bjsms.mongodb.net/Auto_AWS')
   
    console.log('database is connected successfully');
 
} catch(error) {
    console.log(error)
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + "index.html")
  })


app.post("/task",(async(req,res,next) => {
    try {
        //console.log(req.body)
        //res.send(req.body)
        const Terraform = await Terraform_data.create(req.body)
        console.log(Terraform)
      
        //await res.status(201).json({Terraform});
        await res.redirect('/')
    }catch(error){
        console.log('catch',error)
    }
    

}))











app.listen(port, () => console.log(`server is runningg on port ${port}`));