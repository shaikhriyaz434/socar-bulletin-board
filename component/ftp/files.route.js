const express = require('express');
const fileController=require('../ftp/files.controller')
const router = express.Router();

router.post('/upload',(req,res)=>{
    fileController.uploadFiles(req,res);
})

module.exports=router;