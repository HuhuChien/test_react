const mongoose = require('mongoose');
const moment = require('moment-timezone');




const Terraform_data_Schemma = new mongoose.Schema({
    
    demand: {
        type:String,
        required:[true,'must provide demand'],
     
    },
    
    server_name: {
        type:String,
        required:[true,'must provide server_name'],
     
    },
      
    ami: {
        type:String,
        required:[true,'must provide ami'],
     
    },

    instance_type: {
        type:String,
        required:[true,'must provide instance_type'],
     
    },
    subnet: {
        type:String,
        required:[true,'must provide subnet'],
     
    },
    ip: {
        type:Boolean,
        required:[true,'must provide ip'],
     
    },
    created_date: {
        type: String,
        default: () => moment.tz(Date.now(), "Asia/Taipei").format()
    },
   
    updated_date: {
        type: String, 
        default: () => moment.tz(Date.now(), "Asia/Taipei").format()
    },


})


module.exports = mongoose.model('Terraform_data',Terraform_data_Schemma)






