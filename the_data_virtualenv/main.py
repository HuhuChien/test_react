from pymongo import MongoClient
import json
import hcl2


uri = "mongodb+srv://Allen:As2636114@nodeexpressproject.bjsms.mongodb.net/?retryWrites=true&w=majority"

try:
    client = MongoClient(uri)
    db = client['Auto_AWS']
    print(f'connected to Auto_AWS')
except Exception:
    print('Failed to connect to MongoDB')

server_name = ''
ami = ''
instance_type = ''
subnet = ''


def get_Data_from_mongo():
    global server_name , ami, instance_type,subnet
    #此處要依據需求重寫
    post1 = db.terraform_datas.find_one({'server_name': 'SRVJH1'})
    server_name = post1['server_name']
    ami = post1['ami']
    instance_type = post1['instance_type']
    subnet = post1['subnet']

    print(f'{server_name},{ami},{instance_type},{subnet}')
    


def create_tfvars():
    data = {
    "SERVER_NAME":server_name,
    "AMI":ami,
    "INSTANCE_TYPE":instance_type,
    "SUBNET":subnet
    }
    
    with open("EC2_variable.tfvars.json", "w") as file_out:
        file_out.write(json.dumps(data, indent=4))



get_Data_from_mongo()
create_tfvars()








