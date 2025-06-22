const express = require('express')
const multer = require('multer');

const { uploadMediaToCloudinary, deleteMediaFromCloudinary } = require('../../helpers/cloudinary')

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await uploadMediaToCloudinary(req.file.path)
        res.status(200).json({
            success: true,
            data: result,
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'error uplaoding file' })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
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

router.post('/bulk-upload', upload.array('file', 10), async (req, res) => {

    try {
        const file = req.files
        console.log("files server got : ", file)

        if (!file || file.length === 0) {
            res.status(400).json({ success: false, message: "server did not receive any files" })
        }

        const fileData = []

        for (const item of file) {
            const result = await uploadMediaToCloudinary(item.path)
            fileData.push(result)
        }

        console.log("fileData : ",fileData)

        if (fileData) {
            res.status(200).json({
                success: true,
                message: "files were uploaded successfully",
                data: fileData
            })
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'error uplaoding files' })
    }
})

module.exports = router