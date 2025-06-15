const express = require('express')
const multer = require('multer');

const { uploadMediaToCloudinary, deleteMediaFromCloudinary } = require('../../helpers/cloudinary')

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), async (requestAnimationFrame, res) => {
    try {
        const result = await uploadMediaToCloudinary(requestAnimationFrame.file.path)
        res.status(200).json({
            success: true,
            data: result,
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'error uplaoding file' })
    }
})

router.delete('/delete/:id',async(req,res) => {
    try{
        const {id} = req.params

        if(!id){
            return res.status(400).json({
                success:false,
                message: "Asset Id is required"
            })
        }

        await deleteMediaFromCloudinary(id)

         res.status(200).json({
            success: true,
            message: 'deleted successfully to delete from cloud'
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'error deleting file' })
    }
})

module.exports = router