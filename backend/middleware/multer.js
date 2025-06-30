import express from 'express'
import multer from 'multer'


const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({storage})
export default upload;