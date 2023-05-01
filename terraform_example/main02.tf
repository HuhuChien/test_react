provider "aws" {
  region = "us-east-1"
  access_key = "AKIAU4RRRY64OEO4XJR3"
  secret_key = "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"
}
/*
resource "aws_instance" "ubuntu_2" {
  ami           = "ami-06878d265978313ca"
  instance_type = "t2.micro"
  key_name   = "Penpenhu"
  tags = {
    Name = "Ubuntu_22" # aws顯示的主機名稱
  }
}

resource "aws_vpc" "first-vpc" {
  cidr_block = "10.0.0.0/16"  #2^16(32-16=16剩餘host) = 65536(total number of hosts)
  tags = {
    Name = "production_vpc"
  }
}
#如果把first-vpc全切成4個subnet會是(65536個hosts)
#10.0.0.0/18(16384個hosts)
#10.0.64.0/18(16384個hosts)
#10.0.128.0/18(16384個hosts)
#10.0.192.0/18(16384個hosts)

resource "aws_subnet" "subnet-1" {
  vpc_id     = aws_vpc.first-vpc.id
  cidr_block = "10.0.0.0/24" #2^8=256個host(只有254個可用)
  tags = {
    Name = "prod-subnet1"
  }
}


resource "aws_subnet" "subnet-2" {
  vpc_id     = aws_vpc.first-vpc.id
  cidr_block = "10.0.1.0/24" #2^8=256個host(只有254個可用)
  tags = {
    Name = "prod-subnet2"
  }
}

/*
resource "<provider>_<resource_type>" "name"{
    config options...
    key = "value"
    key2 = "another value"
}
*/

variable ET {
  # type        = string
  # default     = ""
  # description = "description"
}



#1. create vpc
resource "aws_vpc" "vpc_huhu" {
  cidr_block = "10.10.0.0/16"  #2^16(32-16=16剩餘host) = 65536(total number of hosts)
  tags = {
    Name = "vpc_hu"
  }
}
#2. create internet gateway
resource "aws_internet_gateway" "gw_huhu" {
  vpc_id = aws_vpc.vpc_huhu.id

  tags = {
    Name = "gw_hu"
  }
}

#3. create route table

resource "aws_route_table" "rt_huhu" {
  vpc_id = aws_vpc.vpc_huhu.id

  route {
    cidr_block = "0.0.0.0/0" #any instance inside a VPC都送到internet gateway，Destination是0.0.0.0/0
    gateway_id = aws_internet_gateway.gw_huhu.id
  }

  route {
    ipv6_cidr_block        = "::/0"
     gateway_id = aws_internet_gateway.gw_huhu.id
  }

  tags = {
    Name = "rt_hu"
  }
}

#4. create a subnet

  resource "aws_subnet" "subnet1_huhu"{
    vpc_id = aws_vpc.vpc_huhu.id 
    cidr_block = "10.10.0.0/24" # 2^8=256個hosts
    availability_zone = "us-east-1a" #如果不指定，會是random AZ
    tags = {
      Name = "subnet1_hu"
    }
  }

#5. Associate subnet with Route table
resource "aws_route_table_association" "rt_associ" {
  subnet_id      = aws_subnet.subnet1_huhu.id
  route_table_id = aws_route_table.rt_huhu.id
}
#6. Create SG to allow port 22,80,443
resource "aws_security_group" "allow_web" {
  name        = "allow_web_traffic"
  description = "Allow WEB inbound traffic"
  vpc_id = aws_vpc.vpc_huhu.id 

  ingress {
    description      = "HTTPS"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]#對誰開放，因為是Web server，所以要對全部人開放

  }

    ingress {
    description      = "HTTP"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]#對誰開放，因為是Web server，所以要對全部人開放

  }

   ingress {
    description      = "SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]#對誰開放，因為是Web server，所以要對全部人開放

  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_WEB_SSH"
  }
}

#7. Create network interface
resource "aws_network_interface" "web_nic_huhu" {
  subnet_id       = aws_subnet.subnet1_huhu.id
  private_ips     = ["10.10.0.15"]
  security_groups = [aws_security_group.allow_web.id]

}
#8. Assign an elastic ip to the NIC

resource "aws_eip" "one" {
  vpc                       = true
  network_interface         = aws_network_interface.web_nic_huhu.id
  associate_with_private_ip = "10.10.0.15"
  depends_on = [aws_internet_gateway.gw_huhu] #很重要，不然會在EC2還在pending階段，就要associate，結果會失敗(第一次terrafrom apply好像都會失敗)
}

# resource "aws_eip_association" "eip_assoc" {
#   instance_id   = aws_instance.ubuntu_1.id
#   allocation_id = aws_eip.one.id
# }




#9. create Ubuntu server and install/enable apache2

resource "aws_instance" "ubuntu_1" {
  ami           = "ami-06878d265978313ca"
  instance_type = "t2.micro"
  availability_zone = "us-east-1a" #要和subnet的AZ一樣
  key_name   = "Penpenhu"
  #vpc_security_group_ids = [aws_security_group.allow_web.id]

  tags = {
    Name = var.ET #aws顯示的主機名稱
  }

  network_interface {
  network_interface_id = aws_network_interface.web_nic_huhu.id
  device_index         = 0
  }

  #user_data = "${file("install_apache.sh")}"
  user_data = "${file("${path.module}/install_apache.sh")}" 
/*
  user_data = <<-EOF  
              #!/bin/bash
              sudo apt update -y
              sudo apt install apache2 -y
              sudo systemctl start apache2
              sudo echo "your first web server" > /var/www/html/index.html
              cd /var
              sudo touch apple
              EOF
  */
  
  
}
#terraform apply會看到
output "server_public_ip" {
  value = aws_eip.one.public_ip
}

output "server_private_ip" {
    value = aws_instance.ubuntu_1.private_ip
}

output "server_id" {
    value = aws_instance.ubuntu_1.id
}
 