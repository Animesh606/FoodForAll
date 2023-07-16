const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const uploadToCloudinary = async (locaFilePath) => {
    try {
        const presentFile = path.join(__dirname, '../../public/uploads/' + locaFilePath);
        const mainFolderName = "WebData/FoodForAll/";
        const filePathOnCloudinary = mainFolderName + locaFilePath;
        const result = await cloudinary.uploader.upload(presentFile, {public_id: filePathOnCloudinary});
        fs.unlinkSync(presentFile);
        return result.url;
    } catch (error) {
        fs.unlinkSync(presentFile);
        throw error;
    }
}

const uploadSingle = async (req, res, next) => {
    try {
        const locaFilePath = req.file.filename;
        const result = await uploadToCloudinary(locaFilePath);
        req.file.filename = result;
        next();
    } catch (error) {
        res.status(405).send(error.message);
    }
}

const uploadMultiple = async (req, res, next) => {
    try {
        let filename = '';
        for(let i = 0; i < req.files.length; i++) {
            const locaFilePath = req.files[i].filename;
            const result = await uploadToCloudinary(locaFilePath);
            filename += result + ',';
        }
        filename = filename.substring(0, filename.lastIndexOf(','));
        req.files.filename = filename;
        next();
    } catch (error) {
        res.status(405).send(error.message);
    }
}

module.exports = {uploadSingle, uploadMultiple};