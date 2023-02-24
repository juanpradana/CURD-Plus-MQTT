// import express
import express from "express";
// import mongoose
import mongoose from "mongoose";
// import mqtt
import { connect } from 'mqtt'
// import routes
import route from "./routes/index.js";
// import models
import Data from "./models/Data.js";
// import cors
import cors from "cors";
// import dotenv
import dotenv from "dotenv";
dotenv.config();
// construct express function
const app = express();

// connect ke database mongoDB
mongoose.connect(process.env.DB_ADDRESS,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 
// middleware 
app.use(cors());
app.use(express.json());
app.use('/data',route);
 
// listening to port
app.listen('3000',()=> console.log('Server Running at port: 3000'));

// connect to mqtt
const mqttClient = connect(process.env.ADDRESS_MQTT, { username: process.env.MQTT_USER, password: process.env.MQTT_PASSWORD });
const queryTopic = process.env.QUERY_TOPIC;

// connecting to mqtt broker
mqttClient.on('connect', function () {
    console.log('Server connected to Mqtt broker');
});

// Make stream change for data model
const dataChangeStream = Data.watch();

// Event listener when collection changes and publish data to mqtt
dataChangeStream.on('change', change => {
    console.log('Perubahan terjadi pada:');
    if(change.operationType === 'insert') {
        mqttClient.publish(queryTopic, JSON.stringify(change.fullDocument));
        console.log(change.fullDocument);
    }
});