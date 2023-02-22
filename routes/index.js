// import express
import express from "express";
// import controllers
import { getDatas,
    getLastData,
    getDataById, 
    saveData, 
    updateData,
    deleteData } from "../controllers/dataController.js";
 
    // express router
const router = express.Router();
 
// Route get All Datas
router.get('/', getDatas);
// Route get All Datas
router.get('/last', getLastData);
// Route get single Data
router.get('/:id', getDataById);
// Route CREATE Data
router.post('/', saveData);
// Route UPDATE Data
router.patch('/:id', updateData);
// Route DELETE Data
router.delete('/:id', deleteData);
 
// export router
export default router;