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
- `ws://yourdomain.com:8083/mqtt`
- `wss://yourdomain.com:8084/mqtt`

## install node.js
- `sudo apt update`
- `sudo apt install nodejs`
- `node -v`
- `sudo apt install npm`

## install mongodb
- ubuntu 22.04 [install mongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

### change Database type
- install mongodb
- change mongod.cfg or mongod.conf, add:
  ```text
  replication:
    replSetName: rs0
    ```
- `sudo systemctl restart mongod`
- `sudo systemctl status mongod`
- `sudo mongosh "mongodb://127.0.0.1:27017/myData"`
- `rs.initiate()`
- `rs.status()`

### apply authentication
- change mongod.cfg or mongod.conf, delete:
  ```text
  replication:
    replSetName: rs0
    ```
- `sudo systemctl restart mongod`
- `sudo systemctl status mongod`
---
- `sudo mongosh`
- use admin
```text
db.createUser({
  user: "yourusername",
  pwd: "yourpassword",
  roles: [ { role: "root", db: "admin" } ]
})
```
- `exit`
---
- `sudo su`
- `mkdir -p /opt/mongodb/keyfile`
- `openssl rand -base64 741 > /opt/mongodb/keyfile/mongodb-keyfile`
- `chmod 600 /opt/mongodb/keyfile/mongodb-keyfile`
- `chown mongodb:mongodb /opt/mongodb/keyfile/mongodb-keyfile`
- `exit`
---
- `sudo nano /etc/mongod.conf`
- change mongod.cfg or mongod.conf, add:
  ```text
  replication:
    replSetName: rs0
    ```
  and
  ```text
  security:
    authorization: enabled
    keyFile: /opt/mongodb/keyfile/mongodb-keyfile
    ```
 - `sudo systemctl restart mongod`
 - `sudo systemctl status mongod`

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
- 80 __http__
- 443 __https__
- 8083 __ws__
- 8084 __wss__
- 27017 __mongodb__

## mqtt broker
install [EMQX](https://www.emqx.io/docs/en/v5.0/deploy/install-docker.html#use-docker-compose-to-build-an-emqx-cluster)
- default dashboard username "admin" password "public", change whatever you want~
- give password on security-authentication!

## clone repo, install, and running
- `git clone https://github.com/juanpradana/CURD-Plus-MQTT.git`
- `cd CURD-Plus-MQTT`
- `npm i`
- create .env file:
  ```text
  DB_ADDRESS='mongodb-address-URL'
  ADDRESS_MQTT='mqtt-address'
  QUERY_TOPIC='telemetry-topic'
  MQTT_USER='mqtt-username'
  MQTT_PASSWORD='mqtt-password'
  ```
  if use mqtt local, use __ws__ protocol
  
  _DB_ADDRESS example_:
  - `mongodb://127.0.0.1:27017/myData?replicaSet=rs0`
  - `mongodb://yourusername:yourpassword@127.0.0.1:27017/myData?replicaSet=rs0&authSource=admin`
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

## Reverse Proxy
- `sudo apt update`
- `sudo apt-get install nginx -y`
- `sudo systemctl status nginx`
- `cat /etc/nginx/sites-available/default` to view the contents of the file
- `sudo nano /etc/nginx/sites-available/default` change part of:
```text
location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
}
```
into:
```text
        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
```
- change `server_name _;`
to `server_name yourDomain.com www.yourDomain.com;` then save
- `sudo systemctl restart nginx`

## implement SSL http
- `sudo apt-get update`
- `sudo apt-get install python3-certbot-nginx -y`
- `sudo certbot --nginx -d yourDomain.com -d www.yourDomain.com`

## implement subdomain for emqx
- `sudo nano /etc/nginx/sites-available/emqx`
- put this configuration:
```text
server {
        server_name emqx.yourDomain.com;

        location / {
                proxy_pass http://localhost:18083;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/farzani.my.id/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/farzani.my.id/privkey.pem; # managed by Certbot


}

server {
    if ($host = emqx.yourDomain.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot
    listen 80;
    server_name emqx.yourDomain.com;
    return 404; # managed by Certbot

}
```
- `sudo ln -s /etc/nginx/sites-available/emqx /etc/nginx/sites-enabled/`
- `sudo certbot --nginx -d yourDomain.com -d www.yourDomain.com -d emqx.yourDomain.com`
- `sudo systemctl restart nginx`
at your domain panel, add DNS record:
```text
hostname: emqx
TTL: 14440
Type: A
Value:<your IP Server>
```

## implement SSL WS
- use cert from `/etc/letsencrypt/live/yourdomain.com/fullchain.pem` for TLS Cert EMQX. you can change on dashboard-listeners-wss default.
- use cert from `/etc/letsencrypt/live/yourdomain.com/privkey.pem` for TLS Key EMQX. you can change on dashboard-listeners-wss default.

## want to access Database?
- `mongosh 'mongodb://yourusername:yourpassword@yourDomain.com:27017/myData?replicaSet=rs0&authSource=admin&directConnection=true'`

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
- [X] implement username and password on mongoDB
- [X] change backendCURD from `http` into `https`
- [X] change mqtt from `ws` into `wss`
- [X] implement subdomain for emqx

# Got Trouble?
## Error: listen EACCES: permission denied 0.0.0.0:80
- `sudo apt-get install libcap2-bin`
- ```sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` ```
