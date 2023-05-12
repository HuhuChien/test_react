require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const port = 5020
const {the_ad} = require('./ad.js')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')//目前沒用到


app.use(cookieParser());
app.use(cors());
app.use(express.json()); // Without `express.json()`, `req.body` is undefined. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({extended:false}))//is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.static(__dirname + '/front-end' + '/public'))
//app.set('trust proxy', true)


const Terraform_data = require('./Models/EC2_defination')
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));



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

function authenticatedToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.status(401).json("There is no token in client's browser")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error) =>{
        if(error){
            return res.status(403).json('token is wrong')
        } 
        next()
    })
}

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60s'})
}



//目前沒用到
app.get('/login', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '\\front-end' + "\\public\\index.html")

})




app.post('/auth/login',(req,res) => {
    console.log(req.body.username)
    console.log(req.body.password)
    const username = req.body.username
    const password = req.body.password 
    const user = {
        username: username,
        password: password
    
    }


    the_ad.authenticate(req.body.username, req.body.password, function(err, auth) {

        if (auth) {
          console.log('Authenticated!');
          //res.status(200).json('Authenticated')
          //登入成功才會產生token
          //方法1，token沒有設定到期日
          const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)

          //res.status(200).json(token)
          //方法2，token有設定到期日
          //const token = generateAccessToken(user)
          //console.log(typeof(token))
          //res.status(200).json(token)


          //總結:傳送cookie給client brower(cookie內含token)
           //browser沒有顯示cookie內容 5/15要處理
          res.cookie('token',token,{ 
            expires  : new Date(Date.now() + 9999999),
            httpOnly: false
        })

           
            res.status(200).send(token);
       
        }
        else {
          console.log('ERROR: '+JSON.stringify(err));
          console.log('Authentication failed!');
          res.status(401).json('Authenticated failed')
        }
      });



})









//新建雲端主機-送出按鈕
app.post("/task",authenticatedToken,(async(req,res,next) => {
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


//1.檢視申請內容
//2.後台管理-需求單號輸入
app.post("/demand",  async (req, res) => {
    const demand = await req.body.demand
    
    const the_data = await Terraform_data.find({ demand: demand});
    console.log(the_data)
    res.send(the_data);
  })


//上述另一種寫法
//1.檢視申請內容
//2.後台管理-需求單號輸入
app.get("/demand/:demand_apply",async(req,res) => {
    const {demand_apply} = req.params
    const the_data = await Terraform_data.find({ demand: demand_apply});
    res.status(200).send(the_data)
   
})



////後台管理，更新單一主機申請內容
app.put("/update_ec2/:id", async(req,res) => {
    
    try{
        const {id} = req.params
        let update = req.body
        const updatedEC2 = await Terraform_data.findOneAndUpdate({_id:id},update,{returnOriginal: false})

     
        res.status(200).json("doneee")
    }catch(error){
        console.log(error)
    }
 
})



//後台管理，刪除單一主機
app.delete("/delete_ec2/:id",  async (req, res) => {
    const {id} = req.params
    const deletedEC2 = await Terraform_data.deleteOne({ _id:id});
    console.log(deletedEC2)
   
    res.status(200).json("already deleted")
  
   

  })




  

connectDB()





