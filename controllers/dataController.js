// import models
import Data from "../models/Data.js";
 
// function get All Datas
export const getDatas = async (req, res) => {
    try {
        const datas = await Data.find();
        res.json(datas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
     
}
 
// function get single Data
export const getDataById = async (req, res) => {
    try {
        const data = await Data.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}
 
// function Create Data
export const saveData = async (req, res) => {
    const data = new Data(req.body);
    try {
        const savedData = await data.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
// function Update Data
export const updateData = async (req, res) => {
    const cekId = await Data.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"}); 
    try {
        const updatedData = await Data.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
// function Delete Data
export const deleteData = async (req, res) => {
    const cekId = await Data.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"});
    try {
        const deleteData = await Data.deleteOne({_id: req.params.id});
        res.status(200).json(deleteData);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}