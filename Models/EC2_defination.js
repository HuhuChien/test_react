const mongoose = require('mongoose');

const Terraform_data_Schemma = new mongoose.Schema({
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
    server_name: {
        type:String,
        required:[true,'must provide server_name'],
     
    },
    

})


module.exports = mongoose.model('Terraform_data',Terraform_data_Schemma)







