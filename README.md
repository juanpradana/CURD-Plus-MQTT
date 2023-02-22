# backendZanDataC

## install node.js
- sudo apt update
- sudo apt install nodejs
- node -v
- sudo apt install npm

## install mongodb
- ubuntu 22.04 https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

## prepare
- install mongodb
- change mongod.cfg or mongod.conf, adding:
  
  replication:
  
    replSetName: rs0
  
- mongosh "mongodb://127.0.0.1:27017/myData"
- rs.initiate()
- rs.status()

## install docker
ubuntu 22.04
- sudo apt update
- sudo apt install apt-transport-https curl gnupg-agent ca-certificates software-properties-common -y
- curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
- sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
- sudo apt install docker-ce docker-ce-cli containerd.io -y
- docker version
- sudo systemctl status docker
- sudo systemctl start docker
- sudo systemctl enable docker

## mqtt broker
install from https://www.emqx.io/docs/en/v5.0/deploy/install-docker.html#use-docker-compose-to-build-an-emqx-cluster
- default dashboard username "admin" password "public", change whatever you want
- give password on security-authentication

## clone repo
- git clone https://github.com/juanpradana/backendZanDataC.git
- cd backendZanDataC
- npm i
- create .env file, include DB_ADDRESS='', ADDRESS_MQTT='', QUERY_TOPIC='', DB_USER='', DB_PASSWORD=''
- npm run start

## open port
- 3000 backendDataBase
- 1883 tcp
- 8083 ws
- 8084 wss
- 8883 ssl
- 18083 dashboardEMQX

## adding certificate
- sudo apt-get update
- sudo apt-get install python3-certbot-nginx -y
- sudo certbot --nginx -d <yourdomain.com> -d <www.yourdomain.com>
