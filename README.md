# backendZanDataC

## mqtt broker
install from https://www.emqx.io/docs/en/v5.0/deploy/install-docker.html#use-docker-compose-to-build-an-emqx-cluster

## prepare
- install mongodb
- change mongod.cfg or mongod.conf, adding:
  
  replication:
  
    replSetName: rs0
  
- mongosh "mongodb://127.0.0.1:27017/myData"
- rs.initiate()
- rs.status()

## adding certificate
- sudo apt-get update
- sudo apt-get install python3-certbot-nginx -y
- sudo certbot --nginx -d <yourdomain.com> -d <www.yourdomain.com>
