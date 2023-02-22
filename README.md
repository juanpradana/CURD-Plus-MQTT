# backendZanDataC

## prepare
- change mongod.cfg or mongod.conf, adding:
  
  replication:
  
    replSetName: rs0
  
- mongosh "mongodb://127.0.0.1:27017/myData"
- rs.initiate()

## adding certificate
- sudo apt-get update
- sudo apt-get install python3-certbot-nginx -y
- sudo certbot --nginx -d <yourdomain.com> -d <www.yourdomain.com>
