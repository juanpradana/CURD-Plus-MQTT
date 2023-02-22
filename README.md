# backendZanDataC

## prepare
- change mongod.cfg or mongod.conf, adding:
  
  replication:
  
    replSetName: rs0
  
- mongosh "mongodb://127.0.0.1:27017/myData"
- rs.initiate()
