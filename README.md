# CURD-Plus-MQTT
__This project was created solely because the developer felt the stress.__

Inspired by Thingsboard Platform.

Project running on __ubuntu server 22.04__

## CURD feature
using `/data` endpoint
| **Methods** | **Funtions**    | **Endpoint**  | **Body** | **Data** |
| ----------- | --------------- | ------------  | -------- | -------------------------------------------- |
| GET         | getDatas        | /             | -        | -                                            |
| GET         | getLastData     | /last         | -        | -                                            |
| GET         | getDataById     | /:id          | -        | -                                            |
| POST        | saveData        | /             | json     | {"ts":number, "values":Object} or { Obejct } |
| PATCH       | updateData      | /:id          | json     | {"ts":number, "values":Object}               |
| DELETE      | deleteData      | /:id          | -        | -                                            |

if "ts" (timestamp) not included, it will declared by system automaticaly.

## MQTT feature
publish latest data from mongoDB while data changes because insert.

## install node.js
- `sudo apt update`
- `sudo apt install nodejs`
- `node -v`
- `sudo apt install npm`

## install mongodb
- ubuntu 22.04 [install mongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

### change Database type
- install mongodb
- change mongod.cfg or mongod.conf, adding:
  ```text
  replication:
    replSetName: rs0
    ```
- `mongosh "mongodb://127.0.0.1:27017/myData"`
- `rs.initiate()`
- `rs.status()`

## install docker
install docker for ubuntu 22.04
- `sudo apt update`
- `sudo apt install apt-transport-https curl gnupg-agent ca-certificates software-properties-common -y`
- `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
- `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"`
- `sudo apt install docker-ce docker-ce-cli containerd.io -y`
- `docker version`
- `sudo systemctl status docker`
- `sudo systemctl start docker`
- `sudo systemctl enable docker`

## open the port
- 3000 __backendDataBase__
- 1883 __tcp__
- 8083 __ws__
- 8084 __wss__
- 8883 __ssl__
- 18083 __dashboardEMQX__

## mqtt broker
install [EMQX](https://www.emqx.io/docs/en/v5.0/deploy/install-docker.html#use-docker-compose-to-build-an-emqx-cluster)
- default dashboard username "admin" password "public", change whatever you want~
- give password on security-authentication!

## clone repo, install, and running
- `git clone https://github.com/juanpradana/backendZanDataC.git`
- `cd backendZanDataC`
- `npm i`
- create .env file:
  ```text
  DB_ADDRESS='mongodb-address-URL'
  ADDRESS_MQTT='mqtt-address'
  QUERY_TOPIC='telemetry-topic'
  DB_USER='mqtt-username'
  DB_PASSWORD='mqtt-password'
  ```
- `npm run start`

## setting DNS Domain
- open DNS Management from domain panel
- set DNS:
  ```text
  1
  hostname: @
  TTL: 14440
  Type: A
  Value:<IP Server>
  
  2
  hostname: www
  TTL: 14440
  Type: CNAME
  Value:<your main page domain>
  ```
### DNS Type
- A record: a record that save IP Address from some domain (IP v4).
- AAAA record: a record that save IP Address from some domain (IP v6).
- CNAME record: other call this is alias record, can routing domain/subdomain to other domain.
- MX record: a record that directs email to a specific mail server.
- NS record: a record that stores information regarding which Authoritative Name Server is responsible for a particular domain.


~## adding certificate for SSL~
~- sudo apt-get update~
~- sudo apt-get install python3-certbot-nginx -y~
~- sudo certbot --nginx -d <yourdomain.com> -d <www.yourdomain.com>~

# Todo
## __Start from Windows__
- [X] install Node JS
- [X] build project express basic
- [X] install mongoDB
- [X] change DB to replication set type
- [X] connecting project to mongoDB
- [X] create project model database
- [X] create project controller
- [X] create project routes
- [X] testing CURD project (using Postman)
- [X] implement stream change of mongoDB using `watch()`
- [X] installing EMQX
- [X] try to access dashboard, change dashboard password, give authentication for mqtt connection
- [X] connecting project to mqtt
- [X] make publish condition when somethings insert into mongoDB
- [X] testing both of CURD and mqtt

## __Try Deploy on Ubuntu Server 22.04__
- [X] launch vps on aws
- [X] install Node.js v12.22.9 or more
- [X] install mongoDB
- [X] change database type to replication set (used for stream change)
- [X] install docker
- [X] opening port
- [X] install EMQX, change password dashboard, and give auth for mqtt connection
- [X] clone repo, install, and running
- [X] testing both of CURD and mqtt by ip server
- [X] setting DNS domain, routing server to domain
- [ ] implement username and password on mongoDB
- [ ] change backendCURD from `http` into `https`
- [ ] change mqtt from `ws` into `wss`
