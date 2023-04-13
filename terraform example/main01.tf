terraform {
  /*
    backend "remote"{
    organization = "ExamPro"
    workspaces {
      name = "provisioners"
    }
  }
  
  */

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.50.0"
    }
  }
}
provider "aws" {
  region = "us-east-1"
 
}

provider "aws" {
  region = "eu-west-1"
  alias = "eu"
}

variable "instance_type" {
  type = string 

}

locals {
  project_name = "Allen"
}

output "instance_ip_apple" {
  value = aws_instance.ubuntu_1.private_ip
  #value = aws_instance.ubuntu_1  #會看到詳細資訊
}
/*


module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  providers = {
    aws = aws.eu
  }
  name = "my-vpc"
  cidr = "10.12.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.12.1.0/24", "10.12.2.0/24", "10.12.3.0/24"]
  public_subnets  = ["10.12.101.0/24", "10.12.102.0/24", "10.12.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = true

  tags = {
    Terraform = "true"
    Environment = "dev"
  }
}


*/
data "aws_vpc" "main" {       #dataSource
  id = "vpc-000133ef9eaf8fe20"
}



data "template_file" "user_data"{   #dataSource
  template = file("./userdata.yaml")
}


resource "aws_security_group" "sg_my_server" {
  name        = "sg_my_server"
  description = "my secuirty group"
  vpc_id      = data.aws_vpc.main.id  #去參考上面的dataSource

  ingress {
    description      = "http"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
  }

  ingress {
    description      = "ssh"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
  }


  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

}



resource "aws_instance" "ubuntu_1" {
  ami           = "ami-06878d265978313ca"
  instance_type = "t2.micro"
  key_name      = "Penpenhu"
  vpc_security_group_ids = [aws_security_group.sg_my_server.id]
  user_data = data.template_file.user_data.rendered
  /*
  provisioner "local-exec"{
    command = "echo ${self.private_ip} >> private_ips.txt"
  }
  */
 
  
 
  provisioner "remote-exec" {
    inline = [
      "echo ${self.private_ip} >> /home/ubuntu/private_ips.txt"
    ]
    connection {
      type     = "ssh"
      user     = "ubuntu"
      private_key = "${file("${path.module}\\Penpenhu.pem")}"  #失敗
      host     = "${self.public_ip}"
    }
  
  }
 

  provisioner "file" {
    content     = "ami used: ${self.ami}"
    destination = "/home/ubuntu/ami3.txt"
    connection {
      type     = "ssh"
      user     = "ubuntu"
      private_key = "${file("${path.module}\\Penpenhu.pem")}" 
      host     = "${self.public_ip}"
    }
  }

 

  tags = {
    Name = "Ubuntu_1_${local.project_name}" # aws顯示的主機名稱
  }
}








